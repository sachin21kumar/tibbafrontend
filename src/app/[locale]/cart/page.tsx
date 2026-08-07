import type { Metadata } from "next";
import CartPage from "../../components/cart/cart";
import { SITE_URL } from "@/lib/seoRoutes";
import { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${SITE_URL}/${locale}/cart`;

  return {
    title: "Your Cart | Tibba",
    description: "Review items in your cart and proceed to checkout on Tibba.",

    robots: {
      index: false,
      follow: false,
    },

    alternates: {
      canonical,
    },

    openGraph: {
      title: "Your Cart | Tibba",
      description:
        "Review items in your cart and proceed to checkout on Tibba.",
      siteName: "Tibba",
      type: "website",
      url: canonical,
    },

    twitter: {
      card: "summary",
      title: "Your Cart | Tibba",
      description:
        "Review items in your cart and proceed to checkout on Tibba.",
    },
  };
}

export default function Page() {
  return <CartPage />;
}
