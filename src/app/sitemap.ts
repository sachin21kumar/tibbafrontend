import type { MetadataRoute } from "next";
import { i18n } from "@/i18n/config";

const SITE_URL = "https://tibba.ae";

const routes = [
  { path: "", changeFrequency: "daily" as const, priority: 1 },
  { path: "/menu", changeFrequency: "daily" as const, priority: 0.9 },
  { path: "/locations", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/reservation", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/opentable", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/onlineordering", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/selectLocation", changeFrequency: "monthly" as const, priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return i18n.locales.flatMap((locale) =>
    routes.map(({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((l) => [l, `${SITE_URL}/${l}${path}`])
        ),
      },
    }))
  );
}
