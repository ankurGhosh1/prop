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

  // console.log(post.fields);
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
                <Heading1>{post.fields.heading_h1}</Heading1>
                <div className="h-[.1rem] w-24 bg-orange mb-6 max-sm:m-auto"></div>
                <p className="text-gray max-sm:pt-5 max-sm:text-center text-base">
                  {post.fields.description}
                </p>
              </div>
              <Image
                src={post.fields.banner_image[0].url}
                // src="/badge.png"
                width={match ? 350 : 320}
                height={match ? 350 : 320}
                alt={`Badge for ${post.fields.name}`}
              />
            </div>
          </div>
          {/* top picks */}
          <div className="flex items-center justify-center py-8 bg-medDark">
            <div className="bg-white p-5 w-3/4 rounded-xl max-md:w-full max-md:mx-5">
              <p className="text-2xl font-bold">Our Top Three Picks</p>
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Image
                        src={
                          post.fields[`logo (from Company 1)`]
                            ? post.fields[`logo (from Company 1)`][0]
                            : ""
                        }
                        width={60}
                        height={60}
                        alt={post.fields[`company_name (from Company 1)`]}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <p className="text-xl">
                        {post.fields[`company_name (from Company 1)`]
                          ? post.fields[`company_name (from Company 1)`]
                          : null}
                      </p>
                    </td>
                    <td>
                      <RatingStars
                        rating={
                          post.fields[`rating (from Company 1)`]
                            ? post.fields[`rating (from Company 1)`]
                            : null
                        }
                        maxRating={5}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Image
                        src={
                          post.fields[`logo (from Company 2)`]
                            ? post.fields[`logo (from Company 2)`][0]
                            : ""
                        }
                        width={60}
                        height={60}
                        alt={post.fields[`company_name (from Company 2)`]}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <p className="text-xl">
                        {post.fields[`company_name (from Company 2)`]
                          ? post.fields[`company_name (from Company 2)`]
                          : null}
                      </p>
                    </td>
                    <td>
                      <RatingStars
                        rating={
                          post.fields[`rating (from Company 2)`]
                            ? post.fields[`rating (from Company 2)`]
                            : null
                        }
                        maxRating={5}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Image
                        src={
                          post.fields[`logo (from Company 3)`]
                            ? post.fields[`logo (from Company 3)`][0]
                            : ""
                        }
                        width={60}
                        height={60}
                        alt={post.fields[`company_name (from Company 3)`]}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <p className="text-xl">
                        {post.fields[`company_name (from Company 3)`]
                          ? post.fields[`company_name (from Company 3)`]
                          : null}
                      </p>
                    </td>
                    <td>
                      <RatingStars
                        rating={
                          post.fields[`rating (from Company 3)`]
                            ? post.fields[`rating (from Company 3)`]
                            : null
                        }
                        maxRating={5}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* selection process */}
          <div className="grid grid-cols-[.75fr_1fr] gap-6 bg-medDark p-8 divide-x divide-orange max-lg:grid-cols-1">
            <div>
              <h3 className="text-3xl text-white pb-4 leading-normal">
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
              </div>
              <div className="flex flex-col gap-4 px-5">
                <div className="flex gap-2 items-start">
                  <Image
                    src="/process.svg"
                    width={20}
                    height={20}
                    alt="Reputation"
                  ></Image>
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
                  <Image
                    src="/process.svg"
                    width={20}
                    height={20}
                    alt="Credibility"
                  ></Image>
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
                  <Image
                    src="/process.svg"
                    width={20}
                    height={20}
                    alt="Experience"
                  ></Image>
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
                  <Image
                    src="/process.svg"
                    width={20}
                    height={20}
                    alt="Professionalism"
                  ></Image>
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
          <div className="py-5 px-8">
            <h2 className="text-4xl leading-normal text-dark font-medium pt-4">
              {post.fields.heading_h2}
            </h2>
            {/* company 1 */}
            {post.fields.Company_1 ? (
              <CompanyCard
                image={post.fields[`logo (from Company 1)`][0]}
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
                image={post.fields[`logo (from Company 2)`][0]}
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
                image={post.fields[`logo (from Company 3)`][0]}
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
                image={post.fields[`logo (from Company 4)`][0]}
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
                image={post.fields[`logo (from Company 5)`][0]}
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
                image={post.fields[`logo (from Company 6)`][0]}
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
                image={post.fields[`logo (from Company 7)`][0]}
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
                image={post.fields[`logo (from Company 8)`][0]}
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
                image={post.fields[`logo (from Company 9)`][0]}
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
                image={post.fields[`logo (from Company 10)`][0]}
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
