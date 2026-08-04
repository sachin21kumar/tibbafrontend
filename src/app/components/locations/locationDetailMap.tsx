"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
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

const RecenterMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();

  map.flyTo([lat, lng], 19, {
    animate: true,
    duration: 1.5,
  });

  return null;
};

export default function LocationDetailMap({
  validLocation,
  genericCenter,
  googleLink,
  onMarkerClick,
}: {
  validLocation: { lat: number; lng: number }[];
  genericCenter: LatLngExpression;
  googleLink?: string;
  onMarkerClick: (lat: number, lng: number, googleLink?: string) => void;
}) {
  return (
    <MapContainer
      {...({
        center: genericCenter,
        zoom: 19,
        scrollWheelZoom: false,
        className: "w-full h-full z-0",
      } as any)}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {validLocation.map((loc, i) => (
        <Marker
          key={i}
          position={[loc.lat, loc.lng]}
          eventHandlers={{
            click: () => onMarkerClick(loc.lat, loc.lng, googleLink),
          }}
        />
      ))}

      <RecenterMap lat={validLocation[0].lat} lng={validLocation[0].lng} />
      <FitBounds locations={validLocation} />
    </MapContainer>
  );
}
