import SelectLocationPage from "@/app/components/selectLocations/SelectLocations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Select Location | Tibba",
  description:
    "Choose your delivery or pickup location to continue ordering from Tibba.",

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Select Location | Tibba",
    description:
      "Choose your delivery or pickup location to continue ordering from Tibba.",
    siteName: "Tibba",
    type: "website",
    url: "https://tibba.ae/selectLocation",
  },

  twitter: {
    card: "summary",
    title: "Select Location | Tibba",
    description:
      "Choose your delivery or pickup location to continue ordering from Tibba.",
  },
};

export default function Page() {
  return <SelectLocationPage />;
}
