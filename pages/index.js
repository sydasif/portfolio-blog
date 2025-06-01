import { useState, useEffect } from 'react';
import BlogPostCard from '../components/BlogPostCard';

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
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
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
      <main className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Latest Articles'}
        </h3>
        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No articles found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} NetAuto Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Mock Data for Blog Posts
const blogPosts = [
  {
    id: 1,
    title: "Mastering Python for Network Automation",
    excerpt: "How Python scripts can simplify repetitive network device management tasks.",
    category: "Automation",
    date: "Mar 15, 2025",
    image: "https://picsum.photos/seed/python/400/300"
  },
  {
    id: 2,
    title: "Introduction to Ansible for Network Engineers",
    excerpt: "Using Ansible to automate configuration across multiple network devices.",
    category: "Ansible",
    date: "Feb 28, 2025",
    image: "https://picsum.photos/seed/ansible/400/300"
  },
  {
    id: 3,
    title: "Deploying Infrastructure with Terraform",
    excerpt: "Infrastructure as Code using Terraform for cloud and on-premise environments.",
    category: "Terraform",
    date: "Jan 20, 2025",
    image: "https://picsum.photos/seed/terraform/400/300"
  },
  {
    id: 4,
    title: "REST APIs for Network Device Management",
    excerpt: "Understanding how RESTful APIs help manage network switches and routers.",
    category: "Networking",
    date: "Dec 10, 2024",
    image: "https://picsum.photos/seed/api/400/300"
  },
  {
    id: 5,
    title: "Getting Started with CI/CD for Networking",
    excerpt: "Integrating continuous integration and delivery into your network workflows.",
    category: "DevOps",
    date: "Nov 5, 2024",
    image: "https://picsum.photos/seed/cicd/400/300"
  },
  {
    id: 6,
    title: "Monitoring Networks with Prometheus and Grafana",
    excerpt: "Setting up real-time monitoring and visualization for your network infrastructure.",
    category: "Monitoring",
    date: "Oct 18, 2024",
    image: "https://picsum.photos/seed/monitoring/400/300"
  }
];