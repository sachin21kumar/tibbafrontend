import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

/* ⭐ Automatically detect language from Next.js URL */
const getLocale = () => {
  if (typeof window === "undefined") return "en";

  const path = window.location.pathname.split("/");
  const lang = path[1];

  if (lang === "ar" || lang === "en") return lang;
  return "en";
};

export const cartApi = createApi({
  reducerPath: "cartApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",

    // ⭐ send locale to backend on every request
    prepareHeaders: (headers) => {
      const locale = getLocale();
      headers.set("x-locale", locale);
      return headers;
    },
  }),

  refetchOnFocus: false,
  refetchOnReconnect: false,
  keepUnusedDataFor: 300,

  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, string>({
      query: (locationId) => ({
        url: "cart",
        params: { locationId },
      }),
    }),

    addToCart: builder.mutation<
      CartResponse,
      {
        productId: string;
        quantity?: number;
        locationId: string;
        product: {
          name: string;
          price: number;
          imagePath?: string;
        };
      }
    >({
      query: ({ product, ...body }) => ({
        url: "cart/add",
        method: "POST",
        body,
      }),

      async onQueryStarted(
        { productId, quantity = 1, product, locationId },
        { dispatch, queryFulfilled },
      ) {
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", locationId, (draft) => {
            const existing = draft.items.find(
              (i) => i.productId._id === productId,
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
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),

    updateCart: builder.mutation<
      CartResponse,
      { productId: string; quantity: number; locationId: string }
    >({
      query: ({ locationId, ...body }) => ({
        url: "cart/update",
        method: "POST",
        body,
      }),

      async onQueryStarted(
        { productId, quantity, locationId },
        { dispatch, queryFulfilled },
      ) {
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", locationId, (draft) => {
            const item = draft.items.find((i) => i.productId._id === productId);
            if (!item || !item.productId.price) return;

            const diff = quantity - item.quantity;
            item.quantity = quantity;
            draft.totalPrice += item.productId.price * diff;
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),

    removeFromCart: builder.mutation<
      CartResponse,
      { productId: string; locationId: string }
    >({
      query: ({ locationId, ...body }) => ({
        url: "cart/remove",
        method: "DELETE",
        body,
      }),

      async onQueryStarted(
        { productId, locationId },
        { dispatch, queryFulfilled },
      ) {
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", locationId, (draft) => {
            const item = draft.items.find((i) => i.productId._id === productId);
            if (!item || !item.productId.price) return;

            draft.totalPrice -= item.productId.price * item.quantity;
            draft.items = draft.items.filter(
              (i) => i.productId._id !== productId,
            );
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),

    clearCart: builder.mutation<void, { locationId: string }>({
      query: () => ({
        url: "cart/clear",
        method: "DELETE",
      }),

      async onQueryStarted({ locationId }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", locationId, (draft) => {
            draft.items = [];
            draft.totalPrice = 0;
          }),
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

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;