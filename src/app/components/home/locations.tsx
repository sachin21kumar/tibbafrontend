"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import { useGetLocationsQuery } from "../redux/query/locationsQuery/location.query";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

const FitBounds = ({ locations }: any) => {
  const map = useMap();

  useEffect(() => {
    if (!locations || locations.length === 0) return;

    const bounds = L.latLngBounds(
      locations.map((loc: any) => [loc.lat, loc.lng]),
    );

    map.fitBounds(bounds, { padding: [50, 50] });
  }, [locations, map]);

  return null;
};

const openLocation = (lat: number, lng: number) => {
  if (typeof window === "undefined") return;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const url = isMobile
    ? `geo:${lat},${lng}?q=${lat},${lng}` 
    : `https://www.google.com/maps?q=${lat},${lng}`; 

  window.open(url, "_blank");
};

export const Location = () => {
  const { data: locations, isLoading } = useGetLocationsQuery();

  if (isLoading) {
    return (
      <div className="w-full h-[45vh] flex items-center justify-center text-[#7a4a2e]">
        Loading map...
      </div>
    );
  }

  if (!locations || locations.length === 0) {
    return (
      <div className="w-full h-[45vh] flex items-center justify-center text-[#7a4a2e]">
        Location map not available
      </div>
    );
  }

  const validLocations = locations.filter(
    (loc: any) =>
      loc.lat !== undefined &&
      loc.lng !== undefined &&
      !isNaN(loc.lat) &&
      !isNaN(loc.lng),
  );

  if (validLocations.length === 0) {
    return (
      <div className="w-full h-[45vh] flex items-center justify-center text-[#7a4a2e]">
        No valid locations to display
      </div>
    );
  }

  const genericCenter: LatLngExpression = [0, 0];

  return (
    <div className="w-full h-[45vh] rounded-xl overflow-hidden">
      <MapContainer
        {...({
          center: genericCenter,
          zoom: 2,
          scrollWheelZoom: false,
          className: "w-full h-full z-0",
        } as any)}
      >
        <TileLayer
          {...({
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          } as any)}
        />

        {validLocations.map((loc: any, i: number) => (
          <Marker
            key={i}
            position={[loc.lat, loc.lng]}
            eventHandlers={{
              click: () => openLocation(loc.lat, loc.lng),
            }}
          ></Marker>
        ))}

        <FitBounds locations={validLocations} />
      </MapContainer>
    </div>
  );
};
