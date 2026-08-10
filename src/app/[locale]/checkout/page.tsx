import type { Metadata } from "next";
import { CheckoutPage } from "../../components/checkout/checkout";
import { SITE_URL } from "@/lib/seoRoutes";
import { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const canonical = `${SITE_URL}/${locale}/checkout`;
  const image = `${SITE_URL}/header.webp`;

  const title = isAr ? "إتمام الطلب | طيبة" : "Checkout | Tibba";
  const description = isAr
    ? "أكمل عملية الشراء بأمان على طيبة."
    : "Securely complete your purchase on Tibba.";
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
  return <CheckoutPage />;
}
