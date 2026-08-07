import type { Metadata } from "next";
import OpenTable from "../../components/openTable/openTable";
import { SITE_URL } from "@/lib/seoRoutes";
import { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${SITE_URL}/${locale}/opentable`;

  return {
    title: "Reservations | Tibba Restaurant",
    description:
      "Book a table at Tibba Restaurant and enjoy authentic Yemeni cuisine. Reserve your table online quickly and easily.",

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical,
    },

    openGraph: {
      title: "Reservations | Tibba Restaurant",
      description:
        "Reserve a table at Tibba Restaurant and enjoy authentic Yemeni flavors.",
      siteName: "Tibba Restaurant",
      type: "website",
      url: canonical,
    },

    twitter: {
      card: "summary_large_image",
      title: "Reservations | Tibba Restaurant",
      description:
        "Book your table at Tibba Restaurant and enjoy authentic Yemeni cuisine.",
    },
  };
}

export default function Page() {
  return <OpenTable />;
}
