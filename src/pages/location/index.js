// pages/location.js
import { NextSeo } from "next-seo";
import { fetchPosts } from "../../lib/airtableapi";
import Layout from "../../components/Layout";
import Link from "next/link";
import Container from "../../components/Container";

const Location = ({ posts }) => {
  // console.log(posts);
  return (
    <Layout>
      <NextSeo
        title="Blog - My Blog"
        description="Read the latest posts on My Blog."
        openGraph={{
          url: "https://www.myblog.com/blog",
          title: "Blog - My Blog",
          description: "Read the latest posts on My Blog.",
          images: [
            {
              url: "https://www.myblog.com/blog-image.jpg",
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
      />
      <Container>
        <div className="py-16">
          <h1 className="text-5xl pb-12">All Location</h1>
          <div className="grid grid-cols-3 py-8">
            {posts.map((post) => (
              <Link href={`/location/${post.fields.slug}`} key={post.id}>
                <h2 className="text-2xl pb-3">{post.fields.name}</h2>
                <p>{post.fields.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Location;

export async function getServerSideProps() {
  const posts = await fetchPosts();

  return {
    props: {
      posts,
    },
  };
}
