import type { Metadata } from "next";
import AdminCategory from "@/app/components/admin/category/category";

export const metadata: Metadata = {
  title: "Categories | Tibba Admin",
  description:
    "View and manage product categories in the Tibba admin dashboard.",

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Categories | Tibba Admin",
    description:
      "View and manage product categories in the Tibba admin dashboard.",
    siteName: "Tibba",
    type: "website",
    url: "https://tibba.ae/admin/category",
  },

  twitter: {
    card: "summary",
    title: "Categories | Tibba Admin",
    description:
      "View and manage product categories in the Tibba admin dashboard.",
  },
};

export default function Page() {
  return <AdminCategory />;
}
