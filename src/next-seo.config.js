// src/next-seo.config.js
const SEO = {
  title: "My Driving School",
  description: "My Driving School",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.mydrivingschools.com/",
    site_name: "My Driving School",
    images: [
      {
        url: "https://www.mydrivingschools.com/default-image.jpg",
        width: 800,
        height: 600,
        alt: "Default Image",
      },
    ],
  },
};

export default SEO;
