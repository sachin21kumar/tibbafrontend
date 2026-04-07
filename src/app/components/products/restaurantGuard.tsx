"use client";

import { useState } from "react";
import { setOrderType } from "../redux/slices/orderSlice";
import { useAppDispatch } from "../redux/hook";
import { useGetLocationByIdQuery } from "../redux/query/locationsQuery/location.query";
import Image from "next/image";
import { useTranslations } from "@/i18n/TranslationProvider";

export const RestaurantCard = ({ order }) => {
  const { locale, t } = useTranslations();

  const locationId = order?.location?._id;
  const { data: location } = useGetLocationByIdQuery(locationId, {
    skip: !locationId,
  });

  const dispatch = useAppDispatch();
  const [selectedOption, setSelectedOption] = useState<"delivery" | "pickup">(
    "delivery",
  );

  return (
    <div className="flex flex-col xl:flex-row gap-5 rounded-lg overflow-hidden my-6 mx-4 font-semibold">
      <div className="relative w-full xl:w-auto">
        <div className="relative w-full xl:w-[868px] h-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/uploads/products/${location?.imagePath}`}
            alt="Restaurant Food"
            width={868}
            height={395}
            priority
            sizes="(max-width: 768px) 100vw, 868px"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <div>
          <h2 className="text-[20px] sm:text-[22px] xl:text-[24px] text-[#AD5727]">
            {location?.name}
          </h2>

          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <p className="text-sm mt-1 !font-[system-ui] text-[#AD5727]">
              {location?.area} {location?.location}
            </p>
          </div>
        </div>

        <div className="border border-[#56381D] p-3 rounded-lg bg-gray-50">
          <div className="flex gap-2 sm:gap-3 flex-nowrap mb-2">
            <button
              className={`px-3 py-1.5 text-xs sm:text-sm xl:px-4 xl:py-2 xl:text-base
      rounded-full font-semibold transition cursor-pointer whitespace-nowrap
      ${
        selectedOption === "delivery"
          ? "bg-[#AD5727] text-white"
          : "bg-white border border-[#56381D] text-[#AD5727] hover:bg-gray-100"
      }`}
              onClick={() => {
                setSelectedOption("delivery");
                dispatch(setOrderType("delivery"));
              }}
            >
              {t("onlineordering.delivery")}
            </button>

            <button
              className={`px-3 py-1.5 text-xs sm:text-sm xl:px-4 xl:py-2 xl:text-base
      rounded-full font-semibold transition cursor-pointer whitespace-nowrap
      ${
        selectedOption === "pickup"
          ? "bg-[#AD5727] text-white"
          : "bg-white border border-[#56381D] text-[#AD57227] hover:bg-gray-100"
      }`}
              onClick={() => {
                setSelectedOption("pickup");
                dispatch(setOrderType("pickup"));
              }}
            >
              {t("onlineordering.pickup")}
            </button>
          </div>

          {selectedOption === "delivery" ? (
            <div>
              <p className="text-xs sm:text-sm xl:text-sm text-[#AD5727] !font-[system-ui]">
                Delivery fee: د.إ 3 (Free delivery on orders over د.إ 100)
              </p>
            </div>
          ) : (
            <p className="text-xs sm:text-sm xl:text-sm text-[#AD5727] !font-[system-ui]">
              {t("onlineordering.available")}
            </p>
          )}
        </div>

        {/* <div className="py-2">
          <Image
            src="/offFrame.png"
            alt="Off Frame"
            width={491}
            height={110}
            className="w-auto sm:w-[300px] h-[210px] object-contain"
          />
        </div> */}
      </div>
    </div>
  );
};
