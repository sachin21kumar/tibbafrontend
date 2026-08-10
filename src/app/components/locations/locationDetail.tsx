"use client";

import dynamic from "next/dynamic";
import type { LatLngExpression } from "leaflet";
import type { Location } from "../redux/query/locationsQuery/location.query";
import LocationForm from "./locationForm";
import LocationsGrid from "./locationsGrid";
import Image from "next/image";
import { Mail } from "lucide-react";
import { useTranslations } from "@/i18n/TranslationProvider";

const MapLoading = () => {
  const { t } = useTranslations();
  return (
    <div className="w-full h-full flex items-center justify-center text-[#7a4a2e]">
      {t("map.loading")}
    </div>
  );
};

const LocationDetailMap = dynamic(() => import("./locationDetailMap"), {
  ssr: false,
  loading: () => <MapLoading />,
});

const openLocation = (lat: number, lng: number, googleLink?: string) => {
  if (typeof window === "undefined") return;

  if (googleLink) {
    window.open(googleLink, "_blank");
    return;
  }

  const ua = navigator.userAgent;
  let url = "";

  if (/iPhone|iPad|iPod/i.test(ua)) {
    url = `https://maps.apple.com/?daddr=${lat},${lng}`;
  } else if (/Android/i.test(ua)) {
    url = `geo:${lat},${lng}?q=${lat},${lng}`;
  } else {
    url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }

  window.open(url, "_blank");
};

export default function LocationDetails({ location }: { location: Location }) {
  const { t } = useTranslations();
  const openingHours = [
    t("locationdetail.monday"),
    t("locationdetail.tuesday"),
    t("locationdetail.wednesday"),
    t("locationdetail.thursday"),
    t("locationdetail.friday"),
    t("locationdetail.saturday"),
    t("locationdetail.sunday"),
  ];

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const validLocation =
    location?.lat !== undefined && location?.lng !== undefined
      ? [{ lat: Number(location.lat), lng: Number(location.lng) }]
      : [];

  const genericCenter: LatLngExpression =
    validLocation.length > 0
      ? [validLocation[0].lat, validLocation[0].lng]
      : [25.2048, 55.2708];
  return (
    <>
      <div className="relative w-full h-64 sm:h-80 md:h-100 flex items-center justify-center px-4 overflow-hidden">
        <Image
          src={
            location.imagePath
              ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${location.imagePath}`
              : "https://tibba.ae/logo.png"
          }
          alt="Location Banner"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />

        <h1 className="relative z-10 text-white text-2xl sm:text-3xl md:text-5xl font-cinzel bg-white/10 border border-white/32 backdrop-blur-[20px] px-4 sm:px-6 py-3 sm:py-4">
          {t("locationdetail.openUntil")} {location.operation_hours?.slice(7)}
        </h1>
      </div>

      <section className="font-semibold">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-16 gap-7 items-start ">
            <div className="lg:col-span-2 space-y-8 xl:py-20 py-10">
              <div className="w-fit">
                <h1 className="md:text-4xl text-[28px] tracking-wide text-[#AD5727] pb-2 w-fit">
                  {location?.name}
                </h1>
                <div className="h-px mx-auto bg-gradient-to-l from-transparent to-[#AD5727]" />
              </div>

              <p className="text-[#AD5727] !font-[system-ui] leading-relaxed">
                {location?.description}
              </p>

              <div
                className="flex items-center gap-4 cursor-pointer w-fit"
                onClick={() =>
                  openLocation(
                    location.lat,
                    location.lng,
                    location?.googleLink,
                  )
                }
              >
                <div className="min-w-[40px] h-[40px] rounded-[63%_37%_30%_70%_/_50%_45%_55%_50%] bg-[#d1a054] text-white flex items-center justify-center text-[14px]">
                  <Image
                    src="/locationtrans.png"
                    alt="Location Icon"
                    width={14}
                    height={14}
                  />
                </div>
                <span className="text-[#AD5727] hover:underline">
                  {location?.location}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="min-w-[40px] h-[40px] rounded-[63%_37%_30%_70%_/_50%_45%_55%_50%] bg-[#d1a054] text-white flex items-center justify-center text-[14px]">
                  <Image
                    src="/phonetrans.png"
                    alt="Phone Icon"
                    width={14}
                    height={14}
                  />
                </div>
                <span className="text-[#AD5727] font-semibold">
                  <a href={`tel:${location.mobileNumber}`}>
                    {location.mobileNumber}
                  </a>
                </span>
              </div>

              {location?.branchEmail && (
                <div className="flex items-center gap-4">
                  <div className="min-w-[40px] h-[40px] rounded-[63%_37%_30%_70%_/_50%_45%_55%_50%] bg-[#d1a054] text-white flex items-center justify-center text-[14px]">
                    <Mail size={14} />
                  </div>
                  <span className="text-[#AD5727] font-semibold">
                    <a href={`mailto:${location.branchEmail}`}>
                      {location.branchEmail}
                    </a>
                  </span>
                </div>
              )}
            </div>

            <div className="bg-white shadow-xl border border-[#f8f8f8] md:p-8 font-semibold">
              <div className="flex items-center justify-center">
                <h3 className="border-b border-b-[#d1a054] text-[#d1a054] font-[allura] text-[32px] pb-1 w-fit mb-6">
                  {t("locationdetail.opening_hours")}
                </h3>
              </div>

              <ul>
                {openingHours.map((day) => {
                  const isToday = day === today;
                  return (
                    <li
                      key={day}
                      className={`flex justify-between py-3 px-3 text-[#AD5727] font-bold ${
                        isToday
                          ? "border-b border-t border-[#d1a054] text-[#d1a054]"
                          : ""
                      }`}
                    >
                      <span className=" text-[14px]">{day}</span>
                      <span className={isToday ? "text-[#d1a054]" : ""}>
                        {location?.operation_hours ||
                          t("locationdetail.defaultHours")}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* <LocationForm /> */}
        <LocationsGrid />

        <div className="mt-15">
          <div className="w-full xl:h-[364px] h-[329px] overflow-hidden border border-[#d1a054]">
            {validLocation.length > 0 ? (
              <LocationDetailMap
                validLocation={validLocation}
                genericCenter={genericCenter}
                googleLink={location?.googleLink}
                onMarkerClick={openLocation}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#7a4a2e]">
                {t("map.notAvailable")}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
