import type { Metadata } from "next";
import { CheckoutPage } from "../components/checkout/checkout";

export const metadata: Metadata = {
  title: "Checkout | Tibba",
  description: "Securely complete your purchase on Tibba.",

  robots: {
    index: false, // checkout pages must not be indexed
    follow: false,
  },

  openGraph: {
    title: "Checkout | Tibba",
    description: "Securely complete your purchase on Tibba.",
    siteName: "Tibba",
    type: "website",
    url: "https://tibba.ae/checkout",
  },

  twitter: {
    card: "summary",
    title: "Checkout | Tibba",
    description: "Securely complete your purchase on Tibba.",
  },
};

export default function Page() {
  return <CheckoutPage />;
}
