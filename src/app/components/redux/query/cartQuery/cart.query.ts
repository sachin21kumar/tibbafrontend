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
  locationId?: string;
}

export interface CartResponse {
  _id: string;
  items: CartItem[];
  totalPrice: number;
  locationId: string;
  subtotal?: number;
  deliveryFee?: number;
  discount?: number;
  specialInstructions?: string;
}

const getLocale = () => {
  if (typeof window === "undefined") return "en";

  const path = window.location.pathname.split("/");
  const lang = path[1];

  if (lang === "ar" || lang === "en") return lang;
  return "en";
};

const recalcTotals = (draft: CartResponse) => {
  const subtotal =
    draft.items?.reduce(
      (sum, i) => sum + (i.productId.price ?? 0) * i.quantity,
      0,
    ) ?? 0;

  const deliveryFee = subtotal > 0 && subtotal < 100 ? 3 : 0;
  const discount = subtotal * 0.25;
  const totalPrice = subtotal - discount + deliveryFee;

  draft.subtotal = subtotal;
  draft.deliveryFee = deliveryFee;
  draft.discount = discount;
  draft.totalPrice = totalPrice;
};

export const cartApi = createApi({
  reducerPath: "cartApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",

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
              (i) => i?.productId?._id === productId,
            );

            if (existing) {
              existing.quantity += quantity;
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
            }

            recalcTotals(draft);
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
      {
        productId?: string;
        quantity?: number;
        locationId: string;
        specialInstructions?: string;
      }
    >({
      query: ({ locationId, ...body }) => ({
        url: "cart/update",
        method: "POST",
        body: { ...body, locationId },
      }),

      async onQueryStarted(
        { productId, quantity, locationId, specialInstructions },
        { dispatch, queryFulfilled },
      ) {
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", locationId, (draft) => {
            // ✅ Update special instructions
            if (specialInstructions !== undefined) {
              draft.specialInstructions = specialInstructions;
            }

            // ✅ Update item quantity if provided
            if (productId && quantity !== undefined) {
              const item = draft.items.find(
                (i) => i.productId._id === productId,
              );

              if (item) {
                item.quantity = quantity;

                if (item.quantity <= 0) {
                  draft.items = draft.items.filter(
                    (i) => i.productId._id !== productId,
                  );
                }
              }
            }

            recalcTotals(draft);
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
      query: ({ productId, locationId }) => ({
        url: "cart/remove",
        method: "DELETE",
        body: { productId, locationId },
      }),

      async onQueryStarted(
        { productId, locationId },
        { dispatch, queryFulfilled },
      ) {
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", locationId, (draft) => {
            draft.items = draft.items.filter(
              (i) => i.productId._id !== productId,
            );

            recalcTotals(draft);
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
      query: ({ locationId }) => ({
        url: "cart/clear",
        method: "DELETE",
        body: { locationId },
      }),

      async onQueryStarted({ locationId }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", locationId, (draft) => {
            draft.items = [];
            draft.subtotal = 0;
            draft.deliveryFee = 0;
            draft.discount = 0;
            draft.totalPrice = 0;
            draft.specialInstructions = "";
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
