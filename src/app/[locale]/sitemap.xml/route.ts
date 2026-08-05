import { NextResponse } from "next/server";
import { i18n, type Locale } from "@/i18n/config";
import { SITE_URL, seoRoutes, getDynamicLocationRoutes } from "@/lib/seoRoutes";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  if (!i18n.locales.includes(locale as Locale)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const lastModified = new Date().toISOString();
  const allRoutes = [...seoRoutes, ...(await getDynamicLocationRoutes())];

  const urls = allRoutes
    .map(({ path, changeFrequency, priority }) => {
      const alternates = i18n.locales
        .map(
          (l) =>
            `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}${path}"/>`,
        )
        .join("");

      return `<url><loc>${SITE_URL}/${locale}${path}</loc><lastmod>${lastModified}</lastmod><changefreq>${changeFrequency}</changefreq><priority>${priority}</priority>${alternates}</url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
