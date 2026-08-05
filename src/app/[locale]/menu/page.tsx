import Gallery from "@/app/components/gallery/Gallery";
import type { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Gallery | Tibba Restaurant",
  description:
    "Explore the Tibba Restaurant gallery featuring authentic Yemeni dishes, traditional ambiance, and memorable dining moments.",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Gallery | Tibba Restaurant",
    description:
      "Explore the Tibba Restaurant gallery showcasing authentic Yemeni cuisine and a warm dining atmosphere.",
    siteName: "Tibba Restaurant",
    type: "website",
    url: "https://tibba.ae/gallery",
  },

  twitter: {
    card: "summary_large_image",
    title: "Gallery | Tibba Restaurant",
    description:
      "Explore the Tibba Restaurant gallery showcasing authentic Yemeni cuisine and dining experience.",
  },
};

export default async function Page() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const hasMenuSection = categories
    .map((category: any) => {
      const categoryProducts = products.filter(
        (p: any) => p.categoryId === category._id && p.isActive === 1,
      );
      if (!categoryProducts.length) return null;

      return {
        "@type": "MenuSection",
        name: category.title,
        hasMenuItem: categoryProducts.map((product: any) => ({
          "@type": "MenuItem",
          name: product.name,
          description: product.description || undefined,
          image: product.imagePath
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${product.imagePath}`
            : undefined,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "AED",
            availability: "https://schema.org/InStock",
          },
        })),
      };
    })
    .filter(Boolean);

  const schema = hasMenuSection.length && {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Tibba Restaurant",
    url: "https://tibba.ae/menu",
    image: "https://tibba.ae/header.webp",
    telephone: ["+97142578585", "+97142578584"],
    priceRange: "$$",
    servesCuisine: "Yemeni",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Al Qusais",
      addressLocality: "Dubai",
      addressCountry: "AE",
      postalCode: "V2GV+4X8",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "11:00",
        closes: "24:00",
      },
    ],
    hasMenu: {
      "@type": "Menu",
      name: "Tibba Restaurant Menu",
      hasMenuSection,
    },
  };

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <Gallery categories={categories} products={products} />
    </>
  );
}
