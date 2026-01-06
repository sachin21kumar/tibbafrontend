import { Metadata } from "next";
import LocationCard from "../components/locations/locations";

// Page metadata
export const metadata: Metadata = {
  title: "Location Archive - Tibba Restaurant",
  description:
    "Explore all Tibba Restaurant locations. Find addresses, contact info, and directions to your nearest branch.",
};

// Example API endpoint (replace with your real API)
const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/locations`;

export default async function Index() {
  // Fetch locations dynamically from your API
  const res = await fetch(API_URL, { cache: "no-store" }); // no-store ensures fresh data
  const locations: {
    id: number;
    name: string;
    location: string;
    mobileNumber: string;
    url: string;
    lat: number;
    lng: number;
  }[] = await res.json();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Tibba Restaurant",
    hasMap: "https://www.tibbarestaurant.com/locations",
    location: locations.map((loc) => ({
      "@type": "Place",
      name: loc.name,
      address: loc.location,
      telephone: loc.mobileNumber,
      geo: {
        "@type": "GeoCoordinates",
        latitude: loc.lat,
        longitude: loc.lng,
      },
    })),
  };

  return (
    <>
      {/* Inject JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Render your location cards */}
      <LocationCard />
    </>
  );
}
