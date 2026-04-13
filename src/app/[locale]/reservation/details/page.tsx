import ReservationDetails from "@/app/components/order/reservationDetail";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservation Details | Tibba",
  description: "View reservation details.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReservationDetailsPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ReservationDetails />
    </Suspense>
  );
}