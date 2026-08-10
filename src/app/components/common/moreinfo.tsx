"use client";

import { FaMapMarkerAlt, FaClock, FaPhoneAlt } from "react-icons/fa";
import { useGetLocationByIdQuery } from "../redux/query/locationsQuery/location.query";
import Cookies from "js-cookie";
import { useTranslations } from "@/i18n/TranslationProvider";

export default function MoreInfo() {
  const { t } = useTranslations();
  const locationId = Cookies.get("selectedLocationId");

  const { data: location, isLoading } = useGetLocationByIdQuery(locationId, {
    skip: !locationId,
  });
  return (
    <div className="hidden md:flex justify-center items-center text-white/80 text-[13px] tracking-wide ">
      <div className="flex items-center gap-2 w-[685px] py-2">
        <div className="flex items-center gap-2 hover:text-[#d1a054] transition">
          <FaMapMarkerAlt className="text-[#d1a054]" size={12} />
          <span>{t("moreInfo.mainBranch")}</span>
        </div>

        <div className="w-px h-4 bg-white/20" />

        <div className="flex items-center gap-2 hover:text-[#d1a054] transition">
          <FaClock className="text-[#d1a054]" size={12} />
          <span>
            {t("moreInfo.openDaily")}{" "}
            {locationId ? location?.operation_hours : t("moreInfo.defaultHours")}
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
