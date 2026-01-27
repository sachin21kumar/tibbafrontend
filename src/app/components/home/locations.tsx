"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { useGetLocationsQuery } from "../redux/query/locationsQuery/location.query";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

const FitBounds = ({ locations }: any) => {
  const map = useMap();

  if (locations.length > 0) {
    const bounds = L.latLngBounds(
      locations.map((loc) => [loc.lat, loc.lng] as [number, number])
    );
    map.fitBounds(bounds, { padding: [50, 50] });
  }

  return null;
};

export const Location = () => {
  const { data: locations } = useGetLocationsQuery();

  if (!locations || locations.length === 0) {
    return (
      <div className="w-full h-[45vh] flex items-center justify-center text-[#7a4a2e]">
        Location map not available
      </div>
    );
  }

  const validLocations = locations.filter(
    (loc): loc is any =>
      loc.lat !== undefined && loc.lng !== undefined
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
    <div className="w-full h-[45vh]">
      <MapContainer
        {...({ center: genericCenter, zoom: 2, scrollWheelZoom: false, className: "w-full h-full" } as any)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {validLocations.map((loc, i) => (
          <Marker key={i} position={[loc.lat, loc.lng]} />
        ))}
        <FitBounds locations={validLocations} />
      </MapContainer>
    </div>
  );
};
