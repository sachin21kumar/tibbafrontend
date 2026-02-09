import type { Metadata } from "next";
import UpdateProduct from "@/app/components/admin/updateProduct";

export const metadata: Metadata = {
  title: "Update Product | Tibba Admin",
  description: "Edit and update product details in the Tibba admin dashboard.",

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Update Product | Tibba Admin",
    description: "Edit and update product details in the Tibba admin dashboard.",
    siteName: "Tibba",
    type: "website",
    url: "https://tibba.ae/admin/products/update",
  },

  twitter: {
    card: "summary",
    title: "Update Product | Tibba Admin",
    description: "Edit and update product details in the Tibba admin dashboard.",
  },
};

export default function Page() {
  return <UpdateProduct />;
}
