/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.4",
        port: "4000",
        pathname: "/uploads/**",
      },

      {
        protocol: "http",
        hostname: "50.6.249.155",
        port: "4000",
        pathname: "/uploads/**",
      },

      {
        protocol: "https",
        hostname: "f.nooncdn.com",
      },
    ],
  },
};

module.exports = nextConfig;
