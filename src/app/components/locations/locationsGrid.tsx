"use client";

import { MapPin, Phone } from "lucide-react";
import { useGetLocationsQuery } from "../redux/query/locationsQuery/location.query";
import { useRouter } from "next/navigation";

interface Location {
  _id: string;
  name: string;
  area?: string;
  description?: string;
  location?: string;
  operation_hours?: string;
  branchEmail?: string;
  telephone?: string;
  mobileNumber?: string;
}
export default function LocationsGrid() {
  const { data: locations }:any = useGetLocationsQuery();
  const router = useRouter();
  return (
    <section className="bg-white ">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {locations?.map((loc: Location) => (
            <div
              key={loc._id}
              className="bg-[#f8f8f8] rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              {/* Image */}
              <div className="relative md:h-64 w-full">
                <img
                  src={
                    "http://mtb.dgh.mybluehost.me/wp-content/uploads/2025/07/Abu-Hail-754x500.webp"
                  }
                  alt={loc.name}
                  className="object-cover h-full"
                />
              </div>

              {/* Content */}
              <div className="md:p-8 p-4 space-y-6 cursor-pointer">
                <h3
                  className="md:text-[20px] text-[16px] text-gray-900 leading-snug"
                  onClick={() => router.push(`/locations/${loc?._id}`)}
                >
                  {loc.name}
                </h3>

                {/* Address */}
                <div className="flex items-start gap-3 text-gray-600">
                  <img src="/location.png"/>
                  <span>{loc.location}</span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 text-gray-600">
                  <img src="/phoneIcon.png"/>
                  <span>{loc.mobileNumber}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
