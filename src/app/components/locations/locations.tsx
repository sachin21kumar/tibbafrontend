"use client";
import dynamic from "next/dynamic";
import { useGetLocationsQuery } from "../redux/query/locationsQuery/location.query";
import Image from "next/image";
import { useTranslations } from "@/i18n/TranslationProvider";
const Location = dynamic(
  () => import("../home/locations").then((mod) => mod.Location),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[45vh] flex items-center justify-center text-gray-500">
        Loading map...
      </div>
    ),
  },
);
interface Location {
  id: number;
  name: string;
  address: string;
  phone: string;
  imageUrl: string;
}

export default function LocationCard() {
  const { locale, t } = useTranslations();

  const { data: locations } = useGetLocationsQuery();

  return (
    <>
      <div>
        <div className="relative w-full h-64 sm:h-80 md:h-100 flex items-center justify-center px-4 overflow-hidden">
          <Image
            src="/locations.webp"
            alt="Locations"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          <h1 className="relative z-10 text-white text-2xl sm:text-3xl md:text-5xl font-cinzel bg-white/10 border border-white/32 backdrop-blur-[20px] px-4 sm:px-6 py-3 sm:py-5 text-center">
            LOCATIONS
          </h1>
        </div>

        <div className="max-w-[1348px] mx-auto mt-10 space-y-10 p-3 font-semibold">
          {locations?.map((location: any) => (
            <div
              key={location._id}
              className="flex flex-col md:flex-row border border-gray-300 shadow-md rounded-lg overflow-hidden bg-white"
            >
              <div className="md:w-1/2 relative md:h-64 md:h-auto h-auto">
                <img
                  src={
                    location?.imagePath
                      ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/uploads/products/${location.imagePath}`
                      : "http://mtb.dgh.mybluehost.me/wp-content/uploads/2025/07/Abu-Hail-857x500.webp"
                  }
                  alt={location?.name}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="md:w-1/2 p-8  flex flex-col justify-center">
                <div className="w-fit">
                  <h2 className="text-[20px] md:text-3xl text-[#AD5727] font-regular md:mb-4">
                    {location.name}
                  </h2>
                  <div className="bg-gradient-to-r from-[#AD5727] to-[#AD5727]/0 ... h-[1px]"></div>
                </div>
                <div className="md:py-auto pt-5">
                  <div className="flex items-center gap-3 text-[#AD5727] mb-2 mt-3">
                    <Image
                      src="/location.png"
                      alt="Location"
                      width={14}
                      height={14}
                    />
                    <span>{location.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#AD5727] mb-4">
                    <Image
                      src="/phoneIcon.png"
                      alt="Phone"
                      width={14}
                      height={14}
                    />
                    <a href={`tel:${location.mobileNumber}`}>
                      {location.mobileNumber}
                    </a>
                  </div>
                </div>
                <a
                  href={`/${locale}/locations/${location._id}`}
                  className="mt-6 w-fit text-[#AD5727] font-regular hover:text-yellow-600"
                >
                  More Details
                </a>
                <div className="w-[108px] bg-gradient-to-r from-[#AD5727] to-[#AD5727]/0 ... h-[1px]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-15">
        <Location />
      </div>
    </>
  );
}
