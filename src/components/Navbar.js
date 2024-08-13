// src/components/Navbar.js
import { useState } from "react";
import Link from "next/link";
import Container from "./Container";
import { IoMenu } from "react-icons/io5";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow-lg py-5">
      <Container>
        <div className="max-lg:flex max-lg:justify-between">
          <div className="flex items-center justify-between w-full">
            <Link href="/" className="flex justify-center items-center">
              <Image src="/logo.jpg" height={80} width={140} />
            </Link>

            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="text-dark inline-flex items-center px-1 pt-1 text-lg font-medium"
              >
                Home
              </Link>
              <Link
                href="/location"
                className="text-dark inline-flex items-center px-1 pt-1 text-lg font-medium"
              >
                Location
              </Link>
              <Link
                href="/contact"
                className="text-dark inline-flex items-center px-1 pt-1 text-lg font-medium"
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
