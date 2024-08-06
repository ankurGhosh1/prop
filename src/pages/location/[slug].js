// src/app/blog/[id]/page.js
import { NextSeo } from "next-seo";
import { fetchPostBySlug } from "../../lib/airtableapi";
import Layout from "../components/Layout";

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

      <h1>{post.fields.name}</h1>
      <p>{post.fields.description}</p>
    </Layout>
  );
}
