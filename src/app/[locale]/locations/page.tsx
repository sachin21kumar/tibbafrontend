import LocationCard from "@/app/components/locations/locations";
import { Metadata } from "next";
import { locationDisplayName, locationSlug } from "@/lib/slug";
import { SITE_URL } from "@/lib/seoRoutes";
import { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${SITE_URL}/${locale}/locations`;
  const title = "Location Archive - Tibba Restaurant";
  const description =
    "Explore all Tibba Restaurant locations. Find addresses, contact info, and directions to your nearest branch.";
  const image = `${SITE_URL}/locations.webp`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      siteName: "Tibba Restaurant",
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

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/locations`;

export default async function Index({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const res = await fetch(API_URL, { cache: "no-store" });
  const locations: { name: string }[] = await res.json();

  const listUrl = `https://tibba.ae/${locale}/locations`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${listUrl}#locations`,
    name: "Tibba Restaurant Locations",
    url: listUrl,
    numberOfItems: locations.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: locations.map((loc, index) => {
      const itemUrl = `https://tibba.ae/${locale}/locations/${locationSlug(loc.name)}`;

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@id": itemUrl,
          name: locationDisplayName(loc.name),
          url: itemUrl,
        },
      };
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <LocationCard />
    </>
  );
}
