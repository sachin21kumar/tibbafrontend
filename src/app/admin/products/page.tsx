import type { Metadata } from "next";
import ProductList from "@/app/components/admin/product";

export const metadata: Metadata = {
  title: "Products | Tibba Admin",
  description: "View, manage, and update products in the Tibba admin dashboard.",

  robots: {
    index: false, 
    follow: false,
  },

  openGraph: {
    title: "Products | Tibba Admin",
    description: "View, manage, and update products in the Tibba admin dashboard.",
    siteName: "Tibba",
    type: "website",
    url: "https://tibba.ae/admin/products",
  },

  twitter: {
    card: "summary",
    title: "Products | Tibba Admin",
    description: "View, manage, and update products in the Tibba admin dashboard.",
  },
};

export default function Page() {
  return <ProductList />;
}
