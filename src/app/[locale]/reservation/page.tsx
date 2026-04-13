import { Suspense } from "react";
import ReservationPage from "../../components/order/reservation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservation | Tibba",
  description: "Make a reservation at Tibba restaurant.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReservationPageWrapper() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ReservationPage />
    </Suspense>
  );
}