import type { Metadata } from "next";
import { AddProduct } from "@/app/components/admin/addproduct";

export const metadata: Metadata = {
  title: "Add Product | Tibba Admin",
  description: "Create and manage products in the Tibba admin dashboard.",

  robots: {
    index: false, // do NOT index admin pages
    follow: false,
  },

  openGraph: {
    title: "Add Product | Tibba Admin",
    description: "Create and manage products in the Tibba admin dashboard.",
    siteName: "Tibba",
    type: "website",
    url: "https://tibba.ae/admin/addproduct",
  },

  twitter: {
    card: "summary",
    title: "Add Product | Tibba Admin",
    description: "Create and manage products in the Tibba admin dashboard.",
  },
};

export default function Page() {
  return <AddProduct />;
}
