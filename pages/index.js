import { useState } from 'react';
import Head from 'next/head';
import BlogPostCard from '../components/BlogPostCard';
import { ErrorBoundary } from 'react-error-boundary';
import { getSortedPostsData } from '../lib/posts';
import Navbar from '../components/Navbar';

function ErrorFallback({ error }) {
  return (
    <div className="text-red-500 p-4">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

export default function Home({ allPostsData }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = allPostsData.filter(
    (post) => {
      const titleMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
      const excerptMatch = post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return titleMatch || excerptMatch;
    }
  );

  return (
    <>
      <Head>
        <title>NetAuto Blog - Networking & Automation Insights</title>
        <meta name="description" content="Discover insights about network automation and engineering" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="bg-gray-50 min-h-screen text-gray-800">
          <Navbar />
          {/* Hero Section with Search Bar */}
          <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8">Automate Networks with Code</h2>
              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
                Where networking meets automation — sharing knowledge, tools, and best practices.
              </p>
              <div className="relative max-w-md w-full mx-auto">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                />
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <main className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts && filteredPosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
              {filteredPosts && filteredPosts.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500">No posts found matching your search.</p>
                </div>
              )}
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-8">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>&copy; {new Date().getFullYear()} NetAuto Blog. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </ErrorBoundary>
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
