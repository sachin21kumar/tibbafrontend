"use client"

import { useEffect } from "react";
import { Banner } from "./banner";
import { BestSeller } from "./bestSeller";
import { FreeDelivery } from "./delivery";
import { DeliveryService } from "./deliveryService";
import { LatestNews } from "./latestNews";
import { Location } from "./locations";
import MenuSection from "./menuSection";
import ImageSlider from "./slider";
import Testimonials from "./testimonial";

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
