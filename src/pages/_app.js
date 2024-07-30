import "@/styles/globals.css";
import { NextSeo } from "next-seo";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NextSeo
        title="Default Title"
        description="Default description for the site."
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://www.example.com",
          site_name: "Default Site Name",
          images: [
            {
              url: "https://www.example.com/default-image.jpg",
              width: 800,
              height: 600,
              alt: "Default Image",
            },
          ],
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
