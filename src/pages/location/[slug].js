// src/app/blog/[id]/page.js
import { NextSeo } from "next-seo";
import { fetchPostBySlug } from "../../lib/airtableapi";
import Layout from "../../components/Layout";
import Container from "../../components/Container";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import useMediaMatch from "../../hook/useMediaMatch";
import Heading1 from "@/components/Heading1";
import Link from "next/link";

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
}

export default function LocationPage({ post }) {
  const match = useMediaMatch("768px");

  console.log(post.fields);
  return (
    <Layout>
      <NextSeo
        title={post.fields.meta_title}
        description={post.fields.meta_description}
        openGraph={{
          url: post.fields.slug,
          title: post.fields.meta_title,
          description: post.fields.meta_description,
          images: [
            {
              url: post.fields.banner_image,
              width: 800,
              height: 600,
              alt: "Blog Image",
            },
          ],
        }}
        additionalMetaTags={[
          {
            property: "keywords",
            content: "blog, articles, posts, my blog",
          },
        ]}
        additionalLinkTags={[
          {
            rel: "canonical",
            href: "https://www.myblog.com/blog",
          },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "Webpage",
          name: post.fields.meta_title,
          description: post.fields.meta_description,
          url: post.fields.slug,
          image: post.fields.banner_image,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://www.myblog.com/blog",
          },
          publisher: {
            "@type": "Organization",
            name: "My Blog",
            logo: {
              "@type": "ImageObject",
              url: "https://www.myblog.com/logo.jpg",
            },
          },
        }}
      />
      <Container>
        <div className="rounded-xl bg-gray my-16">
          {/* breadcrumbs */}
          <div className="bg-dark flex gap-2 py-3 px-8 rounded-tl-xl rounded-tr-xl text-gray items-center">
            <p>Home</p>
            <IoIosArrowForward size={16} />
            <p>{post.fields.name}</p>
          </div>
          {/* hero block */}
          <div className="py-12 px-8 bg-medDark">
            <div className="flex gap-8 max-md:flex-col items-center">
              <div>
                <Heading1>
                  The Best Property Management Companies in Auburn, Alabama of
                  2024
                </Heading1>
                <div className="h-[.1rem] w-24 bg-[#ea8b57] mb-6 max-sm:m-auto"></div>
                <p className="text-gray max-sm:pt-5 max-sm:text-center text-base">
                  {post.fields.description}
                </p>
              </div>
              <Image
                // src={post.fields.banner_image[0].url}
                src="/badge.png"
                width={match ? 350 : 320}
                height={match ? 350 : 320}
              />
            </div>
          </div>
          {/* top picks */}
          <div className="flex items-center justify-center py-8 bg-medDark">
            <div className="bg-white p-5 w-3/4 rounded-xl max-md:w-full max-md:mx-5">
              <p className="text-lg">Our picks</p>
              <div className="h-[.1rem] w-full bg-[#ea8b57] my-3"></div>
              <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start">
                <Link
                  className="flex items-center gap-4 "
                  href={`https://${
                    post.fields[`website_url (from Company 1)`][0]
                  }`}
                  target="_blank"
                >
                  <Image
                    src={post.fields[`logo (from Company 1)`][0]}
                    width={60}
                    height={60}
                  />
                  <p className="text-xl">
                    {post.fields[`company_name (from Company 1)`]}
                  </p>
                </Link>

                <Link
                  className="flex items-center gap-4"
                  href={`https://${
                    post.fields[`website_url (from Company 2)`][0]
                  }`}
                  target="_blank"
                >
                  <Image
                    src={post.fields[`logo (from Company 2)`][0]}
                    width={60}
                    height={60}
                  />
                  <p className="text-xl">
                    {post.fields[`company_name (from Company 2)`]}
                  </p>
                </Link>

                <Link
                  className="flex items-center gap-4"
                  href={`https://${
                    post.fields[`website_url (from Company 3)`][0]
                  }`}
                  target="_blank"
                >
                  <Image
                    src={post.fields[`logo (from Company 3)`][0]}
                    width={60}
                    height={60}
                  />
                  <p className="text-xl">
                    {post.fields[`company_name (from Company 3)`]}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
