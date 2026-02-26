"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import {
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "../redux/query/cartQuery/cart.query";
import { useGetProductByIdQuery } from "../redux/query/productsQuery/productsQuery";
import Cookies from "js-cookie";
import { useTranslations } from "@/i18n/TranslationProvider";

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string | null;
}

export default function AddToCartModal({
  isOpen,
  onClose,
  productId,
}: AddToCartModalProps) {
  const savedLocationId = Cookies.get("selectedLocationId");
  const router = useRouter();
  const { locale, t } = useTranslations();

  const { data: product, isLoading } = useGetProductByIdQuery(productId!, {
    skip: !productId,
  });

  const { data: cart } = useGetCartQuery(savedLocationId!, {
    skip: !savedLocationId,
  });

  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();
  const [removeFromCart, { isLoading: isRemoving }] =
    useRemoveFromCartMutation();

  const [localQty, setLocalQty] = useState<number>(1);

  const cartItem = cart?.items?.find(
    (item: any) => item.productId?._id === product?._id,
  );

  const isInCart = Boolean(cartItem);
  const quantity = isInCart ? localQty : 1;

  const handleAddToCart = useCallback(() => {
    if (!savedLocationId) {
      router.push(`/${locale}/selectLocation`);
      return;
    }
    if (!product || isAdding) return;

    addToCart({
      productId: product._id,
      quantity,
      locationId: savedLocationId,
      product: {
        name: product.name,
        price: product.price,
        imagePath: product.imagePath,
      },
    });

    onClose();
  }, [
    savedLocationId,
    isAdding,
    addToCart,
    product,
    quantity,
    router,
    onClose,
  ]);

  const handleIncrease = useCallback(() => {
    if (!product || isUpdating || !savedLocationId) return;

    const nextQty = localQty + 1;

    setLocalQty(nextQty);

    updateCart({
      productId: product._id,
      quantity: nextQty,
      locationId: savedLocationId,
    });
  }, [isUpdating, updateCart, product, localQty, savedLocationId]);

  const handleDecrease = useCallback(() => {
    if (!product || isUpdating || isRemoving || !savedLocationId) return;

    if (localQty <= 1) {
      setLocalQty(1);
      removeFromCart({
        productId: product._id,
        locationId: savedLocationId,
      });
      onClose();
      return;
    }

    const nextQty = localQty - 1;

    setLocalQty(nextQty);

    updateCart({
      productId: product._id,
      quantity: nextQty,
      locationId: savedLocationId,
    });
  }, [
    isUpdating,
    isRemoving,
    localQty,
    removeFromCart,
    updateCart,
    product,
    onClose,
    savedLocationId,
  ]);

  useEffect(() => {
    if (cartItem?.quantity) {
      setLocalQty(cartItem.quantity);
    }
  }, [cartItem?.quantity]);

  if (isLoading || !product) return null;

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
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="min-w-[50%] w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden">
              <div className="flex justify-between py-[16px] px-[24px] pb-4">
                <div className="flex gap-6 items-center">
                  <img
                    src={
                      product.imagePath
                        ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${product.imagePath}`
                        : "https://f.nooncdn.com/s/app/com/noon-food/consumer/icons/placeholder.png"
                    }
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <span className="font-bold text-[#7a4a2e]">
                    {product.name}
                  </span>
                </div>

                {!isInCart && (
                  <div className="relative p-6 border-[#d1a054] text-center">
                    <button
                      onClick={onClose}
                      className="absolute right-4 top-4 text-[#7a4a2e] hover:text-[#7a4a2e] cursor-pointer"
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="28" height="28" rx="14" fill="#F4F6FA" />
                        <path
                          d="M19 9L9 19"
                          stroke="#d1a054"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 9L19 19"
                          stroke="#d1a054"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              <div className="border-b border-b-[#d1a054] h-[1px] w-full" />
              <div
                className={`p-4 flex ${
                  !isInCart
                    ? "md:justify-end justify-center"
                    : "justify-between"
                } items-center border-t mt-13 border-[#d1a054]`}
              >
                <div
                  className={`flex items-center justify-between ${
                    isInCart ? "w-full" : ""
                  } md:p-4 p-2`}
                >
                  <div
                    className={`flex items-center text-[#7a4a2e] gap-4 w-full ${
                      isInCart ? "justify-between" : "justify-end"
                    }`}
                  >
                    {isInCart && <div>د.إ {product.price * quantity}</div>}

                    <div className="border border-[#7a4a2e] rounded-2xl flex justify-center items-center">
                      <div className="flex items-center justify-center gap-2 p-1">
                        <button
                          onClick={handleDecrease}
                          className="px-2 py-1 rounded text-lg cursor-pointer text-[#7a4a2e]"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 rounded text-[#7a4a2e]">
                          {quantity}
                        </span>
                        <button
                          onClick={handleIncrease}
                          className="px-2 py-1 rounded text-lg cursor-pointer text-[#7a4a2e]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {!isInCart && (
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="bg-[#D1A054] text-white text-[14px] md:text-[20px] md:px-15 px-2 py-3 rounded-lg font-medium hover:opacity-90 cursor-pointer"
                  >
                    {t("onlineordering.additem")} | د.إ{" "}
                    {product.price * quantity}
                  </button>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
