import type { Metadata } from "next";
import ProductDetail from "@/app/components/products/getProductDetail";

export const metadata: Metadata = {
  title: "Product Details | Tibba Restaurant",
  description:
    "View product details, pricing, and availability at Tibba Restaurant. Order authentic Yemeni food online.",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Product Details | Tibba Restaurant",
    description:
      "Explore product details and order authentic Yemeni food from Tibba Restaurant.",
    siteName: "Tibba Restaurant",
    type: "website",
    url: "https://tibba.ae/products",
  },

  twitter: {
    card: "summary_large_image",
    title: "Product Details | Tibba Restaurant",
    description:
      "Explore product details and order authentic Yemeni food from Tibba Restaurant.",
  },
};

export default function Page() {
  return <ProductDetail />;
}
