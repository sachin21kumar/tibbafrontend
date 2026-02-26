"use client";

import { useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "../redux/query/cartQuery/cart.query";
import Cookies from "js-cookie";
import { useTranslations } from "@/i18n/TranslationProvider";

export default function CartPage() {
  const router = useRouter();
  const { locale, t } = useTranslations();

  const locationId = Cookies.get("selectedLocationId");

  const {
    data: cart,
    isLoading,
    isError,
  }: any = useGetCartQuery(locationId!, {
    skip: !locationId,
  });

  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();
  const [removeFromCart, { isLoading: isRemoving }] =
    useRemoveFromCartMutation();

  const handleIncrease = useCallback(
    (productId: string, currentQty: number) => {
      if (!locationId || isUpdating) return;

      updateCart({
        productId,
        quantity: currentQty + 1,
        locationId,
      });
    },
    [updateCart, isUpdating, locationId],
  );

  const handleDecrease = useCallback(
    (productId: string, currentQty: number) => {
      if (!locationId || isUpdating) return;

      if (currentQty > 1) {
        updateCart({
          productId,
          quantity: currentQty - 1,
          locationId,
        });
      }
    },
    [updateCart, isUpdating, locationId],
  );

  const handleRemove = useCallback(
    (productId: string) => {
      if (!locationId || isRemoving) return;

      removeFromCart({
        productId,
        locationId,
      });
    },
    [removeFromCart, isRemoving, locationId],
  );
  const subtotal = useMemo(() => {
    return cart?.items?.reduce(
      (acc, item) => acc + item.quantity * item.productId.price,
      0,
    );
  }, [cart?.items]);

  if (isLoading) {
    return <p className="text-center my-12">{t("checkout.loadingCart")}</p>;
  }

  if (isError || !cart || cart.items.length === 0) {
    return <p className="text-center my-12">{t("checkout.emptyCart")}</p>;
  }

  const total = subtotal;

  return (
    <>
      <h1 className="text-[40px] flex justify-center py-[2rem] bg-[#fbfbfb] border-[#d1a054] text-[#d1a054] border mb-6 text-center lg:text-left">
        {t("cart.cart")}
      </h1>

      <div className="max-w-[1288px] mx-auto md:my-[90px] px-4 grid grid-cols-1 lg:grid-cols-[1fr_430px] gap-6">
        <div className="py-[24px] overflow-x-auto">
          <table className="w-full min-w-[600px] border-separate border-spacing-y-4">
            <thead className="border-collapse">
              <tr className="text-sm text-[#7a4a2e] uppercase bg-[linear-gradient(to_left,#fafafa_0px,#fafafa_70px,transparent_870px)]">
                <th className="pl-4 text-left">{t("cart.product")}</th>
                <th className="px-8 py-4 text-left">{t("cart.price")}</th>
                <th className="px-8 py-4 text-left">{t("cart.quantity")}</th>
                <th className="px-8 py-4 text-left">{t("cart.subtotal")}</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cart.items.map((item) => (
                <tr
                  key={item.productId._id}
                  className="rounded-xl border-r-0 transition-all
             bg-[linear-gradient(to_left,#fafafa_0px,#fafafa_70px,transparent_870px)]"
                >
                  <td
                    className="flex items-center gap-4 text-[#7a4a2e] p-4 cursor-pointer min-w-[150px]"
                    onClick={() =>
                      router.push(`/${locale}/product/${item?.productId?._id}`)
                    }
                  >
                    <img
                      src={
                        item.productId.imagePath
                          ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${item.productId.imagePath}`
                          : "https://f.nooncdn.com/s/app/com/noon-food/consumer/icons/placeholder.png"
                      }
                      alt={item.productId.name}
                      className="w-[42px] h-[42px]
           [border-radius:30%_70%_63%_37%_/55%_50%_50%_45%]
           shadow-[4px_0_15px_rgba(0,0,0,0.25)]"
                    />
                    <span className="text-[#7a4a2e] hover:underline cursor-pointer break-words">
                      {item.productId.name}
                    </span>
                  </td>

                  <td className="text-[#7a4a2e] px-4 sm:px-8 py-4 whitespace-nowrap">
                    د.إ {item.productId.price.toFixed(2)}
                  </td>

                  <td className="px-4 sm:px-8 py-4">
                    <div className="flex items-center rounded-full text-[#7a4a2e] overflow-hidden w-24 sm:w-auto">
                      <button
                        disabled={isUpdating}
                        onClick={() =>
                          handleDecrease(item.productId._id, item.quantity)
                        }
                        className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                      >
                        −
                      </button>

                      <button
                        className="px-4 font-medium w-[44px] h-[44px] border flex items-center justify-center 
             [border-radius:63%_37%_30%_70%_/50%_45%_55%_50%] [border-color:#d1a054] "
                      >
                        {item.quantity}
                      </button>

                      <button
                        disabled={isUpdating}
                        onClick={() =>
                          handleIncrease(item.productId._id, item.quantity)
                        }
                        className="px-3 py-1 hover:bg-gray-100 text-[#7a4a2e] disabled:opacity-50 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="text-[#7a4a2e] whitespace-nowrap px-4 sm:px-8 py-4">
                    د.إ {(item.productId.price * item.quantity).toFixed(2)}
                    <button
                      disabled={isRemoving}
                      onClick={() => handleRemove(item.productId._id)}
                      className="ml-2 inline-block align-middle ml-4 text-[#7a4a2e] bg-white w-[30px] h-[30px] border border-white text-xl disabled:opacity-50 rounded-full shadow-xl cursor-pointer px-1 transition-colors"
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full bg-white border border-[#d1a054] rounded-xl shadow-xl p-6 sm:p-[40px] h-fit">
          <div>
            <h2 className="text-[1.5rem] mb-4 border-b text-[#d1a054] border-b-[#d1a054]">
              {t("cart.cartTotal")}
            </h2>

            <div className="flex justify-between mb-2 py-[12px]">
              <span className="font-bold text-[#7a4a2e]">
                {" "}
                {t("cart.subtotal")}
              </span>
              <span className="text-[#d1a054]">د.إ {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-5 mb-4 py-[12px]">
              <span className="font-bold text-[#7a4a2e]">
                {t("cart.shipping")}
              </span>
              <span className="text-[#7a4a2e] text-[14px]">
                {t("cart.shippingNote")}
              </span>
            </div>

            <div className="flex justify-between text-lg font-semibold pb-[12px] pt-2 mb-4 text-[#7a4a2e]">
              <span>{t("cart.total")}</span>
              <span className="text-[#d1a054]">د.إ {total.toFixed(2)}</span>
            </div>

            <button
              className="w-full bg-[#d1a054] text-white py-4 rounded-full hover:opacity-90 transition-all cursor-pointer"
              onClick={() => router.push(`/${locale}/checkout`)}
            >
              {t("cart.proceedCheckout")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
