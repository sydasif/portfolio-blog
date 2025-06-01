export default function BlogPostCard({ post }) {
  if (!post) return null;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        {post.category && (
          <span className="text-sm text-indigo-600 font-semibold">{post.category}</span>
        )}
        <h4 className="mt-2 text-xl font-bold text-gray-800">{post.title || 'Untitled'}</h4>
        <p className="mt-2 text-gray-600">{post.excerpt || 'No description available'}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">{post.date || 'No date'}</span>
          <button className="text-indigo-600 hover:text-indigo-800 font-medium">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}