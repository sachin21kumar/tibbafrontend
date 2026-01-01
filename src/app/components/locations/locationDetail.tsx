"use client";

import { MapPin, Phone } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetLocationByIdQuery } from "../redux/query/locationsQuery/location.query";
import LocationForm from "./locationForm";
import LocationsGrid from "./locationsGrid";
import { Location } from "../home/locations";

const openingHours = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function LocationDetails() {
  const params = useParams();
  const id = params?.id as string;

  const { data: location, isLoading } = useGetLocationByIdQuery(id, {
    skip: !id,
  });

  if (isLoading) {
    return <div className="py-20 text-center">Loading...</div>;
  }
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });
  return (
    <>
      <div
        className="w-full h-64 sm:h-80 md:h-100 bg-cover bg-center flex items-center justify-center px-4"
        style={{
          backgroundImage: `url('/locationDetail.jpg')`,
        }}
      >
        <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-cinzel bg-white/10 border border-white/32 backdrop-blur-[20px] px-4 sm:px-6 py-3 sm:py-4">
          Closed until 9:00 am
        </h1>
      </div>

      <section className="bg-white ">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-16 gap-7 items-start ">
            {/* LEFT CONTENT */}
            <div className="lg:col-span-2 space-y-8 xl:py-20 py-10">
              <div className="w-fit">
                <h1 className="md:text-4xl text-[28px] tracking-wide text-[#1B2024] pb-2 w-fit text-gray-900">
                  {location?.name}
                </h1>
          <div className="h-px mx-auto bg-gradient-to-l from-transparent to-[#d1a054]" />


              </div>

              <h1 className="text-gray-600 font-[system-ui] leading-relaxed">
                {location?.description}
              </h1>

              {/* ADDRESS */}
              <div className="flex items-center gap-4">
                <div className="min-w-[40px] h-[40px] rounded-[63%_37%_30%_70%_/_50%_45%_55%_50%] bg-[#d1a054] text-white flex items-center justify-center text-[14px]">
                  <img src="/locationtrans.png" alt="Location Icon" />
                </div>
                <span className="text-gray-700">{location?.location}</span>
              </div>

              {/* PHONE */}
              <div className="flex items-center gap-4">
                <div className="min-w-[40px] h-[40px] rounded-[63%_37%_30%_70%_/_50%_45%_55%_50%] bg-[#d1a054] text-white flex items-center justify-center text-[14px]">
                  <img src={"/phonetrans.png"} alt="Phone Icon" />
                </div>
                <span className="text-gray-700 font-medium">
                  {location?.mobileNumber}
                </span>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="bg-white shadow-xl border border-[#f8f8f8] md:p-8">
              <div className="flex items-center justify-center">
                <h3 className="border-b border-b-[#d1a054] text-[#d1a054] font-[allura] text-[32px] pb-1 w-fit mb-6">
                  Opening Hours
                </h3>
              </div>

              <ul>
                {openingHours.map((day) => {
                  const isToday = day === today;

                  return (
                    <li
                      key={day}
                      className={`flex justify-between py-3 px-3 text-gray-700
          ${isToday ? "border-b border-t border-[#d1a054]" : ""}
        `}
                    >
                      <span className={`font-medium text-[14px]`}>{day}</span>

                      <span className={isToday ? "text-[#d1a054]" : "" }>
                        {location?.operation_hours || "8:00 am – 3:00 am"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <LocationForm />
        <LocationsGrid />
        <div className="mt-15">

        <Location/>
        </div>
      </section>
    </>
  );
}
