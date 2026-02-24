import type { Metadata } from "next";
import { Contact } from "../../components/contact/contact";

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // -------- ORGANIZATION --------
      {
        "@type": "Organization",
        "@id": "https://tibba.ae/#organization",
        name: "Tibba Restaurant",
        url: "https://tibba.ae",
        logo: "https://tibba.ae/tibba-logo.webp",
        sameAs: [
          "https://www.instagram.com/tibba.ae",
          "https://www.facebook.com/tibba.ae",
        ],
      },

      // -------- MAIN BRANCH (RESTAURANT) --------
      {
        "@type": "Restaurant",
        "@id": "https://tibba.ae/contact#restaurant",
        name: "Tibba Restaurant - Al Qusais Main Branch",
        image: "https://tibba.ae/header.webp",
        url: "https://tibba.ae/contact",
        telephone: "+97142578585",

        servesCuisine: "Yemeni Cuisine",
        priceRange: "$$",

        address: {
          "@type": "PostalAddress",
          streetAddress: "Al Qusais",
          addressLocality: "Dubai",
          addressCountry: "AE",
        },

        geo: {
          "@type": "GeoCoordinates",
          latitude: 25.266,
          longitude: 55.374,
        },

        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "11:00",
            closes: "24:00",
          },
        ],

        parentOrganization: {
          "@id": "https://tibba.ae/#organization",
        },
      },

      // -------- CONTACT SUPPORT --------
      {
        "@type": "ContactPoint",
        "@id": "https://tibba.ae/contact#support",
        telephone: "+97142578585",
        contactType: "customer service",
        areaServed: "AE",
        availableLanguage: ["English", "Arabic"],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <Contact />
    </>
  );
}
