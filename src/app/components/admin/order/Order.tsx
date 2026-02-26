"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetLocationsQuery } from "../../redux/query/locationsQuery/location.query";
import { useTranslations } from "@/i18n/TranslationProvider";

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
};

type UpdateOrderForm = {
  OrderStatus: string;
  driverName?: string;
  driverPhone?: string;
};

export default function AdminOrdersPage() {
  const { t } = useTranslations();
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
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const { data: locations } = useGetLocationsQuery();

  const fetchOrders = async (locationId?: string) => {
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/admin/orders`;
    if (locationId) url += `/${locationId}`;
    try {
      const res = await fetch(url);
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
    fetchOrders(selectedLocation);
  }, [selectedLocation]);

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
    <div className="max-w-[1200px] mx-auto p-6 xl:min-h-[calc(100vh-430px)]">
      <h1 className="text-3xl mb-6 text-center">{t("order.adminOrder")}</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-auto text-[#7a4a2e] focus:outline-none focus:ring-2 focus:ring-[#d1a054] text-ellipsis xl:text-[16px] text-[10px] overflow-hidden whitespace-nowrap"
        >
          <option value="">{t("order.all_locations")}</option>
          {locations?.map((loc: any) => (
            <option key={loc._id} value={loc._id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

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
                <th className="px-4 py-3 border-b">{t("order.orderStatus")}</th>
                <th className="px-4 py-3 border-b">{t("order.driver")}</th>
                <th className="px-4 py-3 border-b text-center">
                  {t("order.action")}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eaeaea]">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-mono text-[#7a4a2e]">
                    {order._id}
                  </td>

                  <td className="px-4 py-3 text-sm font-medium text-[#7a4a2e]">
                    {order.fullName}
                  </td>

                  <td className="px-4 py-3 text-sm text-[#7a4a2e] leading-snug">
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
                          handleChange(order._id, "OrderStatus", e.target.value)
                        }
                        className="border border-[#d1a054] rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#d1a054]"
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
                          handleChange(order._id, "driverName", e.target.value)
                        }
                        className="border border-[#d1a054] rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#d1a054]"
                      />

                      <input
                        type="text"
                        placeholder={t("order.driverPhone")}
                        value={editedOrders[order._id]?.driverPhone || ""}
                        onChange={(e) =>
                          handleChange(order._id, "driverPhone", e.target.value)
                        }
                        className="border border-[#d1a054] rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#d1a054]"
                      />

                      <button
                        type="submit"
                        className="mt-1 bg-[#d1a054] hover:opacity-90 transition text-white px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide cursor-pointer"
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

      <div className="xl:hidden flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 shadow-sm flex flex-col gap-2"
          >
            <div className="flex justify-between text-sm font-semibold">
              <span>Order ID:</span>
              <span>{order._id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Customer:</span>
              <span>
                {order.firstName} {order.lastName}
              </span>
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

            <form
              className="flex flex-col gap-2 mt-2"
              onSubmit={(e) => {
                e.preventDefault();
                onUpdateOrder(order._id);
              }}
            >
              <select
                value={editedOrders[order._id]?.OrderStatus || ""}
                onChange={(e) =>
                  handleChange(order._id, "OrderStatus", e.target.value)
                }
                className="border px-2 py-1 rounded text-sm"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Driver Name"
                value={editedOrders[order._id]?.driverName || ""}
                onChange={(e) =>
                  handleChange(order._id, "driverName", e.target.value)
                }
                className="border px-2 py-1 rounded text-sm"
              />
              <input
                type="text"
                placeholder="Driver Phone"
                value={editedOrders[order._id]?.driverPhone || ""}
                onChange={(e) =>
                  handleChange(order._id, "driverPhone", e.target.value)
                }
                className="border px-2 py-1 rounded text-sm"
              />
              <button
                type="submit"
                className="bg-[#d1a054] text-white px-2 py-1 rounded text-sm cursor-pointer"
              >
                Update
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
