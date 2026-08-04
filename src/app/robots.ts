import type { MetadataRoute } from "next";

const SITE_URL = "https://tibba.ae";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/en/admin",
          "/ar/admin",
          "/en/cart",
          "/ar/cart",
          "/en/checkout",
          "/ar/checkout",
          "/en/order-success",
          "/ar/order-success",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
