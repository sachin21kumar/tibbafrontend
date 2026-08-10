import Gallery from "@/app/components/gallery/Gallery";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seoRoutes";
import { Locale } from "@/i18n/config";

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const json = await res.json();
  return json?.data ?? [];
}

async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/product?page=1&limit=1000`,
    { cache: "no-store" },
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
  const canonical = `${SITE_URL}/${locale}/menu`;
  const image = `${SITE_URL}/header.webp`;

  return {
    title: "Gallery | Tibba Restaurant",
    description:
      "Explore the Tibba Restaurant gallery featuring authentic Yemeni dishes, traditional ambiance, and memorable dining moments.",

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical,
    },

    openGraph: {
      title: "Gallery | Tibba Restaurant",
      description:
        "Explore the Tibba Restaurant gallery showcasing authentic Yemeni cuisine and a warm dining atmosphere.",
      siteName: "Tibba Restaurant",
      type: "website",
      url: canonical,
      images: [image],
    },

    twitter: {
      card: "summary_large_image",
      title: "Gallery | Tibba Restaurant",
      description:
        "Explore the Tibba Restaurant gallery showcasing authentic Yemeni cuisine and dining experience.",
      images: [image],
    },
  };
}

export default async function Page() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
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
