import { Suspense } from "react";
import { Metadata } from "next";
import Hero from "../components/home/home";
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
