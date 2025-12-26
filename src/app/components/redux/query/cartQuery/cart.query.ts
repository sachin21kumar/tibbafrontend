import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CartItem {
  productId: any;
  quantity: number;
}

export interface CartResponse {
  _id: string;
  items: CartItem[];
  totalPrice: number;
}

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => "cart",
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation<
      CartResponse,
      { productId: string; quantity?: number }
    >({
      query: (body) => ({
        url: "cart/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCart: builder.mutation<
      CartResponse,
      { productId: string; quantity: number }
    >({
      query: (body) => ({
        url: "cart/update", // ✅ NOT cart/add
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation<CartResponse, { productId: string }>({
      query: (body) => ({
        url: "cart/remove",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: "cart/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    getCartByProductId: builder.query<CartItem, string>({
      query: (productId) => `cart/${productId}`, // dynamic URL
      providesTags: (result, error, productId) => [
        { type: "Cart", id: productId },
      ],
    }),
    
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useGetCartByProductIdQuery,
} = cartApi;
