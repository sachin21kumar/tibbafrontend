import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CheckoutResponse {
  clientSecret: string;
  orderId: string;
}

export interface CheckoutDto {
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
}
export interface ConfirmPaymentResponse {
  message: string;
}
export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    createCheckout: builder.mutation<CheckoutResponse, CheckoutDto>({
      query: (data) => ({
        url: "checkout",
        method: "POST",
        body: data,
      }),
    }),
    confirmPayment: builder.mutation<ConfirmPaymentResponse, { orderId: string }>({
      query: ({ orderId }) => ({
        url: "checkout/confirm",
        method: "POST",
        body: { orderId },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useCreateCheckoutMutation,useConfirmPaymentMutation } = checkoutApi;
