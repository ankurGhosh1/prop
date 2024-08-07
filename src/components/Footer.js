// src/components/Footer.js
import Link from "next/link";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold">My Blog</h2>
            <p className="mt-2">Sharing interesting articles and insights.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Quick Links</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href="/"
                  className="opacity-80 hover:opacity-100 transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/location"
                  className="opacity-80 hover:opacity-100 transition duration-300"
                >
                  Location
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="opacity-80 hover:opacity-100 transition duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold">Follow Us</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="#"
                  className="opacity-80 hover:opacity-100 transition duration-300"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="opacity-80 hover:opacity-100 transition duration-300"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="opacity-80 hover:opacity-100 transition duration-300"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Driving Classes. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
