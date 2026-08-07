import SelectLocationPage from "@/app/components/selectLocations/SelectLocations";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seoRoutes";
import { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${SITE_URL}/${locale}/selectLocation`;

  return {
    title: "Select Location | Tibba",
    description:
      "Choose your delivery or pickup location to continue ordering from Tibba.",

    robots: {
      index: false,
      follow: false,
    },

    alternates: {
      canonical,
    },

    openGraph: {
      title: "Select Location | Tibba",
      description:
        "Choose your delivery or pickup location to continue ordering from Tibba.",
      siteName: "Tibba",
      type: "website",
      url: canonical,
    },

    twitter: {
      card: "summary",
      title: "Select Location | Tibba",
      description:
        "Choose your delivery or pickup location to continue ordering from Tibba.",
    },
  };
}

export default function Page() {
  return <SelectLocationPage />;
}
