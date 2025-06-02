import Head from 'next/head';
import Link from 'next/link';
import { getAllPostSlugs, getPostData } from '../../lib/posts';

export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>{postData.title} - NetAuto Blog</title>
        <meta name="description" content={postData.excerpt} />
      </Head>

      <div className="bg-gray-50 min-h-screen text-gray-800">
        {/* Minimal Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" legacyBehavior>
              <a className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">NetAuto Blog</a>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <article className="bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{postData.title}</h1>
            <div className="text-gray-500 text-sm mb-6">
              <span>{postData.date}</span>
              {postData.category && <span className="ml-2 italic">| Category: {postData.category}</span>}
            </div>

            {postData.image && (
              <img src={postData.image} alt={postData.title} className="w-full h-auto max-h-96 object-cover rounded-md mb-8" />
            )}

            <div className="prose prose-indigo lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </article>
        </main>

        {/* Minimal Footer */}
        <footer className="bg-white border-t border-gray-200 py-8 mt-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>© {new Date().getFullYear()} NetAuto Blog. All rights reserved.</p>
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
