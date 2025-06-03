import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      // Remove ".md" or ".mdx" from file name to get slug
      const slug = fileName.replace(/\.mdx?$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the slug
      return {
        slug,
        ...matterResult.data,
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.mdx$/, ""),
        },
      };
    });
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const mdxSource = await serialize(matterResult.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    },
  });

  return {
    slug,
    content: mdxSource,
    ...matterResult.data,
  };
}
