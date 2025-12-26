"use client";

import { MapPin, Phone } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetLocationByIdQuery } from "../redux/query/locationsQuery/location.query";
import LocationForm from "./locationForm";
import LocationsGrid from "./locationsGrid";

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
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="font-serif text-4xl tracking-wide border-b border-b-[#d1a054] pb-2 w-fit text-gray-900">
                {location?.name}
              </h1>
            </div>

            <h1 className="text-gray-600 font-[system-ui] leading-relaxed">
              {location?.description}
            </h1>

            {/* ADDRESS */}
            <div className="flex items-center gap-4">
              <div className="min-w-[40px] h-[40px] rounded-[63%_37%_30%_70%_/_50%_45%_55%_50%] bg-[#d1a054] text-white flex items-center justify-center text-[14px]">
                <MapPin size={18} />
              </div>
              <span className="text-gray-700">{location?.location}</span>
            </div>

            {/* PHONE */}
            <div className="flex items-center gap-4">
              <div className="min-w-[40px] h-[40px] rounded-[63%_37%_30%_70%_/_50%_45%_55%_50%] bg-[#d1a054] text-white flex items-center justify-center text-[14px]">
                <Phone size={18} />
              </div>
              <span className="text-gray-700 font-medium">
                {location?.mobileNumber}
              </span>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white shadow-xl border border-[#f8f8f8] p-8">
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
                    <span
                      className={`font-medium `}
                    >
                      {day}
                    </span>

                    <span className={isToday ? "text-[#d1a054]" : ""}>
                      {location?.operation_hours || "8:00 am – 3:00 am"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <LocationForm/>
      <LocationsGrid/>
    </section>
  );
}
