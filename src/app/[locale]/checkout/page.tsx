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
  const canonical = `${SITE_URL}/${locale}/checkout`;
  const image = `${SITE_URL}/header.webp`;

  return {
    title: "Checkout | Tibba",
    description: "Securely complete your purchase on Tibba.",

    robots: {
      index: false,
      follow: false,
    },

    alternates: {
      canonical,
    },

    openGraph: {
      title: "Checkout | Tibba",
      description: "Securely complete your purchase on Tibba.",
      siteName: "Tibba",
      type: "website",
      url: canonical,
      images: [image],
    },

    twitter: {
      card: "summary",
      title: "Checkout | Tibba",
      description: "Securely complete your purchase on Tibba.",
      images: [image],
    },
  };
}

export default function Page() {
  return <CheckoutPage />;
}
