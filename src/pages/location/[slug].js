// src/app/blog/[id]/page.js
import { NextSeo, ArticleJsonLd } from "next-seo";
import { fetchPostBySlug } from "../../lib/airtableapi";
import Layout from "../../components/Layout";
import Container from "../../components/Container";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import useMediaMatch from "../../hook/useMediaMatch";
import Heading1 from "@/components/Heading1";
import Link from "next/link";
import CompanyCard from "@/components/CompanyCard";
import RatingStars from "@/components/Star";

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
  const matchSm = useMediaMatch("576px");

  // console.log(post.fields);
  return (
    <Layout>
      <NextSeo
        title={post.fields.meta_title}
        description={post.fields.meta_description}
        openGraph={{
          url: `https://www.mydrivingschools.com/location/${post.fields.slug}`,
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
            href: `https://www.mydrivingschools.com/location/${post.fields.slug}`,
          },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Mydrivingschools.com",
                item: "https://www.mydrivingschools.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Location",
                item: "https://www.mydrivingschools.com/location",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: `${post.fields.meta_title}`,
                item: `https://www.mydrivingschools.com/location/${post.fields.slug}`,
              },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebPage",
            "@id": "#WebPage",
            url: `https://www.mydrivingschools.com/location/${post.fields.slug}`,
            name: `${post.fields.meta_title}`,
            datePublished: `${post.fields.created_time}`,
            dateModified: `${post.fields.modified_date}`,
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListOrder: "https://schema.org/ItemListOrderDescending",
            name: `${post.fields.meta_title}`,
            url: `https://www.mydrivingschools.com/location/${post.fields.slug}`,
            itemListElement: Object.keys(post.fields)
              .filter((key) => key.startsWith("company_name (from Company")) // Filter relevant fields dynamically
              .map((key, index) => {
                const companyIndex = key.match(/\d+/)?.[0]; // Extract the company number (e.g., "4" from "Company 4")
                const companyLogoKey = `company_logo (from Company_${companyIndex})`;
                const companyName = post.fields[key];
                const companyLogo = post.fields[companyLogoKey]?.[0]?.url;

                if (companyName && companyLogo) {
                  return {
                    "@type": "ListItem",
                    position: index + 1, // Position starts from 1
                    item: {
                      "@type": "Organization",
                      name: companyName,
                      image: companyLogo,
                    },
                  };
                }
                return null; // Exclude if data is missing
              })
              .filter(Boolean), // Remove null entries
          }),
        }}
      />

      {/* Adding Stars Template 
        <td>
          <RatingStars
            rating={
              post.fields[`rating (from Company 1)`]
                ? post.fields[`rating (from Company 1)`]
                : null
            }
            maxRating={5}
          />
        </td> */}

      <Container>
        <div className="rounded-xl bg-gray my-36">
          {/* breadcrumbs */}
          <div className="bg-dark flex gap-2 py-3 px-8 rounded-tl-xl rounded-tr-xl text-gray items-center">
            <Link href={"/"}>Home</Link>
            <IoIosArrowForward size={16} />
            <Link href={"/location"}>Location</Link>
            <IoIosArrowForward size={16} />
            <p>{post.fields.name}</p>
          </div>
          {/* hero block */}
          <div className="py-12 px-8 bg-medDark">
            <div className="flex gap-8 max-md:flex-col items-center">
              <div>
                <Heading1>{post.fields.heading_h1}</Heading1>
                <div className="h-[.1rem] w-24 bg-orange mb-6 max-sm:m-auto"></div>
                <p className="text-gray max-sm:pt-5 max-sm:text-center text-base">
                  {post.fields.description}
                </p>
              </div>
              <Image
                src={post.fields.banner_image[0].url}
                width={match ? 350 : 320}
                height={match ? 350 : 320}
                alt={`Badge of best driving schools in ${post.fields.name}`}
                loading="eager"
              />
            </div>
          </div>
          {/* top picks */}
          <div className="flex items-center justify-center py-8 bg-medDark">
            <div className="bg-white p-5 w-3/4 rounded-xl max-md:w-full max-md:mx-5">
              <p className="text-2xl font-bold">Our Top Three Picks</p>
              <div className="grid grid-cols-[1fr_.5fr] gap-8 px-6 py-4 max-md:grid-cols-[1fr] max-sm:px-0">
                <div className="flex flex-col justify-center gap-4">
                  <div className="flex gap-8 items-center">
                    <Image
                      src={
                        post.fields["company_logo (from Company_1)"]
                          ? post.fields["company_logo (from Company_1)"][0].url
                          : ""
                      }
                      width={matchSm ? 60 : 100}
                      height={matchSm ? 60 : 100}
                      alt={post.fields[`company_name (from Company 1)`]}
                    />
                    <p className="text-xl max-sm:text-base">
                      {post.fields[`company_name (from Company 1)`]
                        ? post.fields[`company_name (from Company 1)`]
                        : null}
                    </p>
                  </div>
                  <div className="flex gap-8 items-center">
                    <Image
                      src={
                        post.fields["company_logo (from Company_2)"]
                          ? post.fields["company_logo (from Company_2)"][0].url
                          : ""
                      }
                      width={matchSm ? 60 : 100}
                      height={matchSm ? 60 : 100}
                      alt={post.fields[`company_name (from Company 2)`]}
                    />
                    <p className="text-xl max-sm:text-base">
                      {post.fields[`company_name (from Company 2)`]
                        ? post.fields[`company_name (from Company 2)`]
                        : null}
                    </p>
                  </div>
                  <div className="flex gap-8 items-center">
                    <Image
                      src={
                        post.fields["company_logo (from Company_3)"]
                          ? post.fields["company_logo (from Company_3)"][0].url
                          : ""
                      }
                      width={matchSm ? 60 : 100}
                      height={matchSm ? 60 : 100}
                      alt={post.fields[`company_name (from Company 3)`]}
                    />
                    <p className="text-xl max-sm:text-base">
                      {post.fields[`company_name (from Company 3)`]
                        ? post.fields[`company_name (from Company 3)`]
                        : null}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center max-md:hidden">
                  <div className="flex flex-col gap-4 max-sm:m-auto">
                    <div className="flex gap-4 items-center">
                      <Image
                        src="/process.svg"
                        width={50}
                        height={80}
                        alt="process-1"
                      ></Image>
                      <div>
                        <p className="font-bold text-lg">
                          {post.fields.companies_reviewed}
                        </p>
                        <p className="text-sm">Companies Reviewed</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Image
                        src="/process-1.svg"
                        width={50}
                        height={80}
                        alt="process-2"
                      ></Image>
                      <div>
                        <p className="font-bold text-lg">10</p>
                        <p className="text-sm">Companies Curated</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Image
                        src="/process-2.svg"
                        width={50}
                        height={80}
                        alt="process-3"
                      ></Image>
                      <div>
                        <p className="font-bold text-lg">3</p>
                        <p className="text-sm">Top Picks</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* selection process */}
          <div className="grid grid-cols-[1fr_1fr] gap-6 bg-medDark p-8 divide-x divide-orange max-lg:grid-cols-1">
            <div>
              <h2 className="text-3xl text-white pb-4 leading-normal">
                Our Selection Criteria
              </h2>
              <p className="text-white">
                {post.fields.our_selection ? post.fields.our_selection : ""}
              </p>
            </div>

            <div className="bg-gray rounded-xl p-8 max-sm:p-3">
              {/* <div className="flex flex-col gap-4 max-sm:m-auto">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/process.svg"
                    width={50}
                    height={80}
                    alt="process-1"
                  ></Image>
                  <div>
                    <p className="font-bold text-lg">
                      {post.fields.companies_reviewed}
                    </p>
                    <p className="text-sm">Companies Reviewed</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <Image
                    src="/process-1.svg"
                    width={50}
                    height={80}
                    alt="process-2"
                  ></Image>
                  <div>
                    <p className="font-bold text-lg">10</p>
                    <p className="text-sm">Companies Curated</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <Image
                    src="/process-2.svg"
                    width={50}
                    height={80}
                    alt="process-3"
                  ></Image>
                  <div>
                    <p className="font-bold text-lg">3</p>
                    <p className="text-sm">Top Picks</p>
                  </div>
                </div>
              </div> */}
              <div className="flex flex-col gap-4 px-5">
                <div className="flex gap-2 items-start">
                  <Image
                    src="/process.svg"
                    width={20}
                    height={20}
                    alt="Reputation"
                    className="max-sm:hidden"
                  ></Image>
                  <div>
                    <p className="font-bold text-md leading-tight">
                      1. Instructor Qualifications{" "}
                    </p>
                    <p className="text-sm text-medDark">
                      Certified, experienced instructors who provide
                      personalised training
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <Image
                    src="/process.svg"
                    width={20}
                    height={20}
                    alt="Credibility"
                    className="max-sm:hidden"
                  ></Image>
                  <div>
                    <p className="font-bold text-md leading-tight">
                      2. Curriculum{" "}
                    </p>
                    <p className="text-sm text-medDark">
                      Offer a variety of courses, from basic driver education
                      and road test preparation
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <Image
                    src="/process.svg"
                    width={20}
                    height={20}
                    alt="Experience"
                    className="max-sm:hidden"
                  ></Image>
                  <div>
                    <p className="font-bold text-md leading-tight">
                      3. Reviews{" "}
                    </p>
                    <p className="text-sm text-medDark">
                      High success rates in licensing exams and positive
                      feedback from past students
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <Image
                    src="/process.svg"
                    width={20}
                    height={20}
                    alt="Professionalism"
                    className="max-sm:hidden"
                  ></Image>
                  <div>
                    <p className="font-bold text-md leading-tight">
                      4. Affordability{" "}
                    </p>
                    <p className="text-sm text-medDark">
                      Offer package deals, payment plans, and flexible class
                      schedules.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Companies */}
          <div className="py-5 px-8 max-sm:px-3">
            <h2 className="text-4xl leading-normal text-dark font-medium pt-4">
              {post.fields.heading_h2}
            </h2>
            {/* company 1 */}
            {post.fields.Company_1 ? (
              <CompanyCard
                image={post.fields["company_logo (from Company_1)"][0].url}
                phone={post.fields[`number (from Company 1)`][0]}
                url={post.fields[`website_url (from Company 1)`][0]}
                name={post.fields["company_name (from Company 1)"][0]}
                address={post.fields["address (from Company 1)"][0]}
                description={
                  post.fields["company_description (from Company 1)"][0]
                }
              />
            ) : null}

            {/* company 2 */}
            {post.fields.Company_2 ? (
              <CompanyCard
                image={post.fields["company_logo (from Company_2)"][0].url}
                phone={post.fields[`number (from Company 2)`][0]}
                url={post.fields[`website_url (from Company 2)`][0]}
                name={post.fields["company_name (from Company 2)"][0]}
                address={post.fields["address (from Company 2)"][0]}
                description={
                  post.fields["company_description (from Company 2)"][0]
                }
              />
            ) : null}

            {/* company 3 */}
            {post.fields.Company_3 ? (
              <CompanyCard
                image={post.fields["company_logo (from Company_3)"][0].url}
                phone={post.fields[`number (from Company 3)`][0]}
                url={post.fields[`website_url (from Company 3)`][0]}
                name={post.fields["company_name (from Company 3)"][0]}
                address={post.fields["address (from Company 3)"][0]}
                description={
                  post.fields["company_description (from Company 3)"][0]
                }
              />
            ) : null}

            {/* company 4 */}
            {post.fields.Company_4 ? (
              <CompanyCard
                image={post.fields["company_logo (from Company_4)"][0].url}
                phone={post.fields[`number (from Company 4)`][0]}
                url={post.fields[`website_url (from Company 4)`][0]}
                name={post.fields["company_name (from Company 4)"][0]}
                address={post.fields["address (from Company 4)"][0]}
                description={
                  post.fields["company_description (from Company 4)"][0]
                }
              />
            ) : null}

            {/* company 5 */}
            {post.fields.Company_5 ? (
              <CompanyCard
                image={post.fields["company_logo (from Company_5)"][0].url}
                phone={post.fields[`number (from Company 5)`][0]}
                url={post.fields[`website_url (from Company 5)`][0]}
                name={post.fields["company_name (from Company 5)"][0]}
                address={post.fields["address (from Company 5)"][0]}
                description={
                  post.fields["company_description (from Company 5)"][0]
                }
              />
            ) : null}

            {/* company 6 */}
            {post.fields.Company_6 ? (
              <CompanyCard
                image={post.fields["company_logo (from Company_6)"][0].url}
                phone={post.fields[`number (from Company 6)`][0]}
                url={post.fields[`website_url (from Company 6)`][0]}
                name={post.fields["company_name (from Company 6)"][0]}
                address={post.fields["address (from Company 6)"][0]}
                description={
                  post.fields["company_description (from Company 6)"][0]
                }
              />
            ) : null}

            {/* company 7 */}
            {post.fields.Company_7 ? (
              <CompanyCard
                image={post.fields["company_logo (from Company_7)"][0].url}
                phone={post.fields[`number (from Company 7)`][0]}
                url={post.fields[`website_url (from Company 7)`][0]}
                name={post.fields["company_name (from Company 7)"][0]}
                address={post.fields["address (from Company 7)"][0]}
                description={
                  post.fields["company_description (from Company 7)"][0]
                }
              />
            ) : null}

            {/* company 8 */}
            {post.fields.Company_8 ? (
              <CompanyCard
                image={post.fields["company_logo (from Company_8)"][0].url}
                phone={post.fields[`number (from Company 8)`][0]}
                url={post.fields[`website_url (from Company 8)`][0]}
                name={post.fields["company_name (from Company 8)"][0]}
                address={post.fields["address (from Company 8)"][0]}
                description={
                  post.fields["company_description (from Company 8)"][0]
                }
              />
            ) : null}

            {/* company 9 */}
            {post.fields.Company_9 ? (
              <CompanyCard
                image={post.fields["company_logo (from Company_9)"][0].url}
                phone={post.fields[`number (from Company 9)`][0]}
                url={post.fields[`website_url (from Company 9)`][0]}
                name={post.fields["company_name (from Company 9)"][0]}
                address={post.fields["address (from Company 9)"][0]}
                description={
                  post.fields["company_description (from Company 9)"][0]
                }
              />
            ) : null}

            {/* company 10 */}
            {post.fields.Company_10 ? (
              <CompanyCard
                image={post.fields["company_logo (from Company_10)"][0].url}
                phone={post.fields[`number (from Company 10)`][0]}
                url={post.fields[`website_url (from Company 10)`][0]}
                name={post.fields["company_name (from Company 10)"][0]}
                address={post.fields["address (from Company 10)"][0]}
                description={
                  post.fields["company_description (from Company 10)"][0]
                }
              />
            ) : null}
          </div>
        </div>
      </Container>
    </Layout>
  );
}
