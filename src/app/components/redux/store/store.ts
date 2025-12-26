import { configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "../query/categoryQuery/categoryQuery";
import { productApi } from "../query/productsQuery/productsQuery";
import { cartApi } from "../query/cartQuery/cart.query";
import { checkoutApi } from "../query/checkout/checkoutQuery";
import { locationsApi } from "../query/locationsQuery/location.query";
export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    [locationsApi.reducerPath]:locationsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryApi.middleware,
      productApi.middleware,
      cartApi.middleware,
      checkoutApi.middleware,
      locationsApi.middleware
    ),
});
