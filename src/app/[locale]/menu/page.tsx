import Gallery from "@/app/components/gallery/Gallery";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seoRoutes";
import { Locale } from "@/i18n/config";

async function getCategories(locale: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category`, {
    cache: "no-store",
    headers: { "x-locale": locale },
  });

  if (!res.ok) return [];

  const json = await res.json();
  return json?.data ?? [];
}

async function getProducts(locale: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/product?page=1&limit=1000`,
    { cache: "no-store", headers: { "x-locale": locale } },
  );

  if (!res.ok) return [];

  const json = await res.json();
  return json?.data ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const canonical = `${SITE_URL}/${locale}/menu`;
  const image = `${SITE_URL}/header.webp`;

  const title = isAr
    ? "قائمة مطعم طيبة | مأكولات يمنية أصيلة"
    : "Tibba Restaurant Menu | Authentic Yemeni Cuisine";
  const description = isAr
    ? "استكشف قائمة مطعم طيبة التي تضم أطباقًا يمنية أصيلة، مندي، مدفون، مظبي، مأكولات بحرية، حلويات، عصائر طازجة والمزيد في دبي."
    : "Explore Tibba Restaurant’s menu featuring authentic Yemeni dishes, mandi, madfoon, madhbi, seafood, desserts, fresh juices and more in Dubai.";
  const siteName = isAr ? "مطعم طيبة" : "Tibba Restaurant";

  return {
    title,
    description,

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description,
      siteName,
      type: "website",
      url: canonical,
      images: [image],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const [categories, products] = await Promise.all([
    getCategories(locale),
    getProducts(locale),
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Restaurant",
        "@id": "https://tibba.ae/#restaurant",
        name: "Tibba Restaurant",
        url: "https://tibba.ae/",
        image:
          "https://tibba.ae/api/uploads/products/1785904435772-912862395.webp",
        telephone: ["+971 4 2578585", "+971 4 2578584"],
        priceRange: "د.إ",
        servesCuisine: ["Indian", "North Indian", "Street Food", "Fast Food"],
        hasMenu: {
          "@id": "https://tibba.ae/en/menu#menu",
        },
      },
      {
        "@type": "Menu",
        "@id": "https://tibba.ae/en/menu#menu",
        name: "Tibba Restaurant Menu",
        url: "https://tibba.ae/en/menu",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Gallery categories={categories} products={products} />
    </>
  );
}
