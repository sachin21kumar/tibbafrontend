"use client";

import { useRouter } from "next/navigation";
import { MapPin, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useGetLocationsQuery } from "../redux/query/locationsQuery/location.query";
import { useAppDispatch } from "../redux/hook";
import { setLocation } from "../redux/slices/orderSlice";

export default function SelectLocationPage() {
  const { data }: any = useGetLocationsQuery();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

  // Load selected location from cookie on mount
  useEffect(() => {
    const savedLocation = Cookies.get("selectedLocationId");
    if (savedLocation) {
      setSelectedLocationId(savedLocation);
    }
  }, []);

  const handleSelectLocation = (loc: any) => {
    // Save selection in cookie (expires in 7 days)
    Cookies.set("selectedLocationId", loc._id, { expires: 7 });
    setSelectedLocationId(loc._id);

    // Update redux state
    dispatch(setLocation(loc));

    // Navigate to menu page
    router.push("/onlineordering");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-[#d1a054]">
            Choose a Restaurant Location
          </h1>
          <span className="text-sm text-[#7A4A2E] mt-1">
            Select the nearest outlet to view the menu
          </span>
        </div>

        {/* Locations List */}
        <div className="space-y-3">
          {data?.map((loc: any) => {
            const isSelected = loc._id === selectedLocationId;

            return (
              <button
                key={loc._id}
                onClick={() => handleSelectLocation(loc)}
                className={`
                  w-full flex items-center justify-between
                  bg-white border rounded-xl px-4 py-4 text-left
                  hover:border-[#d1a054] hover:shadow-sm
                  transition-all cursor-pointer group
                  ${isSelected ? "border-[#d1a054] shadow-md bg-[#fff7eb]" : "border-[#e1d4c3]"}
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#d1a054]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#d1a054]" />
                  </div>

                  <div>
                    <h3 className="font-medium text-[#7A4A2E]">{loc.name}</h3>
                    {loc.area && (
                      <span className="text-xs text-[#5C3A26]">{loc.area}</span>
                    )}
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-[#d1a054] group-hover:text-[#d1a054]" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
