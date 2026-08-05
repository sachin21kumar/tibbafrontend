import type { MetadataRoute } from "next";
import { i18n } from "@/i18n/config";
import { SITE_URL, seoRoutes } from "@/lib/seoRoutes";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return i18n.locales.flatMap((locale) =>
    seoRoutes.map(({ path, changeFrequency, priority }) => ({
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
