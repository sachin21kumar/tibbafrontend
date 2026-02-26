import type { Metadata } from "next";
import LocationDetails from "@/app/components/locations/locationDetail";

async function getLocation(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/locations/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) return null;

  return res.json();
}

function convertTo24Hour(timeStr: string) {
  const [time, modifier] = timeStr.trim().split(" ");

  let [hours, minutes] = time.split(":");

  if (!minutes) minutes = "00";

  if (modifier.toLowerCase() === "pm" && hours !== "12") {
    hours = String(parseInt(hours, 10) + 12);
  }

  if (modifier.toLowerCase() === "am" && hours === "12") {
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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const location = await getLocation(id);
  const hours = parseOperatingHours(location?.operation_hours);

  const imageUrl = location?.imagePath
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${location.imagePath}`
    : "https://tibba.ae/logo.png";
  const schema = location && {
    "@context": "https://schema.org",
    "@type": "Restaurant",

    "@id": `https://tibba.ae/locations/${location._id}`,

    name: location.name,
    description: location.description,

    image: [imageUrl],

    email: location.branchEmail,

    telephone: `+971${location.telephone.replace(/\s/g, "")}`,

    url: `https://tibba.ae/locations/${location._id}`,

    servesCuisine: "Yemeni Cuisine",

    address: {
      "@type": "PostalAddress",
      streetAddress: location.area,
      addressLocality: "Dubai",
      addressCountry: "AE",
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
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      )}

      <LocationDetails id={id} />
    </>
  );
}
