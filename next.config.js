/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyimage.com",
      },
    ],
  },
};

module.exports = nextConfig;
