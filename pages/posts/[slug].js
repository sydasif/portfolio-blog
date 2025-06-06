import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { getAllPostSlugs, getPostData } from "../../lib/posts";
import Navbar from "../../components/Navbar";
import { MDXRemote } from 'next-mdx-remote';
import TestComponent from '../../components/mdx/TestComponent';

const components = {
  TestComponent,
  // Add other custom components here
  // For example: CodeBlock,
  // For default HTML elements, you can override them here
  // h1: (props) => <h1 style={{ color: 'red' }} {...props} />,
};

export default function Post({ postData }) {
  const router = useRouter();
  const siteUrl = " `https://iaclab.vercel.app/` "; // Replace with your actual domain
  const pageUrl = `${siteUrl}${router.asPath}`;
  const pageTitle = `${postData.title} - Net.Automate`;
  const description =
    postData.description ||
    postData.excerpt ||
    "A post from Net.Automate blog.";
  const defaultOgImage = `${siteUrl}/images/og-default.png`; // Path to your default OG image

  const ogImage = postData.image
    ? postData.image.startsWith("http")
      ? postData.image
      : `${siteUrl}${postData.image}`
    : defaultOgImage;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Net.Automate" />
        <meta property="article:published_time" content={postData.date} />
        {/* <meta property="article:modified_time" content={postData.modified_date_if_available} /> */}
        <meta
          property="article:author"
          content={postData.author || "Syed Asif"}
        />
        {postData.category && (
          <meta property="article:section" content={postData.category} />
        )}
        {postData.tags && postData.tags.length > 0 && (
          <meta name="keywords" content={postData.tags.join(", ")} />
        )}
        {postData.tags &&
          postData.tags.map((tag) => (
            <meta property="article:tag" content={tag} key={tag} />
          ))}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <div className="bg-gray-50 min-h-screen text-gray-800">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6 text-sm">
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium"
            >
              ← Back to All Posts
            </Link>
          </div>
          <article className="bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {postData.title}
            </h1>
            <div className="text-gray-500 text-sm mb-6">
              <time>{postData.date}</time>
            </div>
            {postData.image && (
              <div className="relative w-full h-64 rounded-lg mb-6">
                <Image
                  src={postData.image}
                  alt={postData.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            )}
            <div className="prose max-w-none">
              <MDXRemote {...postData.content} components={components} />
            </div>
          </article>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 border-t border-gray-200 py-10 mt-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>
              © {new Date().getFullYear()} Net.Automate. All rights reserved.
            </p>
            <p className="text-sm mt-1">
              Exploring the intersection of networking and software.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug);
  return {
    props: {
      postData,
    },
  };
}
