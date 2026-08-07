import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LocationDetails from "@/app/components/locations/locationDetail";
import { locationDisplayName, locationSlug } from "@/lib/slug";
import { toUaePhone } from "@/lib/phone";
import { SITE_URL } from "@/lib/seoRoutes";
import { Locale } from "@/i18n/config";

async function getLocations() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/locations`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

function convertTo24Hour(timeStr: string) {
  const [time, modifier] = timeStr.trim().split(" ");

  let [hours, minutes] = time.split(":");

  if (!minutes) minutes = "00";

  if (modifier?.toLowerCase() === "pm" && hours !== "12") {
    hours = String(parseInt(hours, 10) + 12);
  }

  if (modifier?.toLowerCase() === "am" && hours === "12") {
    hours = "00";
  }

  return `${hours.padStart(2, "0")}:${minutes}`;
}

function parseOperatingHours(operation_hours: string) {
  if (!operation_hours) return null;

  const parts = operation_hours.split("-");
  if (parts.length !== 2) return null;

  const opens = convertTo24Hour(parts[0]);
  const closes = convertTo24Hour(parts[1]);

  return { opens, closes };
}

// The API's `location` field ends in ", Dubai", which is redundant next to
// addressLocality: "Dubai" in the schema.
function toStreetAddress(location: string) {
  return location.replace(/,\s*Dubai\s*$/i, "").trim();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const locations = await getLocations();
  const location = locations.find(
    (loc: any) => locationSlug(loc.name) === slug,
  );

  const name = location
    ? locationDisplayName(location.name)
    : "Tibba Restaurant";

  return {
    title: `${name} | Tibba Restaurant`,
    description: `Visit the ${name} branch of Tibba Restaurant. Find address, opening hours, contact details and directions.`,
    alternates: {
      canonical: `${SITE_URL}/${locale}/locations/${slug}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const locations = await getLocations();
  const location = locations.find(
    (loc: any) => locationSlug(loc.name) === slug,
  );

  if (!location) notFound();

  const hours = parseOperatingHours(location.operation_hours);

  const imageUrl = location.imagePath
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${location.imagePath}`
    : "https://tibba.ae/logo.png";

  const url = `https://tibba.ae/${locale}/locations/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${url}#restaurant`,
    url,

    name: locationDisplayName(location.name),

    image: imageUrl,

    telephone: toUaePhone(location.telephone || location.mobileNumber),

    priceRange: "$$",

    servesCuisine: ["Indian", "North Indian", "Street Food", "Fast Food"],

    address: {
      "@type": "PostalAddress",
      streetAddress: toStreetAddress(location.location || location.area),
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: location.lat,
      longitude: location.lng,
    },

    hasMap:
      location.googleLink ||
      `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`,

    openingHoursSpecification: hours && [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: hours.opens,
        closes: hours.closes,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <LocationDetails location={location} />
    </>
  );
}
