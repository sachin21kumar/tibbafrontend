import LocationCard from "@/app/components/locations/locations";
import { Metadata } from "next";
import { locationDisplayName, locationSlug } from "@/lib/slug";

export const metadata: Metadata = {
  title: "Location Archive - Tibba Restaurant",
  description:
    "Explore all Tibba Restaurant locations. Find addresses, contact info, and directions to your nearest branch.",
};

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
