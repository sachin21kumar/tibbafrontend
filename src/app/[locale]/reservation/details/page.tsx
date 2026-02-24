import ReservationDetails from "@/app/components/order/reservationDetail";
import { Suspense } from "react";

export default function index() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ReservationDetails />
    </Suspense>
  );
}
