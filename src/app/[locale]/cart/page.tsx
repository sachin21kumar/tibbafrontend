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
  const image = `${SITE_URL}/header.webp`;

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
      images: [image],
    },

    twitter: {
      card: "summary",
      title: "Your Cart | Tibba",
      description:
        "Review items in your cart and proceed to checkout on Tibba.",
      images: [image],
    },
  };
}

export default function Page() {
  return <CartPage />;
}
