"use client";
import dynamic from "next/dynamic";
import { useGetLocationsQuery } from "../redux/query/locationsQuery/location.query";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const { data: locations } = useGetLocationsQuery();

  return (
    <>
      <div>
        <div
          className="w-full h-64 sm:h-80 md:h-100 bg-cover bg-center flex items-center justify-center px-4"
          style={{
            backgroundImage: `url('/locations.webp')`,
          }}
        >
          <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-cinzel bg-white/10 border border-white/32 backdrop-blur-[20px] px-4 sm:px-6 py-3 sm:py-5 text-center">
            LOCATIONS
          </h1>
        </div>

        <div className="max-w-[1348px] mx-auto mt-10 space-y-10 p-3">
          {locations?.map((location: any) => (
            <div
              key={location._id}
              className="flex flex-col md:flex-row border border-gray-300 shadow-md rounded-lg overflow-hidden bg-white"
            >
              <div className="md:w-1/2 relative md:h-64 md:h-auto">
                <img
                  src={
                    `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${location.imagePath}` ||
                    "http://mtb.dgh.mybluehost.me/wp-content/uploads/2025/07/Abu-Hail-857x500.webp"
                  }
                  alt={location.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="md:w-1/2 p-8  flex flex-col justify-center">
                <div className="w-fit">
                  <h2 className="text-[20px] md:text-3xl text-[#d1a054] font-regular md:mb-4">
                    {location.name}
                  </h2>
                  <div className="bg-gradient-to-r from-[#D1A054] to-[#D1A054]/0 ... h-[1px]"></div>
                </div>
                <div className="md:py-auto pt-5">
                  <div className="flex items-center gap-3 text-[#7a4a2e] mb-2 mt-3">
                    <img src="/location.png" alt="Location Icon" />
                    <span>{location.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#7a4a2e] mb-4">
                    <img src="/phoneIcon.png" alt="Phone Icon" />
                    <a href={`tel:${location.mobileNumber}`}>
                      {location.mobileNumber}
                    </a>

                  </div>
                </div>
                <a
                  href={`/locations/${location._id}`}
                  className="mt-6 w-fit text-[#d1a054] font-regular hover:text-yellow-600"
                >
                  More Details
                </a>
                <div className="w-[108px] bg-gradient-to-r from-[#D1A054] to-[#D1A054]/0 ... h-[1px]"></div>
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
