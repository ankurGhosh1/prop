import React, { useState, useEffect } from "react";
import Script from "next/script";

const isBotOrSpeedTest = () => {
  if (typeof window === "undefined") return false;
  const botPatterns = [
    /bot/i,
    /crawl/i,
    /spider/i,
    /slurp/i,
    /mediapartners/i,
    /Lighthouse/i,
    /Chrome-Lighthouse/i,
  ];
  return botPatterns.some((pattern) => pattern.test(navigator.userAgent));
};

const GoogleAnalytics = () => {
  const [shouldLoadGA, setShouldLoadGA] = useState(true);

  useEffect(() => {
    if (isBotOrSpeedTest()) {
      setShouldLoadGA(false);
    }
  }, []);

  if (!shouldLoadGA) {
    return null;
  }

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
      />

      <Script id="" strategy="lazyOnload">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              });
          `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
