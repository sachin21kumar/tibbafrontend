"use client";

import { useState } from "react";
import { setOrderType } from "../redux/slices/orderSlice";
import { useAppDispatch } from "../redux/hook";
import { useGetLocationByIdQuery } from "../redux/query/locationsQuery/location.query";
import Image from "next/image";

export const RestaurantCard = ({ order }) => {
  const locationId = order?.location?._id;
  const { data: location, isLoading } = useGetLocationByIdQuery(locationId, {
    skip: !locationId, // skip the query if id is undefined
  });
  const dispatch = useAppDispatch();
  const [selectedOption, setSelectedOption] = useState<"delivery" | "pickup">(
    "delivery"
  );
  return (
    <div className="flex flex-col xl:flex-row gap-5 rounded-lg overflow-hidden my-6 mx-4">
      <div className="relative w-full xl:w-auto">
        <div className="relative w-full xl:w-[868px] h-48 sm:h-64 xl:h-[395px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${location?.imagePath}`}
            alt="Restaurant Food"
            // fill
            width={100}
            height={100}
            unoptimized
            className="w-full xl:w-[868px] h-48 sm:h-64 xl:h-[395px] object-cover"
          />
        </div>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div>
          <h2 className="text-[20px] sm:text-[22px] xl:text-[24px]">
            {location?.name}
          </h2>

          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <p className="text-gray-600 text-sm mt-1 !font-[system-ui]">
              {location?.area} {location?.location}
            </p>
          </div>
        </div>

        <div className="border border-gray-200 p-3 rounded-lg bg-gray-50">
          <div className="flex gap-2 sm:gap-3 flex-nowrap mb-2">
            <button
              className={`px-3 py-1.5 text-xs sm:text-sm xl:px-4 xl:py-2 xl:text-base
      rounded-full font-semibold transition cursor-pointer whitespace-nowrap
      ${
        selectedOption === "delivery"
          ? "bg-[#D1A054] text-white hover:bg-[#b9893f]"
          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
      }`}
              onClick={() => {
                setSelectedOption("delivery");
                dispatch(setOrderType("delivery"));
              }}
            >
              Delivery
            </button>

            <button
              className={`px-3 py-1.5 text-xs sm:text-sm xl:px-4 xl:py-2 xl:text-base
      rounded-full font-semibold transition cursor-pointer whitespace-nowrap
      ${
        selectedOption === "pickup"
          ? "bg-[#D1A054] text-white hover:bg-[#b9893f]"
          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
      }`}
              onClick={() => {
                setSelectedOption("pickup");
                dispatch(setOrderType("pickup"));
              }}
            >
              Pickup - 10% off
            </button>
          </div>

          {selectedOption === "delivery" ? (
            <div>
              <p className="text-xs sm:text-sm xl:text-sm text-gray-500 !font-[system-ui]">
                Delivery fee (20 km):{" "}
                <span className="line-through">د.إ 11.00</span> FREE
              </p>

              <p className="text-xs sm:text-sm xl:text-sm font-semibold !font-[system-ui] text-white bg-[#D1A054] inline-block px-2 py-1 mt-1 rounded">
                Unlimited FREE delivery. Try it for free!
              </p>
            </div>
          ) : (
            <p className="text-xs sm:text-sm xl:text-sm text-gray-500 !font-[system-ui]">
              Pickup available - 10% off your order!
            </p>
          )}
        </div>

        <div className="py-2">
          <img src="/offFrame.png" className="w-full sm:w-auto" />
        </div>
      </div>
    </div>
  );
};
