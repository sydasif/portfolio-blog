import Link from 'next/link';

export default function Navbar() {
  return (    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div>
          <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">Net.Automate</a>
          </Link>
          <div className="text-xs md:text-sm text-gray-500 leading-tight mt-1">
            Network Automation, Infrastructure as Code, and DevOps
          </div>
        </div>
        <div className="flex space-x-6">
          <Link href="/" legacyBehavior>
            <a className="text-gray-700 hover:text-indigo-600 font-medium">Home</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="text-gray-700 hover:text-indigo-600 font-medium">About Me</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}