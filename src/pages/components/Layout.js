// src/app/Layout.js
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import { Inter } from "next/font/google";
import Footer from "./Footer";
import Navbar from "./Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className={`${inter.className}`}>{children}</main>
      <Footer />
    </>
  );
}
