"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "@/i18n/TranslationProvider";
import { useParams } from "next/navigation";

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
  specialInstructions?: string;
  cutlery?: boolean;
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
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (id) fetchOrders(id);
  }, [id]);

  const onUpdateOrder = async (orderId: string, data: UpdateOrderForm) => {
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
    } catch {
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

  const handleStatusChange = (orderId: string, value: string) => {
    const updated = {
      ...editedOrders[orderId],
      OrderStatus: value,
    };

    setEditedOrders((prev) => ({
      ...prev,
      [orderId]: updated,
    }));

    onUpdateOrder(orderId, updated);
  };

  const handleSubmit = (e: any, orderId: string) => {
    e.preventDefault();
    const data = editedOrders[orderId];
    onUpdateOrder(orderId, data);
  };

  return (
    <div className="max-w-[1750px] mx-auto p-6 xl:min-h-[calc(100vh-430px)]">
      <h1 className="text-3xl mb-6 text-center">{t("order.adminOrder")}</h1>

      {orders.length === 0 && (
        <div className="text-center py-12 text-gray-500 text-lg">
          No orders found for the selected location
        </div>
      )}

      {/* ── Desktop table (xl+) ── */}
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
                  <th className="px-4 py-3 border-b">Special Instructions</th>
                  <th className="px-4 py-3 border-b">Cutlery</th>
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
                      {order.paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : order.paymentMethod}
                    </td>

                    <td className="px-4 py-3 text-sm text-center text-[#7a4a2e]">
                      {order.deliveryType}
                    </td>

                    <td className="px-4 py-3 text-sm">
                      <select
                        value={editedOrders[order._id]?.OrderStatus || ""}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="border border-[#d1a054] rounded-md px-2 py-1 text-sm"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[#7a4a2e] text-xs font-medium">
                        {order.specialInstructions || "N/A"}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[#7a4a2e] text-xs font-medium">
                        {order.cutlery ? "Yes" : "No"}
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
                        onSubmit={(e) => handleSubmit(e, order._id)}
                      >
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

      {/* ── Mobile cards (below xl) ── */}
      {orders.length > 0 && (
        <div className="xl:hidden flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-[#d1a054] rounded-xl p-4 shadow-sm bg-white"
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#7a4a2e] bg-[#fdf3e7] px-2 py-1 rounded">
                  {order._id}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#d1a054] text-white text-xs font-medium">
                  {order.status}
                </span>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4 !font-[system-ui]">
                <Row label={t("order.customer")} value={order.fullName} />
                <Row label={t("order.phone")} value={order.phone} />
                <Row
                  label={t("order.address")}
                  value={`${order.address}`}
                  full
                />
                <Row
                  label="Payment Method"
                  value={
                    order.paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : order.paymentMethod
                  }
                />
                <Row label="Delivery Type" value={order.deliveryType} />
                <Row
                  label="Special Instructions"
                  value={order.specialInstructions || "N/A"}
                  full
                />
                <Row label="Cutlery" value={order.cutlery ? "Yes" : "No"} />
                <Row
                  label={t("order.driver")}
                  value={
                    order.driverName
                      ? `${order.driverName}${order.driverPhone ? ` (${order.driverPhone})` : ""}`
                      : "—"
                  }
                />
              </div>

              {/* Update form */}
              <form
                className="border-t border-[#f0d9b5] pt-3 flex flex-col gap-2"
                onSubmit={(e) => handleSubmit(e, order._id)}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7a4a2e] mb-1 !font-[system-ui]">
                  Update Order
                </p>

                {/* Status select */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">
                    {t("order.orderStatus")}
                  </label>
                  <select
                    value={editedOrders[order._id]?.OrderStatus || ""}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border border-[#d1a054] rounded-md px-2 py-1.5 text-sm w-full"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Driver name */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">
                    {t("order.driverName")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("order.driverName")}
                    value={editedOrders[order._id]?.driverName || ""}
                    onChange={(e) =>
                      handleChange(order._id, "driverName", e.target.value)
                    }
                    className="border border-[#d1a054] rounded-md px-2 py-1.5 text-sm w-full"
                  />
                </div>

                {/* Driver phone */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">
                    {t("order.driverPhone")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("order.driverPhone")}
                    value={editedOrders[order._id]?.driverPhone || ""}
                    onChange={(e) =>
                      handleChange(order._id, "driverPhone", e.target.value)
                    }
                    className="border border-[#d1a054] rounded-md px-2 py-1.5 text-sm w-full"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-1 bg-[#d1a054] text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  {t("order.update")}
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* Small helper to keep card rows DRY */
function Row({
  label,
  value,
  full,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <p className="text-xs text-gray-400 !font-[system-ui] font-medium">
        {label}
      </p>
      <p className="text-[#7a4a2e]  break-words !font-[system-ui]">{value}</p>
    </div>
  );
}
