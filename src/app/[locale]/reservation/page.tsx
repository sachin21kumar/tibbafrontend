import { Suspense } from "react";
import ReservationPage from "../../components/order/reservation";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/seoRoutes";
import { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${SITE_URL}/${locale}/reservation`;
  const title = "Reservation | Tibba";
  const description = "Make a reservation at Tibba restaurant.";
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

export default function ReservationPageWrapper() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ReservationPage />
    </Suspense>
  );
}