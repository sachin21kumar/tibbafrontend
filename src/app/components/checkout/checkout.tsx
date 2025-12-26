"use client";

import { useForm } from "react-hook-form";
import { useGetCartQuery } from "../redux/query/cartQuery/cart.query";
import { stripePromise } from "@/app/lib/stripe";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  useConfirmPaymentMutation,
  useCreateCheckoutMutation,
} from "../redux/query/checkout/checkoutQuery";
import { useRef, useState } from "react";

type CheckoutFormValues = {
  firstName: string;
  lastName: string;
  company?: string;
  country: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  phone: number;
  email: string;
};

export const CheckoutPage = () => {
  const router = useRouter();
  const [checkout, { isLoading: checkoutLoading }] =
    useCreateCheckoutMutation();
  const { data: cart, isLoading, isError } = useGetCartQuery();
  const [confirmPayment] = useConfirmPaymentMutation();
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    setValue,
    reset,
  } = useForm<CheckoutFormValues>();

  const addressInputRef = useRef<HTMLInputElement>(null);

  // Fetch suggestions from Geoapify
  const fetchAddressSuggestions = async (query: string) => {
    if (!query) {
      setAddressSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          query
        )}&apiKey=ac63444c18184111a08af727096f783f`
      );
      const data = await res.json();
      setAddressSuggestions(data.features || []);
    } catch (err) {
      console.error("Geoapify fetch error:", err);
    }
  };

  const fillAddressFields = (feature: any) => {
    const props = feature.properties;
    setValue("address", props.street || props.formatted || "");
    setValue("city", props.city || props.county || "");
    setValue("state", props.state || "");
    setValue("pinCode", props.postcode || "");
    setValue("country", props.country_code?.toLowerCase() || "United States (US)");
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet.");
      return;
    }

    try {
      const res: any = await checkout(data).unwrap();

      const { clientSecret, orderId } = res;

      if (!orderId) {
        toast.error("Failed to get order ID. Please try again.");
        return;
      }
      const card = elements.getElement(CardElement);
      if (!card) {
        toast.error("Card element not found. Please try again.");
        return;
      }

      const paymentResult: any = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            address: {
              line1: data.address,
              city: data.city,
              state: data.state,
              postal_code: data.pinCode,
              country: data?.country,
            },
            phone: data.phone.toString(),
          },
        },
      });

      if (paymentResult.error) {
        toast.error("Payment failed: " + paymentResult.error.message);
      } else if (paymentResult.paymentIntent?.status === "succeeded") {
        toast.success("Payment successful!");
        reset();

        if (orderId) {
          try {
            await confirmPayment({ orderId }).unwrap();
          } catch (err) {
            console.error("Failed to confirm payment:", err);
            toast.error("Failed to confirm payment");
          }
        }
        window.location.href = `/order-success?orderId=${orderId}`;
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Payment failed. Please try again.");
    }
  };

  const items = cart?.items || [];

  const subtotal = items.reduce(
    (sum: number, item: any) => sum + item.productId.price * item.quantity,
    0
  );
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_430px] gap-16">
      <div>
        <h3 className="text-2xl font-normal tracking-wide mb-10 border-b border-b-[#d1a054]">
          BILLING & SHIPPING
        </h3>

        <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-xs uppercase tracking-wider ">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("firstName", {
                required: "First name is required",
              })}
              className={`w-full border-b focus:outline-none py-2 ${
                isSubmitted && errors.firstName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {isSubmitted && errors.firstName && (
              <span className="text-xs text-red-500 mt-1">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider ">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("lastName", {
                required: "Last name is required",
              })}
              className={`w-full border-b focus:outline-none py-2 ${
                isSubmitted && errors.lastName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {isSubmitted && errors.lastName && (
              <span className="text-xs text-red-500 mt-1">
                {errors.lastName.message}
              </span>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-gray-500">
              Company Name (optional)
            </label>
            <input
              type="text"
              {...register("company")}
              className="w-full border-b border-gray-300 focus:outline-none py-2"
            />
          </div>

          <div className="relative">
            <label className="text-xs uppercase tracking-wider text-gray-500">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("address", {
                required: "Street address is required",
              })}
              ref={addressInputRef}
              onChange={(e) => {
                fetchAddressSuggestions(e.target.value);
                setShowSuggestions(true);
              }}
              className={`w-full border-b focus:outline-none py-2 ${
                isSubmitted && errors.address
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              autoComplete="off"
            />
            {isSubmitted && errors.address && (
              <span className="text-xs text-red-500 mt-1">
                {errors.address.message}
              </span>
            )}

            {showSuggestions && addressSuggestions.length > 0 && (
              <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
                {addressSuggestions.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      fillAddressFields(item);
                      setShowSuggestions(false);
                    }}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                  >
                    {item.properties.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-gray-500">
              Country / Region <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("country", {
                required: "Country is required",
              })}
              className={`w-full border-b focus:outline-none py-2 ${
                isSubmitted && errors.country
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {isSubmitted && errors.country && (
              <span className="text-xs text-red-500 mt-1">
                {errors.country.message}
              </span>
            )}
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-gray-500">
              Town / City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("city", {
                required: "City is required",
              })}
              className={`w-full border-b focus:outline-none py-2 ${
                isSubmitted && errors.city
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {isSubmitted && errors.city && (
              <span className="text-xs text-red-500 mt-1">
                {errors.city.message}
              </span>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-gray-500">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("state", {
                required: "State is required",
              })}
              className={`w-full border-b focus:outline-none py-2 ${
                isSubmitted && errors.state
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {isSubmitted && errors.state && (
              <span className="text-xs text-red-500 mt-1">
                {errors.state.message}
              </span>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-gray-500">
              Pin code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("pinCode", {
                required: "Pin code is required",
              })}
              className={`w-full border-b focus:outline-none py-2 ${
                isSubmitted && errors.pinCode
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {isSubmitted && errors.pinCode && (
              <span className="text-xs text-red-500 mt-1">
                {errors.pinCode.message}
              </span>
            )}
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-gray-500">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("phone", {
                required: "Phone is required",
              })}
              className={`w-full border-b focus:outline-none py-2 ${
                isSubmitted && errors.phone
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {isSubmitted && errors.phone && (
              <span className="text-xs text-red-500 mt-1">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-gray-500">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className={`w-full border-b focus:outline-none py-2 ${
                isSubmitted && errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {isSubmitted && errors.email && (
              <span className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-normal tracking-wide border-b border-b-[#d1a054] pb-2">
              ADDITIONAL INFORMATION
            </h3>

            <div className="mt-10">
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                Order Notes (optional)
              </label>

              <textarea
                rows={3}
                className="w-full border-b border-gray-300 focus:outline-none resize-none"
              />
            </div>

            <div className="mt-10 flex items-start gap-3">
              <input type="checkbox" className="mt-[2px] accent-gray-600" />

              <label className="text-xs uppercase tracking-wider text-gray-500 leading-relaxed">
                Yes, I'm ok with you sending me additional newsletter and email
                content (optional)
              </label>
            </div>
          </div>

          <button type="submit" hidden />
        </form>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-[40px] h-fit sticky top-30">
        <h3 className="font-normal text-2xl mb-6 border-b border-b-[#d1a054]">
          YOUR ORDER
        </h3>
        {items?.length > 0 ? (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-b-gray-300">
                <th className="text-left font-bold pb-3">PRODUCT</th>
                <th className="text-right font-bold pb-3">SUBTOTAL</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={2} className="py-6 text-center text-gray-500">
                    Loading cart...
                  </td>
                </tr>
              ) : (
                items.map((item: any) => (
                  <tr
                    key={item.productId._id}
                    className="border-b border-b-gray-300"
                  >
                    <td className="py-3 font-[system-ui] text-gray-500 w-[175px]">
                      {item.productId.name} × {item.quantity}
                    </td>
                    <td className="py-3 text-right">
                      ${(item.productId.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))
              )}

              <tr>
                <th className="py-[12px] font-bold text-left">SUBTOTAL</th>
                <td className="py-[12px] text-[#d1a054] text-base text-left">
                  ${subtotal.toFixed(2)}
                </td>
              </tr>

              <tr>
                <th className="py-2 font-bold text-left">SHIPPING</th>
                <td className="py-2 text-gray-500 text-left font-[system-ui]">
                  Enter your address to view shipping options.
                </td>
              </tr>

              <tr>
                <th className="pt-2 font-semibold text-lg text-left">TOTAL</th>
                <td className="pt-2 text-2xl text-[#d1a054] text-left">
                  ${subtotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="w-full">
            <span className="text-center py-6 flex justify-center text-center w-full text-gray-500">
              Your cart is empty
            </span>
          </div>
        )}
        {items?.length > 0 && (
          <>
            <div className="border border-dashed border-gray-300 rounded-lg p-4 text-sm text-gray-600 mt-6 text-center">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "14px",
                      color: "#374151",
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

            <div className="py-4">
              <div className="text-xs text-gray-500 font-[system-ui] leading-tight">
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
        )}
      </div>
    </div>
  );
};
