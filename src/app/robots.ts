import type { MetadataRoute } from "next";
import { i18n } from "@/i18n/config";
import { SITE_URL } from "@/lib/seoRoutes";

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
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      ...i18n.locales.map((locale) => `${SITE_URL}/${locale}/sitemap.xml`),
    ],
    host: SITE_URL,
  };
}
