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
  const isAr = locale === "ar";
  const canonical = `${SITE_URL}/${locale}/selectLocation`;
  const image = `${SITE_URL}/header.webp`;

  const title = isAr ? "اختر الموقع | طيبة" : "Select Location | Tibba";
  const description = isAr
    ? "اختر موقع التوصيل أو الاستلام لمتابعة الطلب من طيبة."
    : "Choose your delivery or pickup location to continue ordering from Tibba.";
  const siteName = isAr ? "طيبة" : "Tibba";

  return {
    title,
    description,

    robots: {
      index: false,
      follow: false,
    },

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description,
      siteName,
      type: "website",
      url: canonical,
      images: [image],
    },

    twitter: {
      card: "summary",
      title,
      description,
      images: [image],
    },
  };
}

export default function Page() {
  return <SelectLocationPage />;
}
