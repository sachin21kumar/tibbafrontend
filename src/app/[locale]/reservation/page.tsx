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

  return {
    title: "Reservation | Tibba",
    description: "Make a reservation at Tibba restaurant.",
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/reservation`,
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