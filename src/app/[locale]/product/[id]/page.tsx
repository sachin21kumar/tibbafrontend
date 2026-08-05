import type { Metadata } from "next";
import ProductDetail from "@/app/components/products/getProductDetail";

async function getProduct(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const json = await res.json();
  return json?.data ?? [];
}

export const metadata: Metadata = {
  title: "Product Details | Tibba Restaurant",
  description:
    "View product details, pricing, and availability at Tibba Restaurant. Order authentic Yemeni food online.",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Product Details | Tibba Restaurant",
    description:
      "Explore product details and order authentic Yemeni food from Tibba Restaurant.",
    siteName: "Tibba Restaurant",
    type: "website",
    url: "https://tibba.ae/products",
  },

  twitter: {
    card: "summary_large_image",
    title: "Product Details | Tibba Restaurant",
    description:
      "Explore product details and order authentic Yemeni food from Tibba Restaurant.",
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;

  const [product, categories] = await Promise.all([
    getProduct(id),
    getCategories(),
  ]);

  const categoryName =
    categories.find((cat: any) => cat._id === product?.categoryId)?.title ||
    "";

  const productImage = product?.imagePath
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${product.imagePath}`
    : "https://f.nooncdn.com/s/app/com/noon-food/consumer/icons/placeholder.png";

  const schema = product && {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || undefined,
    image: [productImage],
    sku: product._id,
    category: categoryName || undefined,
    brand: {
      "@type": "Brand",
      name: "Tibba Restaurant",
    },
    offers: {
      "@type": "Offer",
      url: `https://tibba.ae/${locale}/product/${product._id}`,
      priceCurrency: "AED",
      price: product.price,
      availability:
        product.isActive === false || product.stock === 0
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <ProductDetail />
    </>
  );
}
