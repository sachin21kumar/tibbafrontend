import type { Metadata } from "next";
import OpenTable from "../../components/openTable/openTable";

export const metadata: Metadata = {
  title: "Reservations | Tibba Restaurant",
  description:
    "Book a table at Tibba Restaurant and enjoy authentic Yemeni cuisine. Reserve your table online quickly and easily.",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Reservations | Tibba Restaurant",
    description:
      "Reserve a table at Tibba Restaurant and enjoy authentic Yemeni flavors.",
    siteName: "Tibba Restaurant",
    type: "website",
    url: "https://tibba.ae/opentable",
  },

  twitter: {
    card: "summary_large_image",
    title: "Reservations | Tibba Restaurant",
    description:
      "Book your table at Tibba Restaurant and enjoy authentic Yemeni cuisine.",
  },
};

export default function Page() {
  return <OpenTable />;
}
