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
  const isAr = locale === "ar";
  const canonical = `${SITE_URL}/${locale}/cart`;
  const image = `${SITE_URL}/header.webp`;

  const title = isAr ? "سلة التسوق | طيبة" : "Your Cart | Tibba";
  const description = isAr
    ? "راجع العناصر في سلتك وتابع إلى إتمام الطلب على طيبة."
    : "Review items in your cart and proceed to checkout on Tibba.";
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
  return <CartPage />;
}
