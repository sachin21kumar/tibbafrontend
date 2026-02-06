import type { Metadata } from "next";
import { Gallery } from "../components/gallery/Gallery";

export const metadata: Metadata = {
  title: "Gallery | Tibba Restaurant",
  description:
    "Explore the Tibba Restaurant gallery featuring authentic Yemeni dishes, traditional ambiance, and memorable dining moments.",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Gallery | Tibba Restaurant",
    description:
      "Explore the Tibba Restaurant gallery showcasing authentic Yemeni cuisine and a warm dining atmosphere.",
    siteName: "Tibba Restaurant",
    type: "website",
    url: "https://tibba.ae/gallery",
  },

  twitter: {
    card: "summary_large_image",
    title: "Gallery | Tibba Restaurant",
    description:
      "Explore the Tibba Restaurant gallery showcasing authentic Yemeni cuisine and dining experience.",
  },
};

export default function Page() {
  return <Gallery />;
}
