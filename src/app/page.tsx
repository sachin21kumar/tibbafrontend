import { Suspense } from "react";
import MenuPage from "./components/products/getAllProducts";
import Hero from "./components/home/home";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home - Tibba Restaurant",
  description:
    "Tibba Restaurant Welcome to Tibba Restaurant, where authentic Yemeni flavors thrive. Enjoy a memorable dining experience and explore our menu. Our Menu Free Delivery on Order Over $59",
};
export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
