import type { Metadata } from "next";
import CartPage from "../../components/cart/cart";

export const metadata: Metadata = {
  title: "Your Cart | Tibba",
  description: "Review items in your cart and proceed to checkout on Tibba.",

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Your Cart | Tibba",
    description: "Review items in your cart and proceed to checkout on Tibba.",
    siteName: "Tibba",
    type: "website",
    url: "https://tibba.ae/cart",
  },

  twitter: {
    card: "summary",
    title: "Your Cart | Tibba",
    description: "Review items in your cart and proceed to checkout on Tibba.",
  },
};

export default function Page() {
  return <CartPage />;
}
