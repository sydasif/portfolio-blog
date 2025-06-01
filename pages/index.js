import { useState, useEffect } from 'react';
import Head from 'next/head';
import BlogPostCard from '../components/BlogPostCard';
import { blogPosts } from '../data/blogPosts';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }) {
  return (
    <div className="text-red-500 p-4">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  // Filter blog posts based on search query
  useEffect(() => {
    const filtered = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery]);

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
          {/* Header */}
          <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-indigo-600">NetAuto Blog</h1>
                <p className="text-sm text-gray-600">Networking & Automation Insights</p>
              </div>
              <div className="relative max-w-md w-full">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Welcome to NetAuto Blog</h2>
              <p className="text-lg md:text-xl max-w-2xl mx-auto">
                Where networking meets automation — sharing knowledge, tools, and best practices.
              </p>
            </div>
          </section>

          {/* About Me Section */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">About Me</h3>
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-lg text-gray-700 leading-relaxed">
                  I'm Syed Asif, an Associate Network Engineer passionate about network automation, infrastructure as code, and modern DevOps practices.
                  With experience in designing scalable solutions and automating repetitive tasks,
                  I aim to bridge the gap between networking and software development.
                </p>
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <main className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts && filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
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