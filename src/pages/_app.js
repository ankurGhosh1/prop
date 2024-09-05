import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { NextSeo } from "next-seo";

const GA_TRACKING_ID = "G-7Z44WV13KY";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
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
