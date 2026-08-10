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
  const isAr = locale === "ar";
  const canonical = `${SITE_URL}/${locale}/order-success`;
  const image = `${SITE_URL}/header.webp`;

  const title = isAr ? "تم تأكيد الطلب | طيبة" : "Order Confirmed | Tibba";
  const description = isAr
    ? "تم تقديم طلبك بنجاح لدى طيبة. شكرًا لطلبك معنا."
    : "Your order has been successfully placed at Tibba. Thank you for ordering with us.";
  const shortDescription = isAr
    ? "تم تقديم طلبك بنجاح لدى طيبة."
    : "Your order has been successfully placed at Tibba.";
  const siteName = isAr ? "طيبة" : "Tibba";

  return {
    title,
    description,

    robots: {
      index: false, // NEVER index order confirmation pages
      follow: false,
    },

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description: shortDescription,
      siteName,
      type: "website",
      url: canonical,
      images: [image],
    },

    twitter: {
      card: "summary",
      title,
      description: shortDescription,
      images: [image],
    },
  };
}

export default function Page() {
  return <OrderSuccessPage />;
}
