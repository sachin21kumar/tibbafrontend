import ReservationDetails from "@/app/components/order/reservationDetail";
import { Suspense } from "react";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/seoRoutes";
import { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${SITE_URL}/${locale}/reservation/details`;
  const title = "Reservation Details | Tibba";
  const description = "View reservation details.";
  const image = `${SITE_URL}/header.webp`;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      siteName: "Tibba",
      type: "website",
      url: canonical,
      images: [image],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [image],
    },
  };
}

export default function ReservationDetailsPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ReservationDetails />
    </Suspense>
  );
}