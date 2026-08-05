import type { MetadataRoute } from "next";
import { i18n } from "@/i18n/config";
import { SITE_URL, seoRoutes, getDynamicSeoRoutes } from "@/lib/seoRoutes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const allRoutes = [...seoRoutes, ...(await getDynamicSeoRoutes())];

  return i18n.locales.flatMap((locale) =>
    allRoutes.map(({ path, changeFrequency, priority }) => ({
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
