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
          url: `https://www.myblog.com/location/${post.fields.slug}`,
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
            href: `https://www.myblog.com/location/${post.fields.slug}`,
          },
        ]}
      />

      <ArticleJsonLd
        url={`https://www.myblog.com/location/${post.fields.slug}`}
        title={post.fields.meta_title}
        images={[post.fields.banner_image]}
        datePublished={post.fields.publish_date}
        dateModified={post.fields.modified_date || post.fields.publish_date}
        authorName="Author Name"
        publisherName="My Blog"
        publisherLogo="https://www.myblog.com/logo.jpg"
        description={post.fields.meta_description}
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
                <div className="h-[.1rem] w-24 bg-orange mb-6 max-sm:m-auto"></div>
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
              <div className="h-[.1rem] w-full bg-orange my-3"></div>
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

          {/* selection process */}

          <div className="grid grid-cols-[.75fr_1fr] gap-6 bg-medDark p-8 divide-x divide-orange max-lg:grid-cols-1">
            <div>
              <h3 className="text-5xl text-white pb-4 leading-normal">
                Our Selection Criteria
              </h3>
              <p className="text-white">
                Our goal is to connect property owners with the best property
                management company to ensure your investments continue to
                flourish. We scored property management companies on over 30
                different variables to provide you a hand-picked list of the
                best property management companies in the Auburn area.
              </p>
            </div>

            <div className="grid grid-cols-[.5fr_1fr] bg-gray rounded-xl p-8 divide-x gap-4 divide-orange max-sm:grid-cols-1 max-sm:divide-x-0 ">
              <div className="flex flex-col gap-4 max-sm:m-auto">
                <div className="flex gap-2 items-center">
                  <Image src="/process.svg" width={50} height={80}></Image>
                  <div>
                    <p className="font-bold text-lg">89</p>
                    <p className="text-sm">Companies Reviewed</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <Image src="/process-1.svg" width={50} height={80}></Image>
                  <div>
                    <p className="font-bold text-lg">40</p>
                    <p className="text-sm">Companies Curated</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <Image src="/process-2.svg" width={50} height={80}></Image>
                  <div>
                    <p className="font-bold text-lg">3</p>
                    <p className="text-sm">Top Picks</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 px-5">
                <div className="flex gap-2 items-start">
                  <Image src="/process.svg" width={20} height={20}></Image>
                  <div>
                    <p className="font-bold text-md leading-tight">
                      1. Reputation{" "}
                    </p>
                    <p className="text-sm text-medDark">
                      An extensive track record of reliable, honest service.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <Image src="/process.svg" width={20} height={20}></Image>
                  <div>
                    <p className="font-bold text-md leading-tight">
                      2. Credibility{" "}
                    </p>
                    <p className="text-sm text-medDark">
                      Understands property laws and industry best practices.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <Image src="/process.svg" width={20} height={20}></Image>
                  <div>
                    <p className="font-bold text-md leading-tight">
                      3. Experience{" "}
                    </p>
                    <p className="text-sm text-medDark">
                      Knowledge of your property to save you time and money.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <Image src="/process.svg" width={20} height={20}></Image>
                  <div>
                    <p className="font-bold text-md leading-tight">
                      4. Professionalism{" "}
                    </p>
                    <p className="text-sm text-medDark">
                      Provides transparent, fair pricing and great
                      communication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Companies */}

          <div className="py-3 px-8">
            <h2 className="text-3xl leading-normal text-dark font-medium pt-4">
              {post.fields.heading_h2}
            </h2>

            {/* company 1 */}
            <div className="grid grid-cols-[200px_1fr] bg-white p-8 gap-4 rounded-xl my-8 max-sm:grid-cols-1">
              <div className="flex flex-col gap-4 items-center max-sm:items-start">
                <Image
                  src={post.fields[`logo (from Company 1)`][0]}
                  width={120}
                  height={120}
                  className="border border-dark rounded-full"
                />
                <Link
                  href={`tel:${post.fields[`number (from Company 1)`][0]}`}
                  className="p-3 border border-orange w-[150px] text-center"
                >
                  {post.fields[`number (from Company 1)`][0]}
                </Link>
                <Link
                  href={`https://${
                    post.fields[`website_url (from Company 1)`][0]
                  }`}
                  className="p-3 bg-orange text-white w-[150px] text-center"
                >
                  Visit Website
                </Link>
              </div>
              <div>
                <h1 className="text-3xl text-dark font-medium mb-2">
                  {post.fields["company_name (from Company 1)"][0]}
                </h1>
                <address className="text-orange text-sm">
                  {post.fields["address (from Company 1)"][0]}
                </address>
                <p className="text-dark text-base max-w-[750px] mt-8">
                  {post.fields["company_description (from Company 1)"][0]}
                </p>
              </div>
            </div>

            {/* company 2 */}
            <div className="grid grid-cols-[200px_1fr] bg-white p-8 gap-4 rounded-xl my-8 max-sm:grid-cols-1">
              <div className="flex flex-col gap-4 items-center max-sm:items-start">
                <Image
                  src={post.fields[`logo (from Company 2)`][0]}
                  width={120}
                  height={120}
                  className="border border-dark rounded-full"
                />
                <Link
                  href={`tel:${post.fields[`number (from Company 2)`][0]}`}
                  className="p-3 border border-orange w-[150px] text-center"
                >
                  {post.fields[`number (from Company 2)`][0]}
                </Link>
                <Link
                  href={`https://${
                    post.fields[`website_url (from Company 2)`][0]
                  }`}
                  className="p-3 bg-orange text-white w-[150px] text-center"
                >
                  Visit Website
                </Link>
              </div>
              <div>
                <h1 className="text-3xl text-dark font-medium mb-2">
                  {post.fields["company_name (from Company 2)"][0]}
                </h1>
                <address className="text-orange text-sm">
                  {post.fields["address (from Company 2)"][0]}
                </address>
                <p className="text-dark text-base max-w-[750px] mt-8">
                  {post.fields["company_description (from Company 2)"][0]}
                </p>
              </div>
            </div>

            {/* company 3 */}
            <div className="grid grid-cols-[200px_1fr] bg-white p-8 gap-4 rounded-xl my-8 max-sm:grid-cols-1">
              <div className="flex flex-col gap-4 items-center max-sm:items-start">
                <Image
                  src={post.fields[`logo (from Company 3)`][0]}
                  width={120}
                  height={120}
                  className="border border-dark rounded-full"
                />
                <Link
                  href={`tel:${post.fields[`number (from Company 3)`][0]}`}
                  className="p-3 border border-orange w-[150px] text-center"
                >
                  {post.fields[`number (from Company 3)`][0]}
                </Link>
                <Link
                  href={`https://${
                    post.fields[`website_url (from Company 3)`][0]
                  }`}
                  className="p-3 bg-orange text-white w-[150px] text-center"
                >
                  Visit Website
                </Link>
              </div>
              <div>
                <h1 className="text-3xl text-dark font-medium mb-2">
                  {post.fields["company_name (from Company 3)"][0]}
                </h1>
                <address className="text-orange text-sm">
                  {post.fields["address (from Company 3)"][0]}
                </address>
                <p className="text-dark text-base max-w-[750px] mt-8">
                  {post.fields["company_description (from Company 3)"][0]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
