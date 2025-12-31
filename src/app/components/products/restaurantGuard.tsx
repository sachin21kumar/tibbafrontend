"use client";

import { useState } from "react";

export const RestaurantCard = () => {
  const [selectedOption, setSelectedOption] = useState<"delivery" | "pickup">(
    "delivery"
  );

  return (
    <div className="flex flex-col md:flex-row gap-5 rounded-lg overflow-hidden  my-6 mx-4">
      {/* Image Section */}
      <div className=" relative">
        <img
          src="https://f.nooncdn.com/food_production/food/restaurant/partner_38754/noonprofile_19Sep2024051303.jpeg?width=720&crop=720:328&form"
          alt="Restaurant Food"
          className="w-[868px] h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-gray-700 bg-opacity-70 text-white text-sm p-2 w-full">
          This outlet doesn't serve your area
        </div>
      </div>

      <div className="p-4 flex flex-col  gap-4">
        <div>
          <h2 className="text-[24px]">Tibba Restaurant for Mandi & Madhbi</h2>
          <div className="flex gap-5">
            <p className="text-gray-600 text-sm mt-1 !font-[system-ui]">
              Arabic, Mandi, Meat, Seafood, Sweets
            </p>
            <p className="text-sm mt-1 !font-[system-ui]">⭐ 4.3 (100+)</p>
            {/* <p className="text-sm mt-1 !font-[system-ui]">$$$$</p> */}
          </div>
        </div>
        <div className="border border-gray-200 p-3 rounded-lg bg-gray-50">
          <div className="flex gap-3 flex-wrap mb-2">
            <button
              className={`px-4 py-2 rounded-full font-semibold transition cursor-pointer ${
                selectedOption === "delivery"
                  ? "bg-[#D1A054] text-white hover:bg-[#b9893f]"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedOption("delivery")}
            >
              Delivery
            </button>
            <button
              className={`px-4 py-2 rounded-full font-semibold transition cursor-pointer ${
                selectedOption === "pickup"
                  ? "bg-[#D1A054] text-white hover:bg-[#b9893f]"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedOption("pickup")}
            >
              Pickup - 10% off
            </button>
          </div>

          {/* Info based on selection */}
          {selectedOption === "delivery" ? (
            <div>
              <p className="text-sm text-gray-500 !font-[system-ui]">
                Delivery fee (26 km):{" "}
                <span className="line-through">₨ 11.00</span> FREE
              </p>
              <p className="text-sm font-semibold !font-[system-ui] text-white bg-[#D1A054] inline-block px-2 py-1 mt-1 rounded">
                Unlimited FREE delivery. Try it for free!
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-500 !font-[system-ui]">
                Pickup available - 10% off your order!
              </p>
            </div>
          )}
        </div>
        <div className="py-2">
          <img src="/offFrame.png" />
        </div>
      </div>
    </div>
  );
};
