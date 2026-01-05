import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Location {
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface OrderState {
  orderType: "delivery" | "pickup" | null;
  location: Location | null;
}

const initialState: OrderState = {
  orderType: null,
  location: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderType(state, action: PayloadAction<"delivery" | "pickup">) {
      state.orderType = action.payload;
    },
    setLocation(state, action: PayloadAction<Location>) {
      state.location = action.payload;
    },
    clearOrder(state) {
      state.orderType = null;
      state.location = null;
    },
  },
});

export const { setOrderType, setLocation, clearOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
