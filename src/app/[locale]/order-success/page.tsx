import type { Metadata } from "next";
import OrderSuccessPage from "../../components/order/order-confirm";
import { SITE_URL } from "@/lib/seoRoutes";
import { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${SITE_URL}/${locale}/order-success`;
  const image = `${SITE_URL}/header.webp`;

  return {
    title: "Order Confirmed | Tibba",
    description:
      "Your order has been successfully placed at Tibba. Thank you for ordering with us.",

    robots: {
      index: false, // NEVER index order confirmation pages
      follow: false,
    },

    alternates: {
      canonical,
    },

    openGraph: {
      title: "Order Confirmed | Tibba",
      description: "Your order has been successfully placed at Tibba.",
      siteName: "Tibba",
      type: "website",
      url: canonical,
      images: [image],
    },

    twitter: {
      card: "summary",
      title: "Order Confirmed | Tibba",
      description: "Your order has been successfully placed at Tibba.",
      images: [image],
    },
  };
}

export default function Page() {
  return <OrderSuccessPage />;
}
