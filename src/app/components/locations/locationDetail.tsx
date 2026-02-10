"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { useParams } from "next/navigation";
import { useGetLocationByIdQuery } from "../redux/query/locationsQuery/location.query";
import LocationForm from "./locationForm";
import LocationsGrid from "./locationsGrid";
import Image from "next/image";

const openingHours = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

const FitBounds = ({
  locations,
}: {
  locations: { lat: number; lng: number }[];
}) => {
  const map = useMap();
  if (locations.length > 0) {
    const bounds = L.latLngBounds(
      locations.map((loc) => [loc.lat, loc.lng] as [number, number]),
    );
    map.fitBounds(bounds, { padding: [50, 50] });
  }
  return null;
};

export default function LocationDetails({ id }: any) {
  const { data: location, isLoading } = useGetLocationByIdQuery(id, {
    skip: !id,
  });

  if (isLoading) return <div className="py-20 text-center">Loading...</div>;

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const validLocation =
    location?.lat !== undefined && location?.lng !== undefined
      ? [{ lat: location.lat, lng: location.lng }]
      : [];

  return (
    <>
      <div className="relative w-full h-64 sm:h-80 md:h-100 flex items-center justify-center px-4 overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${location?.imagePath}`}
          alt="Location Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <h1 className="relative z-10 text-white text-2xl sm:text-3xl md:text-5xl font-cinzel bg-white/10 border border-white/32 backdrop-blur-[20px] px-4 sm:px-6 py-3 sm:py-4">
          Open until {location?.operation_hours?.slice(7)}
        </h1>
      </div>

      <section className="bg-white ">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-16 gap-7 items-start ">
            <div className="lg:col-span-2 space-y-8 xl:py-20 py-10">
              <div className="w-fit">
                <h1 className="md:text-4xl text-[28px] tracking-wide text-[#d1a054] pb-2 w-fit">
                  {location?.name}
                </h1>
                <div className="h-px mx-auto bg-gradient-to-l from-transparent to-[#d1a054]" />
              </div>

              <p className="text-[#7a4a2e] !font-[system-ui] leading-relaxed">
                {location?.description}
              </p>

              <div className="flex items-center gap-4">
                <div className="min-w-[40px] h-[40px] rounded-[63%_37%_30%_70%_/_50%_45%_55%_50%] bg-[#d1a054] text-white flex items-center justify-center text-[14px]">
                  <Image
                    src="/locationtrans.png"
                    alt="Location Icon"
                    width={14}
                    height={14}
                  />
                </div>
                <span className="text-[#7a4a2e]">{location?.location}</span>
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
                <span className="text-[#7a4a2e] font-medium">
                  <a href={`tel:${location.mobileNumber}`}>
                    {location.mobileNumber}
                  </a>
                </span>
              </div>
            </div>

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
                      className={`flex justify-between py-3 px-3 text-[#7a4a2e] ${
                        isToday
                          ? "border-b border-t border-[#d1a054] text-[#d1a054]"
                          : ""
                      }`}
                    >
                      <span className="font-medium text-[14px]">{day}</span>
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

        <LocationForm />
        <LocationsGrid />

        <div className="mt-15">
          <div className="w-full xl:h-[364px] h-[329px] overflow-hidden border border-[#d1a054]">
            {validLocation.length > 0 ? (
              <MapContainer
                {...({
                  center: [
                    validLocation[0].lat,
                    validLocation[0].lng,
                  ] as LatLngExpression,
                  zoom: 19,
                  scrollWheelZoom: false,
                  className: "w-full h-full",
                } as any)}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[validLocation[0].lat, validLocation[0].lng]}
                ></Marker>
                <FitBounds locations={validLocation} />
              </MapContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#7a4a2e]">
                Location map not available
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
