import type { Metadata } from "next";
import SelectLocationPage from "../components/selectLocations/SelectLocations";

export const metadata: Metadata = {
  title: "Select Location | Tibba",
  description:
    "Choose your delivery or pickup location to continue ordering from Tibba.",

  robots: {
    index: false,   // user-flow page → do NOT index
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
