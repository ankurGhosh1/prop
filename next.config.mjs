/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v5.airtableusercontent.com",
      },
      {
        protocol: "https",
        hostname: "uploads-ssl.webflow.com",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
