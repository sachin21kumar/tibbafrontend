"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "@/i18n/TranslationProvider";
import { useParams, useSearchParams } from "next/navigation";

type Order = {
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
  email: string;
  status: string;
  driverName?: string;
  driverPhone?: string;
  deliveryType: string;
  locationId: string;
  createdAt: string;
  OrderStatus: string;
  fullName: string;
  paymentMethod: string;
};

type UpdateOrderForm = {
  OrderStatus: string;
  driverName?: string;
  driverPhone?: string;
};

export default function AdminOrdersPageDetail() {
  const { t } = useTranslations();
  const { id }: any = useParams();
  const statusOptions = [
    "New",
    "Accepted",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  const [orders, setOrders] = useState<Order[]>([]);
  const [editedOrders, setEditedOrders] = useState<
    Record<string, UpdateOrderForm>
  >({});

  const fetchOrders = async (locationId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/admin/orders/${locationId}`,
      );

      const data = await res.json();

      if (res.ok) {
        setOrders(data);

        const initEdited: Record<string, UpdateOrderForm> = {};

        data.forEach((o: Order) => {
          initEdited[o._id] = {
            OrderStatus: o.OrderStatus,
            driverName: o.driverName || "",
            driverPhone: o.driverPhone || "",
          };
        });

        setEditedOrders(initEdited);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrders(id);
    }
  }, [id]);

  const onUpdateOrder = async (orderId: string) => {
    const data = editedOrders[orderId];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/admin/${orderId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      const result = await res.json();

      if (res.ok) {
        toast.success("Order updated");

        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, ...data } : o)),
        );
      } else {
        toast.error(result.message || "Failed to update order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleChange = (
    orderId: string,
    field: keyof UpdateOrderForm,
    value: string,
  ) => {
    setEditedOrders((prev) => ({
      ...prev,
      [orderId]: { ...prev[orderId], [field]: value },
    }));
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6 xl:min-h-[calc(100vh-430px)]">
      <h1 className="text-3xl mb-6 text-center">{t("order.adminOrder")}</h1>

      {orders.length === 0 && (
        <div className="text-center py-12 text-gray-500 text-lg">
          No orders found for the selected location
        </div>
      )}
      {orders.length > 0 && (
        <div className="hidden xl:block">
          <div className="overflow-x-auto rounded-xl border border-[#d1a054] shadow-sm">
            <table className="w-full border-collapse text-left">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr className="text-xs font-semibold uppercase tracking-wider text-[#7a4a2e]">
                  <th className="px-4 py-3 border-b">{t("order.orderId")}</th>
                  <th className="px-4 py-3 border-b">{t("order.customer")}</th>
                  <th className="px-4 py-3 border-b">{t("order.address")}</th>
                  <th className="px-4 py-3 border-b">{t("order.phone")}</th>
                  <th className="px-4 py-3 border-b">
                    {t("order.paymentStatus")}
                  </th>
                  <th className="px-4 py-3 border-b text-center">
                    Payment Method
                  </th>
                  <th className="px-4 py-3 border-b text-center">
                    Delivery Type
                  </th>
                  <th className="px-4 py-3 border-b">
                    {t("order.orderStatus")}
                  </th>
                  <th className="px-4 py-3 border-b">{t("order.driver")}</th>
                  <th className="px-4 py-3 border-b text-center">
                    {t("order.action")}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#eaeaea]">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-mono text-[#7a4a2e]">
                      {order._id}
                    </td>

                    <td className="px-4 py-3 text-sm font-medium text-[#7a4a2e]">
                      {order.fullName}
                    </td>

                    <td className="px-4 py-3 text-sm text-[#7a4a2e]">
                      {order.address}
                    </td>

                    <td className="px-4 py-3 text-sm text-[#7a4a2e]">
                      {order.phone}
                    </td>

                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#d1a054] text-[#7a4a2e] text-xs font-medium">
                        {order.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-sm text-center text-[#7a4a2e]">
                      {order.paymentMethod == "cod"
                        ? "Cash on Delivery"
                        : order.paymentMethod}
                    </td>

                    <td className="px-4 py-3 text-sm text-center text-[#7a4a2e]">
                      {order.deliveryType}
                    </td>

                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                        {order.OrderStatus}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-700">
                      {order.driverName}
                      {order.driverPhone && (
                        <span className="block text-xs text-gray-500">
                          {order.driverPhone}
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <form
                        className="flex flex-col gap-2"
                        onSubmit={(e) => {
                          e.preventDefault();
                          onUpdateOrder(order._id);
                        }}
                      >
                        <select
                          value={editedOrders[order._id]?.OrderStatus || ""}
                          onChange={(e) =>
                            handleChange(
                              order._id,
                              "OrderStatus",
                              e.target.value,
                            )
                          }
                          className="border border-[#d1a054] rounded-md px-2 py-1 text-sm"
                        >
                          {statusOptions.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>

                        <input
                          type="text"
                          placeholder={t("order.driverName")}
                          value={editedOrders[order._id]?.driverName || ""}
                          onChange={(e) =>
                            handleChange(
                              order._id,
                              "driverName",
                              e.target.value,
                            )
                          }
                          className="border border-[#d1a054] rounded-md px-2 py-1 text-sm"
                        />

                        <input
                          type="text"
                          placeholder={t("order.driverPhone")}
                          value={editedOrders[order._id]?.driverPhone || ""}
                          onChange={(e) =>
                            handleChange(
                              order._id,
                              "driverPhone",
                              e.target.value,
                            )
                          }
                          className="border border-[#d1a054] rounded-md px-2 py-1 text-sm"
                        />

                        <button
                          type="submit"
                          className="mt-1 bg-[#d1a054] text-white px-3 py-1.5 rounded-md text-xs cursor-pointer"
                        >
                          {t("order.update")}
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {orders.length > 0 && (
        <div className="xl:hidden flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between text-sm font-semibold">
                <span>Order ID:</span>
                <span>{order._id}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Customer:</span>
                <span>{order.fullName}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Address:</span>
                <span>
                  {order.address}, {order.city}, {order.state}, {order.pinCode}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Phone:</span>
                <span>{order.phone}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Payment Status:</span>
                <span>{order.status}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Order Status:</span>
                <span>{order.OrderStatus}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Driver:</span>
                <span>
                  {order.driverName}{" "}
                  {order.driverPhone && `(${order.driverPhone})`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
