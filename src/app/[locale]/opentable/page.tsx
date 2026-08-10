import type { Metadata } from "next";
import OpenTable from "../../components/openTable/openTable";
import { SITE_URL } from "@/lib/seoRoutes";
import { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const canonical = `${SITE_URL}/${locale}/opentable`;
  const image = `${SITE_URL}/header.webp`;

  const title = isAr
    ? "الحجوزات | مطعم طيبة"
    : "Reservations | Tibba Restaurant";
  const description = isAr
    ? "احجز طاولة في مطعم طيبة واستمتع بالمأكولات اليمنية الأصيلة. احجز طاولتك عبر الإنترنت بسرعة وسهولة."
    : "Book a table at Tibba Restaurant and enjoy authentic Yemeni cuisine. Reserve your table online quickly and easily.";
  const ogDescription = isAr
    ? "احجز طاولة في مطعم طيبة واستمتع بالنكهات اليمنية الأصيلة."
    : "Reserve a table at Tibba Restaurant and enjoy authentic Yemeni flavors.";
  const twitterDescription = isAr
    ? "احجز طاولتك في مطعم طيبة واستمتع بالمأكولات اليمنية الأصيلة."
    : "Book your table at Tibba Restaurant and enjoy authentic Yemeni cuisine.";
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
      description: ogDescription,
      siteName,
      type: "website",
      url: canonical,
      images: [image],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description: twitterDescription,
      images: [image],
    },
  };
}

export default function Page() {
  return <OpenTable />;
}
