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
  async redirects() {
    return [
      {
        source: "/en/locations/tibba-restaurant-for-mandi-madhbi-al-aweer",
        destination: "/en/locations/tibba-al-aweer",
        permanent: true,
      },
      {
        source: "/en/locations/tibba-restaurant-for-mandi-madhbi-business-bay",
        destination: "/en/locations/tibba-business-bay",
        permanent: true,
      },
      {
        source: "/en/locations/tibba-restaurant-for-mandi-madhbi-dic",
        destination: "/en/locations/tibba-dic",
        permanent: true,
      },
      {
        source: "/en/locations/tibba-restaurant-for-mandi-madhbi-al-qusais",
        destination: "/en/locations/tibba-al-qusais",
        permanent: true,
      },
      {
        source: "/en/locations/tibba-restaurant-for-mandi-madhbi-deira",
        destination: "/en/locations/tibba-deira",
        permanent: true,
      },
      {
        source: "/en/locations/tibba-restaurant-for-mandi-madhbi-abu-hail",
        destination: "/en/locations/tibba-abu-hail",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
