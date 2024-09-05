import "@/styles/globals.css";
import { NextSeo } from "next-seo";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics />
      <NextSeo
        title="Best Driving School"
        description="Best Driving Schools"
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
