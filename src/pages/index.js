import Image from "next/image";
import Layout from "./components/Layout";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Welcome to My Blog"
        description="Discover the latest articles and insights on various topics."
        openGraph={{
          url: "https://www.myblog.com/",
          title: "Welcome to My Blog",
          description:
            "Discover the latest articles and insights on various topics.",
          images: [
            {
              url: "https://www.myblog.com/home-image.jpg",
              width: 800,
              height: 600,
              alt: "Home Image",
            },
          ],
        }}
      />
      <Layout></Layout>
    </>
  );
}
