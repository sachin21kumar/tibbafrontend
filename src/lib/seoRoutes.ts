import { locationSlug } from "@/lib/slug";

export const SITE_URL = (process.env.SITE_URL ?? "https://tibba.ae").replace(
  /\/+$/,
  "",
);

export type SeoChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export type SeoRoute = {
  path: string;
  changeFrequency: SeoChangeFrequency;
  priority: number;
};

// Only routes without `robots: { index: false }` belong here — anything
// noindex must stay out of the sitemap.
export const seoRoutes: SeoRoute[] = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/menu", changeFrequency: "daily", priority: 0.9 },
  { path: "/locations", changeFrequency: "weekly", priority: 0.8 },
  { path: "/opentable", changeFrequency: "weekly", priority: 0.7 },
  { path: "/onlineordering", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
];

// Location detail pages — fetched at sitemap-build time so new branches
// get crawled without a code change.
export async function getDynamicLocationRoutes(): Promise<SeoRoute[]> {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const routes: SeoRoute[] = [];

  try {
    const res = await fetch(`${apiUrl}/locations`, { cache: "no-store" });
    if (res.ok) {
      const locations = await res.json();
      for (const location of locations ?? []) {
        routes.push({
          path: `/locations/${locationSlug(location.name)}`,
          changeFrequency: "weekly",
          priority: 0.6,
        });
      }
    }
  } catch {
    // API unreachable — fall back to static routes only
  }

  return routes;
}

// Product detail pages — not wired into the sitemap yet, kept ready for
// when that's turned on.
export async function getDynamicProductRoutes(): Promise<SeoRoute[]> {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const routes: SeoRoute[] = [];

  try {
    const res = await fetch(`${apiUrl}/product?page=1&limit=1000`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      const products = json?.data ?? [];
      for (const product of products) {
        if (product.isActive !== 1) continue;
        routes.push({
          path: `/product/${product._id}`,
          changeFrequency: "weekly",
          priority: 0.6,
        });
      }
    }
  } catch {
    // API unreachable — fall back to static routes only
  }

  return routes;
}
