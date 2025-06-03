import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Brand Name */}
        <div>
          <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">
              Net.Automate
            </a>
          </Link>
          <div className="text-xs md:text-sm text-gray-500 leading-tight mt-1">
            Network Automation, Infrastructure as Code, and DevOps
          </div>
        </div>

        {/* Hamburger Menu Button - visible on small screens */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:text-indigo-600"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Links - visible on medium screens and up */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" legacyBehavior>
            <a className="text-gray-700 hover:text-indigo-600 font-medium">
              Home
            </a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="text-gray-700 hover:text-indigo-600 font-medium">
              About Me
            </a>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Links - shown when isMobileMenuOpen is true */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" legacyBehavior>
              <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
                Home
              </a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
                About Me
              </a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
