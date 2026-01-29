/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ❗ Keep this TRUE because:
    // - Local uses private IP (192.168.x.x)
    // - VPS uses raw IP + port
    // Next/Image optimizer will otherwise block these
    unoptimized: true,

    remotePatterns: [
      // ✅ LOCAL backend
      {
        protocol: "http",
        hostname: "192.168.1.9",
        port: "4000",
        pathname: "/uploads/**",
      },

      // ✅ VPS backend
      {
        protocol: "http",
        hostname: "50.6.249.155",
        port: "4000",
        pathname: "/uploads/**",
      },

      // ✅ External placeholder CDN
      {
        protocol: "https",
        hostname: "f.nooncdn.com",
      },
    ],
  },
};

module.exports = nextConfig;
