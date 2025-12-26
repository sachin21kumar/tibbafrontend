// components/LocationCard.tsx
"use client";
import Image from "next/image";
import { useGetLocationsQuery } from "../redux/query/locationsQuery/location.query";
import { CiLocationOn } from "react-icons/ci";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface Location {
  id: number;
  name: string;
  address: string;
  phone: string;
  imageUrl: string;
}

interface Props {
  location: Location;
}

export default function LocationCard() {
    const router=useRouter()
  const { data: locations } = useGetLocationsQuery();

  return (
    <>
      {locations?.map((location: any) => {
        return (
          <>
            <div className="max-w-[1348px]  mx-auto border border-gray-300 my-19 flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden">
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <img
                  src={
                    "http://mtb.dgh.mybluehost.me/wp-content/uploads/2025/07/Abu-Hail-857x500.webp"
                  }
                  alt={location.name}
                  className="object-cover h-full"
                />
              </div>

              {/* Details Section */}
              <div className="md:w-1/2 p-[32px] flex flex-col justify-center">
                <h2 className="text-[28px] border-b border-b-yellow-500  mb-2">
                  {location.name}
                </h2>
                <div className="flex items-center gap-4 py-3 text-gray-600 mb-1">
                  <CiLocationOn />

                  <span>{location.location}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <BsFillTelephoneFill />

                  <span>{location.telephone}</span>
                </div>
                <a
                  href={`/locations/${location?._id}`}
                  className="hover:text-yellow-600 border-b mt-10 w-fit border-b-yellow-600 font-medium"
                >
                  More Details
                </a>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
