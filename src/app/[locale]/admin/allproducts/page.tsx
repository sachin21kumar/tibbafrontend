import ProductList from "@/app/components/admin/product";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product List | Tibba Admin",
  description: "Manage products in Tibba admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProductListPage() {
  return <ProductList />;
}