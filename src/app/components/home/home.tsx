"use client";

import { useEffect } from "react";
import { Banner } from "./banner";
import { FreeDelivery } from "./delivery";

const Location = dynamic(
  () => import("./locations").then((mod) => mod.Location),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[45vh] flex items-center justify-center text-[#7a4a2e]">
        Loading map...
      </div>
    ),
  },
);
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
      <div className="xl:py-25 py-20">
        <FreeDelivery />
      </div>
      <Location />
    </div>
  );
}
