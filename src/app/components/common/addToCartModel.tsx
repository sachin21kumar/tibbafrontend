"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "../redux/query/cartQuery/cart.query";
import { useGetProductByIdQuery } from "../redux/query/productsQuery/productsQuery";
import Cookies from "js-cookie";

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
  const { data: product, isLoading } = useGetProductByIdQuery(productId!, {
    skip: !productId,
  });
  const { data: cart } = useGetCartQuery();
  const [addToCart] = useAddToCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const cartItem = cart?.items?.find(
    (item: any) => item.productId?._id === product?._id
  );

  const isInCart = Boolean(cartItem);

  // ✅ quantity is derived per item (NO shared state)
  const quantity = cartItem?.quantity ?? 1;

  if (isLoading || !product) return null;

  const handleAddToCart = () => {
    if(!savedLocationId){
      router.push("/selectLocation")
    }
    addToCart({ productId: product._id, quantity,locationId:savedLocationId });
    onClose();
  };

  const handleIncrease = () => {
    updateCart({
      productId: product._id,
      quantity: quantity + 1,
    });
  };

  const handleDecrease = () => {
    if (quantity <= 1) {
      removeFromCart({ productId: product._id });
      onClose();
    }

    updateCart({
      productId: product._id,
      quantity: quantity - 1,
    });
  };

  const handleRemoveAll = () => {
    removeFromCart({ productId: product._id });
  };

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
                  <span className="font-bold font-sans text-[#7a4a2e]">{product.name}</span>
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

              <div className="border-b border-b-[#d1a054] h-[1px] w-full"></div>

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
                        <span className="px-3 py-1 rounded text-[#7a4a2e]">{quantity}</span>
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
                    className="bg-[#D1A054] text-white text-[14px] md:text-[20px] md:px-15 px-2 py-3 rounded-lg font-medium hover:opacity-90 cursor-pointer"
                    onClick={handleAddToCart}
                  >
                    Add item | د.إ {product.price * quantity}
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
