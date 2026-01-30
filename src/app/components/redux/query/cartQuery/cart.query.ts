import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* =======================
   TYPES
======================= */

export interface CartProduct {
  _id: string;
  name?: string;
  price?: number;
  imagePath?: string;
}

export interface CartItem {
  productId: CartProduct;
  quantity: number;
}

export interface CartResponse {
  _id: string;
  items: CartItem[];
  totalPrice: number;
  locationId?: string;
}

/* =======================
   API
======================= */

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),

  // ✅ GLOBAL PERFORMANCE FIX
  refetchOnFocus: false,
  refetchOnReconnect: false,
  keepUnusedDataFor: 300,

  endpoints: (builder) => ({
    /* ---------- GET CART ---------- */
    getCart: builder.query<CartResponse, void>({
      query: () => "cart",
    }),

    /* ---------- ADD TO CART (OPTIMISTIC) ---------- */
    addToCart: builder.mutation<
  CartResponse,
  {
    productId: string;
    quantity?: number;
    locationId?: string;
    product: {
      name: string;
      price: number;
      imagePath?: string;
    };
  }
>({
  query: ({ product, ...body }) => ({
    // 👆 REMOVE product from request
    url: "cart/add",
    method: "POST",
    body,
  }),

  async onQueryStarted(
    { productId, quantity = 1, product },
    { dispatch, queryFulfilled }
  ) {
    const patch = dispatch(
      cartApi.util.updateQueryData("getCart", undefined, (draft) => {
        const existing = draft.items.find(
          (i) => i.productId._id === productId
        );

        if (existing) {
          existing.quantity += quantity;
          draft.totalPrice += (existing.productId.price ?? 0) * quantity;
        } else {
          draft.items.push({
            productId: {
              _id: productId,
              name: product.name,
              price: product.price,
              imagePath: product.imagePath,
            },
            quantity,
          });

          draft.totalPrice += product.price * quantity;
        }
      })
    );

    try {
      await queryFulfilled;
    } catch {
      patch.undo();
    }
  },
}),


    /* ---------- UPDATE CART ---------- */
    updateCart: builder.mutation<
      CartResponse,
      { productId: string; quantity: number }
    >({
      query: (body) => ({
        url: "cart/update",
        method: "POST",
        body,
      }),

      async onQueryStarted(
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) {
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const item = draft.items.find(
              (i) => i.productId._id === productId
            );
            if (!item || !item.productId.price) return;

            const diff = quantity - item.quantity;
            item.quantity = quantity;
            draft.totalPrice += item.productId.price * diff;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),

    /* ---------- REMOVE FROM CART ---------- */
    removeFromCart: builder.mutation<CartResponse, { productId: string }>({
      query: (body) => ({
        url: "cart/remove",
        method: "DELETE",
        body,
      }),

      async onQueryStarted(
        { productId },
        { dispatch, queryFulfilled }
      ) {
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const item = draft.items.find(
              (i) => i.productId._id === productId
            );
            if (!item || !item.productId.price) return;

            draft.totalPrice -= item.productId.price * item.quantity;
            draft.items = draft.items.filter(
              (i) => i.productId._id !== productId
            );
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),

    /* ---------- CLEAR CART ---------- */
    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: "cart/clear",
        method: "DELETE",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            draft.items = [];
            draft.totalPrice = 0;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
  }),
});

/* =======================
   HOOKS
======================= */

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;
