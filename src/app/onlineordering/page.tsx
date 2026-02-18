import type { Metadata } from "next";
import MenuPage from "../components/products/getAllProducts";

export const metadata: Metadata = {
  title: "Shop | Tibba Restaurant",
  description:
    "Browse the Tibba Restaurant menu featuring authentic Yemeni dishes, fresh meals, and traditional flavors. Online ordering coming soon.",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Shop | Tibba Restaurant",
    description:
      "Explore the Tibba Restaurant menu with authentic Yemeni cuisine. Online ordering coming soon.",
    siteName: "Tibba Restaurant",
    type: "website",
    url: "https://tibba.ae/onlineordering",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shop | Tibba Restaurant",
    description:
      "Explore the Tibba Restaurant menu with authentic Yemeni cuisine. Online ordering coming soon.",
  },
};

export default function Page() {
  return (
    // <div className="h-[54vh] flex justify-center items-center">
    //   <p className="!font-[system-ui] text-xl">Coming Soon</p>
       <MenuPage /> 
    // </div>
  );
}
