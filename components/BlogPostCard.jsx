import Link from "next/link";
import Image from "next/image";

export default function BlogPostCard({ post }) {
  if (!post) return null;
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      {post.image && (
        <div className="relative w-full h-48">
          <Image
            src={post.image}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        {post.category && (
          <span className="text-sm text-indigo-600 font-semibold">
            {post.category}
          </span>
        )}
        <h4 className="mt-2 text-xl font-bold text-gray-800">
          {post.title || "Untitled"}
        </h4>
        <p className="mt-2 text-gray-600">
          {post.excerpt || "No description available"}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {post.date || "No date"}
          </span>
          {post.slug && (
            <Link
              href={`/posts/${post.slug}`}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Read More
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
