import type { Metadata } from "next";
import OrderSuccessPage from "../../components/order/order-confirm";

export const metadata: Metadata = {
  title: "Order Confirmed | Tibba",
  description:
    "Your order has been successfully placed at Tibba. Thank you for ordering with us.",

  robots: {
    index: false, // NEVER index order confirmation pages
    follow: false,
  },

  openGraph: {
    title: "Order Confirmed | Tibba",
    description: "Your order has been successfully placed at Tibba.",
    siteName: "Tibba",
    type: "website",
    url: "https://tibba.ae/order-success",
  },

  twitter: {
    card: "summary",
    title: "Order Confirmed | Tibba",
    description: "Your order has been successfully placed at Tibba.",
  },
};

export default function Page() {
  return <OrderSuccessPage />;
}
