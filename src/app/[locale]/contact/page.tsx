import type { Metadata } from "next";
import { Contact } from "../../components/contact/contact";
import { SITE_URL } from "@/lib/seoRoutes";
import { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Contact Tibba Restaurant",
    description:
      "Contact Tibba Restaurant for restaurant enquiries, opening hours, directions and branch information across Dubai.",
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
    },
  };
}

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://tibba.ae/en/contact#contact",
    url: "https://tibba.ae/en/contact",
    name: "Contact Tibba Restaurant",
    description:
      "Contact Tibba Restaurant for restaurant enquiries, opening hours, directions and branch information across Dubai.",
    mainEntity: {
      "@type": "Organization",
      "@id": "https://tibba.ae/#organization",
      name: "Tibba Restaurant",
      url: "https://tibba.ae/",
      telephone: ["+97142578585", "+97142578584"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Al Qusais, Dubai, UAE Main Branch",
        addressLocality: "Dubai",
        addressRegion: "Dubai",
        addressCountry: "AE",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+97142578585",
        contactType: "Customer Service",
        areaServed: "AE",
        availableLanguage: ["English", "Arabic"],
      },
    },
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
