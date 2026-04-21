import argparse
import os
import re
import sys
from datetime import datetime
from pathlib import Path

import requests
from bs4 import BeautifulSoup
from markdownify import markdownify as md


def slugify(text):
    text = text.lower()
    text = re.sub(r"[^\w\s-]", "", text)
    return re.sub(r"[-\s]+", "-", text).strip("-")


def download_image(url, dest_folder):
    try:
        response = requests.get(url, stream=True, timeout=10)
        response.raise_for_status()

        # Get file extension
        ext = os.path.splitext(url.split("?")[0])[1]
        if not ext:
            ext = ".jpg"

        # Create a unique filename
        filename = f"{slugify(url.split('/')[-1])}{ext}"
        dest_path = dest_folder / filename

        with open(dest_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)

        return f"/images/{filename}"
    except Exception as e:
        print(f"Error downloading image {url}: {e}")
        return None


def clean_markdown(md_text):
    # Remove leading/trailing whitespace
    md_text = md_text.strip()

    # 1. Fix the <url> issue: convert <http...> to [http...](http...)
    # We look for patterns like <http://...> or <https://...>
    md_text = re.sub(
        r"<https?://[^>]+>",
        lambda m: f"[{m.group(0).strip('<>')}]({m.group(0).strip('<>')})",
        md_text,
    )

    # 2. Remove redundant leading horizontal rules that might come from <hr>
    # This avoids the "--- \n ---" issue at the top of files
    while md_text.startswith("---"):
        md_text = md_text.lstrip("-").strip()

    # 3. Fix the <> issue: escape < and > to prevent MDX from seeing them as JSX tags
    # We want to escape < and > that are NOT part of a markdown link [text](url)
    # A simple way is to escape all < and > and then fix the links back.
    # Or more simply, escape all < and > that aren't part of a link.
    # Let's use a regex to find < and > that are not part of a link.
    # This is tricky. A safer way for MDX is to replace < and > with their HTML entities.
    # But we must NOT break the links we just created.

    # Let's try this: escape all < and >
    # Then find all [text](url) and "un-escape" the URL part.

    md_text = md_text.replace("<", "&lt;").replace(">", "&gt;")

    # Fix the links we just created (and any existing ones)
    # A link looks like [text](url)
    # We want to find [text](&lt;url&gt;) and change it back to [text](url)
    # The url part is between the last ( and the last )

    def unescape_link(match):
        full_link = match.group(0)
        # Find the part inside the parentheses
        parts = full_link.split("(")
        if len(parts) < 2:
            return full_link

        url_part = parts[-1].rstrip(")")
        # Unescape the URL part
        unescaped_url = url_part.replace("&lt;", "<").replace("&gt;", ">")

        # Reconstruct the link
        prefix = full_link[:full_len_of_url_part_in_original_match]  # This is hard
        # Let's try a simpler approach:
        return full_link.replace(f"({url_part})", f"({unescaped_url})")

    # Actually, let's use a better regex for links to avoid complex reconstruction
    # [text](url) -> where url might contain &lt; or &gt;
    md_text = re.sub(
        r"\[([^\]]+)\]\(([^)]+)\)",
        lambda m: (
            f"[{m.group(1)}]({m.group(2).replace('&lt;', '<').replace('&gt;', '>')})"
        ),
        md_text,
    )

    return md_text


def convert_html_to_mdx(html_file, blogs_dir, posts_dir, images_dir):
    print(f"Processing {html_file}...")

    with open(html_file, encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    # Extract metadata
    title_tag = soup.find("h1", class_="p-name")
    title = title_tag.get_text().strip() if title_tag else "Untitled"

    date_tag = soup.find("time", class_="dt-published")
    date_str = date_tag.get("datetime") if date_tag else ""
    try:
        # Try to parse date to ensure it's valid
        date_obj = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
        date = date_obj.strftime("%Y-%m-%d")
    except Exception:
        date = "1970-01-01"  # Fallback

    author_tag = soup.find("a", class_="p-author")
    author = author_tag.get_text().strip() if author_tag else "Unknown"

    # Content section
    content_section = soup.find("section", class_="e-content")
    if not content_section:
        print(f"Error: Could not find content section in {html_file}")
        return

    # Extract excerpt and description from the first few paragraphs
    paragraphs = content_section.find_all("p")
    excerpt = ""
    description = ""
    if paragraphs:
        excerpt = paragraphs[0].get_text().strip()
        description = excerpt  # For now, use excerpt as description

    # Handle images
    image_url = None
    img_tag = content_section.find("img")
    if img_tag and img_tag.get("src"):
        image_url = img_tag.get("src")

    local_image_path = None
    if image_url:
        local_image_path = download_image(image_url, images_dir)
        if local_image_path:
            # Update the image URL in the HTML content before converting to MDX
            img_tag["src"] = local_image_path

    # Convert HTML to Markdown
    content_md = md(str(content_section), heading_style="ATX")

    # Apply cleaning and formatting
    content_md = clean_markdown(content_md)

    # Construct frontmatter
    # We'll use the same fields as the existing .mdx files
    frontmatter = f"""---
title: "{title}"
date: "{date}"
excerpt: "{excerpt[:150]}..."
description: "{description[:200]}..."
category: "Uncategorized"
tags: []
image: "{local_image_path if local_image_path else ""}"
author: "{author}"
readingTime: "5 min read"
status: "published"
lastModified: "{date}"
---
"""

    # Create filename: YYYY-MM-DD-slug.mdx
    slug = slugify(title)
    filename = f"{date}-{slug}.mdx"
    dest_path = posts_dir / filename

    with open(dest_path, "w", encoding="utf-8") as f:
        f.write(frontmatter)
        f.write("\n")
        f.write(content_md)

    print(f"Successfully converted to {dest_path}")


def main():
    parser = argparse.ArgumentParser(description="Convert HTML blog posts to MDX")
    parser.add_argument(
        "input_path",
        type=Path,
        help="Path to an HTML file or a directory containing HTML files",
    )
    parser.add_argument(
        "--posts-dir", default="content/posts", help="Directory for output MDX files"
    )
    parser.add_argument(
        "--images-dir",
        default="public/images",
        help="Directory to save downloaded images",
    )

    args = parser.parse_args()

    input_path = args.input_path
    posts_dir = Path(args.posts_dir)
    images_dir = Path(args.images_dir)

    # Ensure directories exist
    posts_dir.mkdir(parents=True, exist_ok=True)
    images_dir.mkdir(parents=True, exist_ok=True)

    # Find all .html files
    if input_path.is_file():
        if input_path.suffix == ".html":
            html_files = [input_path]
        else:
            print(f"Error: {input_path} is not an HTML file")
            return
    elif input_path.is_dir():
        html_files = list(input_path.glob("*.html"))
    else:
        print(f"Error: {input_path} is not a valid file or directory")
        return

    if not html_files:
        print(f"No .html files found in {input_path}")
        return

    print(f"Found {len(html_files)} files to convert.")

    for html_file in html_files:
        try:
            convert_html_to_mdx(html_file, input_path.parent, posts_dir, images_dir)
        except Exception as e:
            print(f"Failed to convert {html_file}: {e}")


if __name__ == "__main__":
    main()
