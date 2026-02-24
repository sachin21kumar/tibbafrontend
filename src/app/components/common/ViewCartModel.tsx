"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useCallback } from "react";
import { X, Trash2 } from "lucide-react";
import {
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "../redux/query/cartQuery/cart.query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useTranslations } from "@/i18n/TranslationProvider";

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

  const [updateCart] = useUpdateCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

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

  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    return () => {
      document.documentElement.style.overflowX = "";
    };
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray/50" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4 font-semibold">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-2xl rounded-2xl bg-white shadow-xl flex flex-col max-h-[90vh]">
              <div className="relative border-b p-6 text-center border-b-[#AD5727]">
                <h2 className="sm:text-[34px] text-[20px] tracking-wide text-[#AD5727]">
                  View Order
                </h2>
                <button
                  onClick={onClose}
                  className="absolute right-6 top-6 font-[300] hover:text-black cursor-pointer"
                >
                  <X size={32} className="font-semibold text-[#AD5727]" />
                </button>
              </div>
              {cart?.items?.length > 0 ? (
                <div className="divide-y divide-[#AD5727] overflow-y-auto px-6 py-4 flex-1 max-h-[60vh] sm:max-h-[70vh]">
                  {cart.items.map((item: any) => (
                    <div
                      key={item.productId._id}
                      className="flex items-center justify-between py-4 border-b border-b-[#AD5727]"
                    >
                      <div>
                        <h3 className="text-lg text-[#AD5727]">
                          {item.productId.name}
                        </h3>
                        <div className="mt-2 flex items-center gap-4 text-sm text-[#AD5727]">
                          <button
                            onClick={() =>
                              handleDecrease(item.productId._id, item.quantity)
                            }
                            className="text-xl cursor-pointer"
                          >
                            −
                          </button>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ffffff]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleIncrease(item.productId._id, item.quantity)
                            }
                            className="text-xl cursor-pointer"
                          >
                            +
                          </button>
                          <span className="ml-4 font-semibold text-[#AD5727]">
                            د.إ {item.productId.price}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemove(item.productId._id)}
                        className="text-red-500 hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="p-6 text-center w-full flex items-center justify-center text-[#AD5727] font-[system-ui]">
                  No products in the cart.
                </span>
              )}

              {cart?.items?.length > 0 && (
                <div className="p-6 border-t border-t-[#d1a054]">
                  <p className="mb-4 text-center text-[1.5rem] font-allura font-semibold text-[#AD5727]">
                    Subtotal:{" "}
                    <span className="text-[1.5rem]">
                      د.إ {cart?.totalPrice ?? 0}
                    </span>
                  </p>
                  <button
                    className="w-full rounded-full bg-white py-4 text-lg font-medium text-[#AD5727] border border-[#AD5727] font-semibold shadow-md cursor-pointer hover:opacity-90"
                    onClick={() => {
                      router.push(`/${locale}/checkout`);
                      onClose();
                    }}
                  >
                    Checkout
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
