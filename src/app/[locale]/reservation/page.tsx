import { Suspense } from "react";
import ReservationPage from "../../components/order/reservation";

export default function index() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ReservationPage />
    </Suspense>
  );
}
