// src/components/Navbar.js
import { useState } from "react";
import Link from "next/link";
import Container from "./Container";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-dark shadow-lg py-4">
      <Container>
        <div className="max-lg:flex max-lg:justify-between">
          <div className="flex w-full">
            <div className="flex items-center justify-between w-full">
              <Link href="/" className="text-xl font-medium text-gray">
                Driving Classes
              </Link>
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="text-gray inline-flex items-center px-1 pt-1 text-md font-medium opacity-80 hover:opacity-100 transition duration-300"
              >
                Home
              </Link>
              <Link
                href="/location"
                className="text-gray inline-flex items-center px-1 pt-1 text-md font-medium opacity-80 hover:opacity-100 transition duration-300"
              >
                Location
              </Link>
              <Link
                href="/contact"
                className="text-gray inline-flex items-center px-1 pt-1 text-md font-medium opacity-80 hover:opacity-100 transition duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-gray hover:bg-gray-900 focus:outline-none focus:bg-gray-900 focus:text-gray"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <IoMenu className="text-gray" size={24} />
            </button>
          </div>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="text-gray block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              href="/location"
              className="text-gray block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50"
            >
              Location
            </Link>
            <Link
              href="/contact"
              className="text-gray block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50"
            >
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
