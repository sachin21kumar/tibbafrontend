import type { Metadata } from "next";
import LocationDetails from "@/app/components/locations/locationDetail";

export const metadata: Metadata = {
  title: "Our Location | Tibba Restaurant",
  description:
    "Find Tibba Restaurant locations, addresses, opening hours, and directions. Visit us for authentic Yemeni cuisine.",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Our Location | Tibba Restaurant",
    description:
      "View Tibba Restaurant location details including address, hours, and directions.",
    siteName: "Tibba Restaurant",
    type: "website",
    url: "https://tibba.ae/locations",
  },

  twitter: {
    card: "summary",
    title: "Our Location | Tibba Restaurant",
    description:
      "Find Tibba Restaurant locations, addresses, and opening hours.",
  },
};

export default function Page() {
  return <LocationDetails />;
}
