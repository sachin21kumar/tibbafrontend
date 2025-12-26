"use client";

import { Provider } from "react-redux";
import { store } from "../components/redux/store/store";
import { StripeProvider } from "./striptProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <StripeProvider>
        <ToastContainer />
        {children}
      </StripeProvider>
    </Provider>
  );
}
