"use client"

import { useEffect } from "react";
import { Banner } from "./banner";
import { BestSeller } from "./bestSeller";
import { FreeDelivery } from "./delivery";
import { DeliveryService } from "./deliveryService";
import { LatestNews } from "./latestNews";

const Location = dynamic(
  () => import("./locations").then((mod) => mod.Location),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[45vh] flex items-center justify-center text-gray-500">
        Loading map...
      </div>
    ),
  }
);
import MenuSection from "./menuSection";
import ImageSlider from "./slider";
import Testimonials from "./testimonial";
import dynamic from "next/dynamic";

export default function Hero() {
  useEffect(() => {
  document.documentElement.style.overflowX = "hidden";
  return () => {
    document.documentElement.style.overflowX = "";
  };
}, []);

  return (
    <div>
      <Banner />
      <DeliveryService />
      <ImageSlider />
      <MenuSection />
      <FreeDelivery />
      <BestSeller/>
      <LatestNews/>
      <Testimonials/>

      <Location/>
    </div>
  );
}
