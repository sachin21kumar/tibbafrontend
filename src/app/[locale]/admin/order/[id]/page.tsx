import AdminOrdersPageDetail from "@/app/components/admin/order/OrderDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details | Tibba Admin",
  description: "View and manage order details in Tibba admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminOrdersPageDetailPage() {
  return <AdminOrdersPageDetail />;
}