"use client";

import { FaMapMarkerAlt, FaClock, FaPhoneAlt } from "react-icons/fa";
import { useGetLocationByIdQuery } from "../redux/query/locationsQuery/location.query";
import Cookies from "js-cookie";

export default function MoreInfo() {
  const locationId = Cookies.get("selectedLocationId");

  const { data: location, isLoading } = useGetLocationByIdQuery(locationId, {
    skip: !locationId,
  });
  return (
    <div className="hidden md:flex justify-center items-center text-white/80 text-[13px] tracking-wide ">
      <div className="flex items-center gap-8 py-2">
        <div className="flex items-center gap-2 hover:text-[#d1a054] transition">
          <FaMapMarkerAlt className="text-[#d1a054]" size={12} />
          <span>Main Branch, Dubai</span>
        </div>

        <div className="w-px h-4 bg-white/20" />

        <div className="flex items-center gap-2 hover:text-[#d1a054] transition">
          <FaClock className="text-[#d1a054]" size={12} />
          <span>
            Open Daily:{" "}
            {locationId ? location?.operation_hours : "11:00 AM – 12:00 PM"}
          </span>
        </div>

        <div className="w-px h-4 bg-white/20" />

        <div className="flex items-center gap-2 hover:text-[#d1a054] transition">
          <FaPhoneAlt className="text-[#d1a054]" size={12} />
          <a href="tel:+97142578585">+971 4 2578585</a>
        </div>
      </div>
    </div>
  );
}
