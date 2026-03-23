"use client";

import { useRouter } from "next/navigation";
import { MapPin, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useGetLocationsQuery } from "../redux/query/locationsQuery/location.query";
import { useAppDispatch } from "../redux/hook";
import { setLocation } from "../redux/slices/orderSlice";
import { useTranslations } from "@/i18n/TranslationProvider";
import { toast } from "react-toastify";

export default function SelectLocationPage() {
  const { t, locale } = useTranslations();
  const { data }: any = useGetLocationsQuery();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const savedLocation = Cookies.get("selectedLocationId");
    if (savedLocation) {
      setSelectedLocationId(savedLocation);
    }
  }, []);

  const isRestaurantOpen = (hours: string) => {
    if (!hours) return false;

    try {
      const [start, end] = hours.split(" - ").map((item) => item.trim());
      if (!start || !end) return false;

      const now = new Date();

      const parseTime = (timeStr: string) => {
        const normalized = timeStr.trim().toLowerCase();

        const match = normalized.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/);
        if (!match) {
          throw new Error("Invalid time format");
        }

        let h = Number(match[1]);
        const m = Number(match[2] || "0");
        const modifier = match[3];

        if (modifier === "pm" && h !== 12) h += 12;
        if (modifier === "am" && h === 12) h = 0;

        const d = new Date();
        d.setHours(h, m, 0, 0);
        return d;
      };

      const startTime = parseTime(start);
      const endTime = parseTime(end);

      if (startTime.getTime() === endTime.getTime()) {
        return true;
      }

      if (endTime < startTime) {
        return now >= startTime || now <= endTime;
      }

      return now >= startTime && now <= endTime;
    } catch {
      return false;
    }
  };

  const handleSelectLocation = (loc: any) => {
    const isOpen = isRestaurantOpen(loc.operation_hours);

    if (loc.slug === "abu-hail") {
      window.location.href = "https://order.tmbill.com/outlet/18013362821313";
      return;
    }

    if (loc.slug === "deira") {
      window.location.href = "https://order.tmbill.com/outlet/18013362479764";
      return;
    }
    if (!isOpen) {
      toast.warn(
        `Restaurant is currently closed. Opening hours: ${loc.operation_hours}`,
      );
      return;
    }
    Cookies.set("selectedLocationId", loc._id, { expires: 7 });
    setSelectedLocationId(loc._id);

    dispatch(setLocation(loc));

    router.push(`/${locale}/onlineordering`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-[#d1a054]">
            {t("selectLocation.chooserestaurant")}
          </h1>
          <span className="text-sm text-[#7A4A2E] mt-1">
            {t("selectLocation.nearestoutlet")}
          </span>
        </div>

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

                <ChevronRight className="w-5 h-5 text-[#d1a054]" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
