"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { X, Trash2 } from "lucide-react";
import { useRemoveFromCartMutation, useUpdateCartMutation } from "../redux/query/cartQuery/cart.query";
import { useRouter } from "next/navigation";

interface ViewCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: any;
}

export default function ViewCartModal({ isOpen, onClose, cart }: ViewCartModalProps) {
  const router = useRouter();
  const [updateCart] = useUpdateCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const handleIncrease = (productId: string, quantity: number) => {
    updateCart({ productId, quantity: quantity + 1 });
  };

  const handleDecrease = (productId: string, quantity: number) => {
    if (quantity === 1) return;
    updateCart({ productId, quantity: quantity - 1 });
  };

  const handleRemove = (productId: string) => {
    removeFromCart({ productId });
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
            <Dialog.Panel className="w-full max-w-2xl rounded-2xl bg-white shadow-xl flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="relative border-b p-6 text-center border-b-gray-200">
                <h2 className="sm:text-[34px] text-[20px] tracking-wide">View Order</h2>
                <button
                  onClick={onClose}
                  className="absolute right-6 top-6 font-[300] hover:text-black cursor-pointer"
                >
                  <X size={32} className="font-semibold text-gray-500" />
                </button>
              </div>

              {/* Scrollable Items */}
              {cart?.items?.length > 0 ? (
                <div className="divide-y divide-gray-200 overflow-y-auto px-6 py-4 flex-1 max-h-[60vh] sm:max-h-[70vh]">
                  {cart.items.map((item: any) => (
                    <div
                      key={item.productId._id}
                      className="flex items-center justify-between py-4 border-b border-b-gray-200"
                    >
                      <div>
                        <h3 className="text-lg">{item.productId.name}</h3>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <button
                            onClick={() => handleDecrease(item.productId._id, item.quantity)}
                            className="text-xl cursor-pointer"
                          >
                            −
                          </button>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ffffff]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrease(item.productId._id, item.quantity)}
                            className="text-xl cursor-pointer"
                          >
                            +
                          </button>
                          <span className="ml-4 font-medium">${item.productId.price}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemove(item.productId._id)}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="p-6 text-center w-full flex items-center justify-center font-[system-ui] text-gray-700">
                  No products in the cart.
                </span>
              )}

              {/* Footer / Checkout */}
              {cart?.items?.length > 0 && (
                <div className="p-6 border-t border-t-gray-200">
                  <p className="mb-4 text-center text-[1.5rem] font-allura">
                    Subtotal: <span className="text-[1.5rem]">${cart?.totalPrice ?? 0}</span>
                  </p>
                  <button
                    className="w-full rounded-full bg-[#d1a054] py-4 text-lg font-medium text-white shadow-md cursor-pointer hover:opacity-90"
                    onClick={() => { router.push("/checkout"); onClose(); }}
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
