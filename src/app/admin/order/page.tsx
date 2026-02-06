import type { Metadata } from "next";
import AdminOrdersPage from "@/app/components/admin/order/Order";

export const metadata: Metadata = {
  title: "Orders | Tibba Admin",
  description: "View and manage customer orders in the Tibba admin dashboard.",

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Orders | Tibba Admin",
    description:
      "View and manage customer orders in the Tibba admin dashboard.",
    siteName: "Tibba",
    type: "website",
    url: "https://tibba.ae/admin/orders",
  },

  twitter: {
    card: "summary",
    title: "Orders | Tibba Admin",
    description:
      "View and manage customer orders in the Tibba admin dashboard.",
  },
};

export default function Page() {
  return (
    <div className="h-[54vh] flex justify-center items-center">
      <p className="!font-[system-ui] text-xl">Coming Soon</p>
      {/* <AdminOrdersPage /> */}
    </div>
  );
}
