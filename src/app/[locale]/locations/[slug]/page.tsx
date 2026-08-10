import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LocationDetails from "@/app/components/locations/locationDetail";
import {
  canonicalLocationName,
  locationDisplayName,
  locationSlug,
} from "@/lib/slug";
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

// The list above is fetched without an x-locale header, so slugs stay
// stable across languages (see locationSlug). Each location still carries
// a `translations` map with per-locale name/description/area/location —
// merge the current locale's copy in for display and metadata.
function localizeLocation(location: any, locale: string) {
  const translation = location?.translations?.[locale];
  if (!translation) return location;

  return { ...location, ...translation };
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
  const isAr = locale === "ar";

  const locations = await getLocations();
  const location = locations.find(
    (loc: any) => locationSlug(canonicalLocationName(loc)) === slug,
  );
  const localized = location ? localizeLocation(location, locale) : null;

  const name = localized
    ? locationDisplayName(localized.name)
    : isAr
      ? "مطعم طيبة"
      : "Tibba Restaurant";

  const canonical = `${SITE_URL}/${locale}/locations/${slug}`;
  const siteName = isAr ? "مطعم طيبة" : "Tibba Restaurant";
  const title = isAr ? `${name} | مطعم طيبة` : `${name} | Tibba Restaurant`;
  const description = isAr
    ? `قم بزيارة فرع ${name} التابع لمطعم طيبة. اعثر على العنوان، ومواعيد العمل، وبيانات التواصل، والاتجاهات.`
    : `Visit the ${name} branch of Tibba Restaurant. Find address, opening hours, contact details and directions.`;
  const image = localized?.imagePath
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${localized.imagePath}`
    : `${SITE_URL}/locations.webp`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      siteName,
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

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const locations = await getLocations();
  const location = locations.find(
    (loc: any) => locationSlug(canonicalLocationName(loc)) === slug,
  );

  if (!location) notFound();

  const localized = localizeLocation(location, locale);

  const hours = parseOperatingHours(localized.operation_hours);

  const imageUrl = localized.imagePath
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${localized.imagePath}`
    : "https://tibba.ae/logo.png";

  const url = `https://tibba.ae/${locale}/locations/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${url}#restaurant`,
    url,

    name: locationDisplayName(localized.name),

    image: imageUrl,

    telephone: toUaePhone(localized.telephone || localized.mobileNumber),

    priceRange: "$$",

    servesCuisine: ["Indian", "North Indian", "Street Food", "Fast Food"],

    address: {
      "@type": "PostalAddress",
      streetAddress: toStreetAddress(localized.location || localized.area),
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: localized.lat,
      longitude: localized.lng,
    },

    hasMap:
      localized.googleLink ||
      `https://www.google.com/maps/search/?api=1&query=${localized.lat},${localized.lng}`,

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

      <LocationDetails location={localized} />
    </>
  );
}
