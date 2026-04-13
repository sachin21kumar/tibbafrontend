import { AddCategory } from "@/app/components/admin/addCategory";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Add Category | Tibba Admin",
  description: "Add and manage product categories in Tibba admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};
export default function index() {
  return <AddCategory />;
}
