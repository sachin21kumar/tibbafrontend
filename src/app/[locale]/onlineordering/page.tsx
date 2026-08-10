import type { Metadata } from "next";
import MenuPage from "../../components/products/getAllProducts";
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
  const isAr = locale === "ar";
  const canonical = `${SITE_URL}/${locale}/onlineordering`;
  const image = `${SITE_URL}/header.webp`;

  const title = isAr ? "المتجر | مطعم طيبة" : "Shop | Tibba Restaurant";
  const description = isAr
    ? "تصفح قائمة مطعم طيبة التي تضم أطباقًا يمنية أصيلة ووجبات طازجة ونكهات تقليدية. الطلب عبر الإنترنت قريبًا."
    : "Browse the Tibba Restaurant menu featuring authentic Yemeni dishes, fresh meals, and traditional flavors. Online ordering coming soon.";
  const shortDescription = isAr
    ? "استكشف قائمة مطعم طيبة بالمأكولات اليمنية الأصيلة. الطلب عبر الإنترنت قريبًا."
    : "Explore the Tibba Restaurant menu with authentic Yemeni cuisine. Online ordering coming soon.";
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
      description: shortDescription,
      siteName,
      type: "website",
      url: canonical,
      images: [image],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description: shortDescription,
      images: [image],
    },
  };
}

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
            ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/uploads/products/${product.imagePath}`
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
    url: "https://tibba.ae/onlineordering",
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
      <MenuPage />
    </>
  );
}
