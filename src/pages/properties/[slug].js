// src/app/blog/[id]/page.js
import { NextSeo } from "next-seo";
import { fetchPostBySlug } from "../../lib/airtableapi";
import Layout from "../components/Layout";

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const post = await fetchPostBySlug(slug); // Ensure this resolves to data

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post, // This should be data, not a Promise
    },
  };
}

export default function PropertiesPage({ post }) {
  return (
    <Layout>
      <NextSeo
        title={`${post.fields.Name} - Properties in ${post.fields.Name}`}
        description={post.fields.Summary}
        openGraph={{
          url: `https://www.myblog.com/blog/${post.fields.slug}`,
          title: `${post.fields.Title} - My Blog`,
          description: post.fields.Summary,
          images: [
            {
              url: post.fields.ImageURL,
              width: 800,
              height: 600,
              alt: post.fields.Name,
            },
          ],
        }}
      />

      <h1>{post.fields.Name}</h1>
      <p>{post.fields.Content}</p>
    </Layout>
  );
}
