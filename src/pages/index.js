import Image from "next/image";
import Layout from "../components/Layout";
import { NextSeo } from "next-seo";
import { FaBiohazard } from "react-icons/fa6";

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
      <Layout>
        <div className="py-16">
          <div className="flex justify-center py-4">
            <span className="flex items-center gap-4 bg-dark text-white font-bold px-6 py-1 rounded-full">
              <FaBiohazard />
              ALL IN ONE CRM PLATFORM
            </span>
          </div>
          <div className="text-center my-8">
            <h1 className="text-5xl font-medium text-dark leading-normal max-sm:text-3xl max-sm:leading-snug max-sm:font-bold">
              Revolutionize Your CRM <br />
              Management with Syncro
            </h1>
            <p className="text-gray-600 mt-8">
              Experience the future of CRM with seamless integration, advanced
              <br />
              analytics, and unparalleled user experience.
            </p>
            <div className="mt-12 flex justify-center space-x-4">
              <button className="bg-medDark text-white font-semibold px-6 py-3 rounded-lg">
                Get Started
              </button>
              <button className="bg-white border border-gray-300 text-gray-900 font-semibold px-6 py-3 rounded-lg">
                See Features
              </button>
            </div>
          </div>
          <div className="relative flex justify-center mt-16">
            <div className="w-[75%] h-full max-sm:w-[100%]">
              <Image
                src="/hero2.webp"
                alt="Syncro CRM"
                width={600}
                height={400}
                layout="responsive"
              />
              <div className="w-[75%] h-full">
                <Image
                  src="/hero1.png"
                  alt="Syncro CRM"
                  width={100}
                  height={100}
                  layout="responsive"
                  className="absolute bottom-0 left-[50%] !w-[80%] -translate-x-[50%] max-sm:w-[100%]"
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
