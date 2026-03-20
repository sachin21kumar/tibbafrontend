"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useCallback } from "react";
import { X, Trash2, FileText } from "lucide-react";
import {
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "../redux/query/cartQuery/cart.query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useTranslations } from "@/i18n/TranslationProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ViewCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: any;
}

export default function ViewCartModal({
  isOpen,
  onClose,
  cart,
}: ViewCartModalProps) {
  const router = useRouter();
  const { locale, t } = useTranslations();

  const locationId = Cookies.get("selectedLocationId");

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      specialInstructions: "",
      cutlery: false,
    },
  });

  const [updateCart] = useUpdateCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  useEffect(() => {
    if (cart?.specialInstructions) {
      setValue("specialInstructions", cart.specialInstructions);
    }
    if (typeof cart?.cutlery === "boolean") {
      setValue("cutlery", cart.cutlery);
    }
  }, [cart, setValue]);

  const handleIncrease = useCallback(
    (productId: string, quantity: number) => {
      if (!locationId) return;

      updateCart({
        productId,
        quantity: quantity + 1,
        locationId,
      });
    },
    [updateCart, locationId],
  );

  const handleDecrease = useCallback(
    (productId: string, quantity: number) => {
      if (!locationId) return;
      if (quantity === 1) return;

      updateCart({
        productId,
        quantity: quantity - 1,
        locationId,
      });
    },
    [updateCart, locationId],
  );

  const handleRemove = useCallback(
    (productId: string) => {
      if (!locationId) return;

      removeFromCart({
        productId,
        locationId,
      });
    },
    [removeFromCart, locationId],
  );

  const onSubmit = async (data: any) => {
    if (!locationId) return;

    try {
      await updateCart({
        locationId,
        specialInstructions: data.specialInstructions,
        cutlery: data.cutlery,
      }).unwrap();

      toast.success("Cart updated successfully");
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    return () => {
      document.documentElement.style.overflowX = "";
    };
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment}>
          <div className="fixed inset-0 bg-gray/50" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4 font-semibold">
          <Transition.Child as={Fragment}>
            <Dialog.Panel className="w-full max-w-2xl rounded-2xl bg-white shadow-xl flex flex-col max-h-[90vh]">
              <div className="relative border-b p-6 text-center border-b-[#AD5727]">
                <h2 className="sm:text-[34px] text-[20px] text-[#AD5727]">
                  {t("View_cart_model.vieworder")}
                </h2>
                <button onClick={onClose} className="absolute right-6 top-6">
                  <X size={32} className="text-[#AD5727]" />
                </button>
              </div>

              {cart?.items?.length > 0 ? (
                <div className="overflow-y-auto px-6 py-4 flex-1 max-h-[60vh]">
                  {cart.items.map((item: any) => (
                    <div
                      key={item?.productId?._id}
                      className="flex items-center justify-between py-4 border-b border-b-[#AD5727]"
                    >
                      <div>
                        <h3 className="text-lg text-[#AD5727]">
                          {item?.productId?.name}
                        </h3>
                        <div className="mt-2 flex items-center gap-4 text-sm text-[#AD5727]">
                          <button
                            onClick={() =>
                              handleDecrease(item.productId._id, item.quantity)
                            }
                          >
                            −
                          </button>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleIncrease(item.productId._id, item.quantity)
                            }
                          >
                            +
                          </button>
                          <span className="ml-4 font-semibold">
                            د.إ {item?.productId?.price}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemove(item.productId._id)}
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}

                  <div className="mt-6 border rounded-xl p-4 bg-gray-50">
                    <p className="text-sm font-medium text-gray-700 mb-2 !font-[system-ui]">
                      Special Instructions (Optional)
                    </p>

                    <div className="flex items-start gap-2 border-b pb-2">
                      <FileText size={18} className="text-gray-500 mt-1" />
                      <input
                        type="text"
                        {...register("specialInstructions")}
                        placeholder="Add Cooking / Delivery Instructions"
                        className="w-full bg-transparent outline-none text-sm"
                      />
                    </div>

                    <label className="flex items-center gap-2 mt-4 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("cutlery")}
                        className="h-4 w-4 accent-[#AD5727]"
                      />
                      Add cutlery
                    </label>

                    <div className="flex justify-end mt-3">
                      <button
                        onClick={handleSubmit(onSubmit)}
                        className="px-4 py-1.5 text-sm rounded-full border border-[#AD5727] text-[#AD5727] hover:bg-[#AD5727] hover:text-white"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <span className="p-6 text-center text-[#AD5727]">
                  {t("View_cart_model.noproductincart")}
                </span>
              )}

              {cart?.items?.length > 0 && (
                <div className="p-6 border-t border-t-[#d1a054]">
                  <div className="w-full max-w-md mx-auto p-4 bg-white">
                    <div className="flex justify-between mb-2">
                      <span>{t("View_cart_model.subtotal")}</span>
                      <span>د.إ {cart?.subtotal?.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between mb-2">
                      <span>{t("View_cart_model.discount")}</span>
                      <span className="text-green-600">
                        - د.إ {cart?.discount?.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between mb-3">
                      <span>{t("View_cart_model.delivery")}</span>
                      <span className="text-red-500">
                        د.إ {cart?.deliveryFee?.toFixed(2)}
                      </span>
                    </div>

                    <div className="border-t my-2"></div>

                    <div className="flex justify-between">
                      <span className="font-semibold">
                        {t("View_cart_model.total")}
                      </span>
                      <span className="font-bold text-[#AD5727]">
                        د.إ {cart?.totalPrice?.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    className="w-full mt-4 rounded-full border border-[#AD5727] py-4 text-[#AD5727]"
                    onClick={() => {
                      router.push(`/${locale}/checkout`);
                      onClose();
                    }}
                  >
                    {t("View_cart_model.checkout")}
                  </button>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
