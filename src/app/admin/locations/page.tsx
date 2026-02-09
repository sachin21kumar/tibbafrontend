import type { Metadata } from "next";
import { AddLocation } from "@/app/components/admin/locations/addLocation";

export const metadata: Metadata = {
  title: "Add Location | Tibba Admin",
  description:
    "Add and manage delivery or store locations in the Tibba admin dashboard.",

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Add Location | Tibba Admin",
    description:
      "Add and manage delivery or store locations in the Tibba admin dashboard.",
    siteName: "Tibba",
    type: "website",
    url: "https://tibba.ae/admin/locations",
  },

  twitter: {
    card: "summary",
    title: "Add Location | Tibba Admin",
    description:
      "Add and manage delivery or store locations in the Tibba admin dashboard.",
  },
};

export default function Page() {
  return <AddLocation />;
}
