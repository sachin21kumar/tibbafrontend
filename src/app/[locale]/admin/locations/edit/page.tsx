import LocationsAdmin from "@/app/components/admin/locations/getLocations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Locations | Tibba Admin",
  description: "Manage locations in Tibba admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LocationsAdminPage() {
  return <LocationsAdmin />;
}