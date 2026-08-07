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

  return {
    title: "Reservation Details | Tibba",
    description: "View reservation details.",
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/reservation/details`,
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