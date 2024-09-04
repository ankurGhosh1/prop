module.exports = {
  siteUrl: "https://www.mydrivingschools.com/",
  sitemapSize: 7000,
  generateRobotsTxt: true, // (optional)
  indexSitemaps: false,
  robotsTxtOptions: {
    host: null,
    policies: [
      {
        userAgent: "*",
        // allow: "/",
        disallow: "/", // Uncomment and change to disallow specific paths
      },
    ],
  },
};
