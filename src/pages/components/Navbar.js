// src/components/Navbar.js
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex">
          <div className="flex items-center justify-between w-full">
            <Link href="/" className="text-xl font-bold">
              My Blog
            </Link>
          </div>
          <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            <Link
              href="/"
              className="text-white inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/properties"
              className="text-white inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              Properties
            </Link>
            <Link
              href="/contact"
              className="text-white inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="flex items-center sm:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 focus:text-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="text-gray-900 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50"
          >
            Home
          </Link>
          <Link
            href="/properties"
            className="text-gray-900 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50"
          >
            Properties
          </Link>
          <Link
            href="/contact"
            className="text-gray-900 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
