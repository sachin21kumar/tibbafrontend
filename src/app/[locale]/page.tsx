import { Metadata } from "next";
import Hero from "../components/home/home";

export const metadata: Metadata = {
  title: "Home - Tibba Restaurant",
  description:
    "Tibba Restaurant Welcome to Tibba Restaurant, where authentic Yemeni flavors thrive. Enjoy a memorable dining experience and explore our menu. Our Menu Free Delivery on Order Over $59",
};

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://tibba.ae/#organization",
        name: "Tibba Restaurant",
        url: "https://tibba.ae/",
        logo: "https://tibba.ae/_next/static/media/tibba-logo.697a23ca.webp",
        image:
          "https://tibba.ae/api/uploads/products/1785904435772-912862395.webp",
        telephone: ["+971 4 2578585", "+971 4 2578584"],
      },
      {
        "@type": "Restaurant",
        "@id": "https://tibba.ae/#restaurant",
        name: "Tibba Restaurant",
        url: "https://tibba.ae/",
        image:
          "https://tibba.ae/api/uploads/products/1785904435772-912862395.webp",
        telephone: ["+971 4 2578585", "+971 4 2578584"],
        priceRange: "د.إ",
        servesCuisine: ["Indian", "North Indian", "Street Food", "Fast Food"],
        menu: "https://tibba.ae/en/menu",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "11:00",
            closes: "00:00",
          },
        ],
        parentOrganization: {
          "@id": "https://tibba.ae/#organization",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://tibba.ae/#website",
        url: "https://tibba.ae/",
        name: "Tibba Restaurant",
        publisher: {
          "@id": "https://tibba.ae/#organization",
        },
        inLanguage: "en",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Hero />
    </>
  );
}
