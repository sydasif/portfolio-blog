export default function BlogPostCard({ post }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <span className="text-sm text-indigo-600 font-semibold">{post.category}</span>
        <h4 className="mt-2 text-xl font-bold text-gray-800">{post.title}</h4>
        <p className="mt-2 text-gray-600">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">{post.date}</span>
          <button className="text-indigo-600 hover:text-indigo-800 font-medium">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}