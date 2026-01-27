"use client";

import { useForm } from "react-hook-form";
import { useGetCartQuery } from "../redux/query/cartQuery/cart.query";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import {
  useConfirmPaymentMutation,
  useCreateCheckoutMutation,
} from "../redux/query/checkout/checkoutQuery";
import { useRef, useState } from "react";

type CheckoutFormValues = {
  fullName: string;
  address: string;
  email: string;
  phone: string;
  deliveryType: string;
  buildingName: string;
  paymentMethod: "stripe" | "cod";
};

export const CheckoutPage = () => {
  const router = useRouter();
  const [checkout, { isLoading: checkoutLoading }] =
    useCreateCheckoutMutation();
  const { data: cart, isLoading, isError } = useGetCartQuery();
  const [confirmPayment] = useConfirmPaymentMutation();
  const [customerLatLng, setCustomerLatLng] = useState<any>(null);
  const [addressValidationError, setAddressValidationError] = useState<
    string | null
  >(null);
  const [isAddressValid, setIsAddressValid] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
    watch,
    getValues,
  } = useForm<CheckoutFormValues>({
    defaultValues: {
      paymentMethod: "stripe",
    },
  });

  const paymentMethod = watch("paymentMethod");

  const validateAddressWithBackend = async (fullAddress: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/address-validate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: fullAddress }),
        },
      );

      const data = await res.json();

      if (!data.valid) {
        setIsAddressValid(false);
        setAddressValidationError(
          data.message || "Please include city or state name",
        );
        return false;
      }

      setIsAddressValid(true);
      setAddressValidationError(null);
      return true;
    } catch {
      setIsAddressValid(false);
      setAddressValidationError("Address validation failed");
      return false;
    }
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet.");
      return;
    }

    if (data.deliveryType === "delivery" && !isAddressValid) {
      toast.error("Please enter a valid address with city or state");
      return;
    }

    let latLng = customerLatLng;

    const geocodeAddress = async (address: string) => {
      try {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address,
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
        );

        const data = await res.json();

        if (data.status === "OK" && data.results.length > 0) {
          return data.results[0].geometry.location;
        }
        return null;
      } catch {
        return null;
      }
    };

    if (data.deliveryType === "delivery") {
      const fullAddress = `${data.buildingName}, ${data.address}`;
      const geo = await geocodeAddress(fullAddress);

      if (!geo) {
        toast.error("Unable to locate your address.");
        return;
      }

      latLng = geo;
      setCustomerLatLng(geo);
    }

    try {
      const payload: any = {
        ...data,
        locationId: cart?.locationId || null,
        addressLatLng: latLng,
      };

      const res: any = await checkout(payload).unwrap();
      const { clientSecret, orderId } = res;

      if (!orderId) {
        toast.error("Failed to get order ID.");
        return;
      }
      if (data.paymentMethod === "cod") {
        Cookies.remove("selectedLocationId");
        toast.success("Order placed successfully!");
        await confirmPayment({ orderId }).unwrap();
        window.location.href = `/order-success?orderId=${orderId}`;
        return;
      }
      if (!stripe || !elements) {
        toast.error("Stripe not loaded");
        return;
      }

      const card = elements.getElement(CardElement);
      if (!card) {
        toast.error("Card input not found");
        return;
      }

      const paymentResult: any = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: data.fullName,
            email: data.email,
            phone: data.phone,
            address: { line1: data.address },
          },
        },
      });

      if (paymentResult.error) {
        toast.error(paymentResult.error.message);
      } else if (paymentResult.paymentIntent?.status === "succeeded") {
        Cookies.remove("selectedLocationId");
        toast.success("Payment successful!");
        reset();
        await confirmPayment({ orderId }).unwrap();
        window.location.href = `/order-success?orderId=${orderId}`;
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Payment failed.");
    }
  };

  const items = cart?.items || [];

  const subtotal = items.reduce(
    (sum: number, item: any) => sum + item.productId.price * item.quantity,
    0,
  );
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_430px] gap-16">
      <div>
        <h3 className="text-2xl font-normal tracking-wide mb-10 border-b border-b-[#d1a054]">
          BILLING & SHIPPING
        </h3>

        <form className="space-y-10 "  onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <label className="text-xs uppercase tracking-wider text-[#7a4a2e] mb-2 block">
              Delivery Type <span className="text-red-500">*</span>
            </label>

            <div className="flex gap-3">
              {/* DELIVERY */}
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="delivery"
                  {...register("deliveryType", {
                    required: "Please select delivery type",
                  })}
                  className="hidden peer"
                />
                <div
                  className="px-5 py-2 rounded-full border border-[#d1a054] text-sm font-semibold transition
        peer-checked:bg-[#d1a054]
        peer-checked:text-white
        peer-checked:border-[#d1a054]
        bg-white text-[#7a4a2e]"
                >
                  DELIVERY
                </div>
              </label>

              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="pickup"
                  {...register("deliveryType", {
                    required: "Please select delivery type",
                  })}
                  className="hidden peer"
                />
                <div
                  className="px-5 py-2 rounded-full border text-sm font-semibold transition
        peer-checked:bg-[#d1a054]
        peer-checked:text-white
        peer-checked:border-[#d1a054]
        bg-white text-[#7a4a2e] border-[#d1a054]"
                >
                  PICKUP
                </div>
              </label>
            </div>

            {isSubmitted && errors.deliveryType && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.deliveryType.message}
              </span>
            )}
          </div>

          <div >
            <label className="text-xs uppercase tracking-wider text-[#7a4a2e]">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("fullName", {
                required: "First name is required",
              })}
              className={`w-full border-b text-[#7a4a2e] !font-[system-ui] focus:outline-none py-2 ${
                isSubmitted && errors.fullName
                  ? "border-red-500"
                  : "border-[#d1a054]"
              }`}
            />
            {isSubmitted && errors.fullName && (
              <span className="text-xs text-red-500 mt-1">
                {errors.fullName.message}
              </span>
            )}
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-[#7a4a2e]">
              Building Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("buildingName", {
                required: "Building Name is required",
              })}
              className={`w-full border-b text-[#7a4a2e] !font-[system-ui] focus:outline-none py-2 ${
                isSubmitted && errors.buildingName
                  ? "border-red-500"
                  : "border-[#d1a054]"
              }`}
            />
            {isSubmitted && errors.buildingName && (
              <span className="text-xs text-red-500 mt-1">
                {errors.buildingName.message}
              </span>
            )}
          </div>
          <div className="relative">
            <label className="text-xs uppercase tracking-wider text-[#7a4a2e]">
              Flat Address <span className="text-red-500">*</span>
            </label>
            <input
              {...register("address", {
                required: "Flat address is required",
              })}
              className={`w-full border-b text-[#7a4a2e] !font-[system-ui] focus:outline-none py-2 ${
                isSubmitted && errors.address
                  ? "border-red-500"
                  : "border-[#d1a054]"
              }`}
              placeholder="Flat / Apartment / City / State"
              onBlur={async (e) => {
                const building = getValues("buildingName") || "";
                const fullAddress = `${building}, ${e.target.value}`;
                if (e.target.value.length > 3) {
                  await validateAddressWithBackend(fullAddress);
                }
              }}
            />

            {addressValidationError && (
              <span className="text-xs text-red-500 mt-1 block">
                {addressValidationError}
              </span>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-[#7a4a2e]">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("phone", {
                required: "Phone is required",
              })}
              className={`w-full border-b text-[#7a4a2e] !font-[system-ui] focus:outline-none py-2 ${
                isSubmitted && errors.phone
                  ? "border-red-500"
                  : "border-[#d1a054]"
              }`}
            />
            {isSubmitted && errors.phone && (
              <span className="text-xs text-red-500 mt-1">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-[`#7a4a2e]">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className={`w-full border-b text-[#7a4a2e] !font-[system-ui] focus:outline-none py-2 ${
                isSubmitted && errors.email
                  ? "border-red-500"
                  : "border-[#d1a054]"
              }`}
            />
            {isSubmitted && errors.email && (
              <span className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </span>
            )}
          </div>
          <label className="text-xs uppercase tracking-wider text-[#7a4a2e]">Payment Method:</label>
          <div className="flex gap-3 py-3">
            {[
              { id: "stripe", label: "CARD PAYMENT" },
              { id: "cod", label: "CASH ON DELIVERY" },
            ].map((p) => (
              <label key={p.id} className="cursor-pointer">
                <input
                  type="radio"
                  value={p.id}
                  {...register("paymentMethod")}
                  className="hidden peer"
                />
                <div
                  className="px-5 py-2 rounded-full border text-sm font-semibold
                  peer-checked:bg-[#d1a054]
                  peer-checked:text-white
                  peer-checked:border-[#d1a054]
                  bg-white text-[#7a4a2e] border-[#d1a054]"
                >
                  {p.label}
                </div>
              </label>
            ))}
          </div>
          

          <button type="submit" hidden />
        </form>
      </div>

      <div className="bg-white border border-[#d1a054] rounded-xl shadow-lg p-[40px] h-fit sticky top-30">
        <h3 className="font-normal text-2xl mb-6 border-b border-b-[#d1a054] text-[#7a4a2e]">
          YOUR ORDER
        </h3>
        {items?.length > 0 ? (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-b-[#d1a054]">
                <th className="text-left font-bold pb-3 text-[#7a4a2e]">PRODUCT</th>
                <th className="text-right font-bold pb-3 text-[#7a4a2e]">SUBTOTAL</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={2} className="py-6 text-center text-[#7a4a2e]">
                    Loading cart...
                  </td>
                </tr>
              ) : (
                items.map((item: any) => (
                  <tr
                    key={item.productId._id}
                    className="border-b border-b-[#d1a054]"
                  >
                    <td className="py-3 font-[system-ui] text-[#7a4a2e] w-[175px]">
                      {item.productId.name} × {item.quantity}
                    </td>
                    <td className="py-3 text-right text-[#7a4a2e] ">
                     د.إ {(item.productId.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))
              )}

              <tr>
                <th className="py-[12px] font-bold text-left text-[#7a4a2e]">SUBTOTAL</th>
                <td className="py-[12px] text-[#d1a054] text-base text-left ">
                  د.إ {subtotal.toFixed(2)}
                </td>
              </tr>

              <tr>
                <th className="py-2 font-bold text-left text-[#7a4a2e]">SHIPPING</th>
                <td className="py-2 text-[#7a4a2e] text-left font-[system-ui]">
                  Enter your address to view shipping options.
                </td>
              </tr>

              <tr>
                <th className="pt-2 font-semibold text-lg text-left text-[#7a4a2e]">TOTAL</th>
                <td className="pt-2 text-2xl text-[#d1a054] text-left">
                  د.إ {subtotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="w-full">
            <span className="text-center py-6 flex justify-center text-center w-full text-[#7a4a2e]">
              Your cart is empty
            </span>
          </div>
        )}

          <>
            {items?.length > 0 && (
              <>
              {paymentMethod === "stripe" && (
                <div className="border border-dashed border-[#d1a054] rounded-lg p-4 text-sm text-[#7a4a2e] mt-6 text-center">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "14px",
                          color: "#7a4a2e",
                          fontFamily: "system-ui, sans-serif",
                          "::placeholder": {
                            color: "#9ca3af",
                          },
                        },
                        invalid: {
                          color: "#ef4444",
                        },
                      },
                    }}
                  />
                </div>
              )}
              </>
              )}

            <div className="py-4">
              <div className="text-xs text-[#7a4a2e] font-[system-ui] leading-tight">
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our{" "}
                <a
                  className="text-[#d8b07a] underline cursor-pointer hover:no-underline"
                  href="http://mtb.dgh.mybluehost.me/?page_id=3"
                  target="_blank"
                >
                  privacy policy
                </a>
                .
              </div>
            </div>
            <button
              onClick={handleSubmit(onSubmit)}
              className="w-full text-xs mt-6 bg-[#d1a054] text-white py-4 rounded-full font-serif tracking-wide hover:opacity-90 transition cursor-pointer"
            >
              {checkoutLoading ? "Placing...." : "PLACE ORDER"}
            </button>
          </>
      </div>
    </div>
  );
};
