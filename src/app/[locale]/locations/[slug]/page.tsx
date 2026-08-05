import { notFound } from "next/navigation";
import LocationDetails from "@/app/components/locations/locationDetail";
import { slugify } from "@/lib/slug";

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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const locations = await getLocations();
  const location = locations.find((loc: any) => slugify(loc.name) === slug);

  if (!location) notFound();

  const hours = parseOperatingHours(location.operation_hours);

  const imageUrl = location.imagePath
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${location.imagePath}`
    : "https://tibba.ae/logo.png";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",

    "@id": `https://tibba.ae/locations/${slug}`,

    name: location.name,
    description: location.description,

    image: [imageUrl],

    email: location.branchEmail,

    telephone: location.telephone || location.mobileNumber,

    priceRange: "$$",

    url: `https://tibba.ae/locations/${slug}`,

    servesCuisine: "Yemeni Cuisine",

    address: {
      "@type": "PostalAddress",
      streetAddress: location.location || location.area,
      addressLocality: "Dubai",
      addressCountry: "AE",
      postalCode: "V2GV+4X8",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: location.lat,
      longitude: location.lng,
    },

    openingHoursSpecification: hours && [
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
