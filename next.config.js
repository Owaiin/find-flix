/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
module.exports = {
  images: {
    domains: [
      "utellyassets9-4.imgix.net",
      "utellyassets9-3.imgix.net",
      "utellyassets9-2.imgix.net",
      "utellyassets9-1.imgix.net",
    ],
  },
  env: {
    RAPID_API_KEY: process.env.RAPID_API_KEY,
    IMDB_API_KEY: process.env.IMDB_API_KEY,
  },
};
