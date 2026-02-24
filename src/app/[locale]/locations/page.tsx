import LocationCard from "@/app/components/locations/locations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Location Archive - Tibba Restaurant",
  description:
    "Explore all Tibba Restaurant locations. Find addresses, contact info, and directions to your nearest branch.",
};

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/locations`;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default async function Index() {
  const res = await fetch(API_URL, { cache: "no-store" });
  const locations: {
    id: number;
    name: string;
    location: string;
    mobileNumber: string;
    url: string;
    lat: number;
    lng: number;
    imagePath: string;
  }[] = await res.json();
  const schema = {
    "@context": "https://schema.org",
    "@graph": locations.map((loc) => ({
      "@type": "Restaurant",
      "@id": `${loc.url}#restaurant`,
      name: `Tibba Restaurant - ${loc.name}`,
      url: loc.url,

      image: `${BASE_URL}/uploads/products/${loc.imagePath}`,

      telephone: loc.mobileNumber,

      priceRange: "₹₹",

      servesCuisine: ["Indian", "North Indian", "Street Food", "Fast Food"],

      address: {
        "@type": "PostalAddress",
        streetAddress: loc.location,
        addressCountry: "IN",
      },

      geo: {
        "@type": "GeoCoordinates",
        latitude: loc.lat,
        longitude: loc.lng,
      },

      hasMap: `https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`,
    })),
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
