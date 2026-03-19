"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetLocationsQuery,
  useUpdateLocationMutation,
} from "../../redux/query/locationsQuery/location.query";

export default function LocationsAdmin() {
  const { data }: any = useGetLocationsQuery();
  const [updateLocation, { isLoading: isUpdating }] =
    useUpdateLocationMutation();

  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [openingHours, setOpeningHours] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = (location: any) => {
    setSelectedLocation(location);
    setOpeningHours(location.operation_hours || "");
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedLocation(null);
  };

  const handleUpdate = async () => {
    if (!selectedLocation) return;

    try {
      await updateLocation({
        id: selectedLocation._id,
        operation_hours: openingHours,
      }).unwrap();

      toast.success("Opening hours updated successfully.");
      handleClose();
    } catch {
      toast.error("Failed to update. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf8f3] p-8 font-semibold">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="border-b border-[#d1a054] pb-4 mb-8">
          <h1
            className="text-3xl font-semibold text-[#AD5727] tracking-wide"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Locations
          </h1>
          <p className="text-sm text-[#c4884a] mt-1 font-normal !font-[system-ui]">
            Manage branch opening hours
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-white border border-[#d1a054] rounded-xl shadow-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#d1a054] bg-[#fdf1e4]">
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-[#AD5727]">
                  Branch Name
                </th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-[#AD5727]">
                  Opening Hours
                </th>
                <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-[#AD5727]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((location: any, idx: number) => (
                <tr
                  key={location._id}
                  className={`border-b border-[#f0dfc4] transition-colors hover:bg-[#fdf8f3] ${
                    idx % 2 === 0 ? "bg-white" : "bg-[#fefcfa]"
                  }`}
                >
                  <td className="px-6 py-4 text-[#AD5727] font-semibold">
                    {location.name}
                  </td>
                  <td className="px-6 py-4 text-[#c4884a] font-normal font-[system-ui]">
                    {location.operation_hours || (
                      <span className="italic text-[#d1b08a]">Not set</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEdit(location)}
                      className="px-5 py-2 rounded-full border border-[#d1a054] text-sm font-semibold text-[#AD5727] bg-white transition hover:bg-[#d1a054] hover:text-white"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {!data?.length && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-12 text-center text-[#c4884a] font-normal italic"
                  >
                    No locations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <div className="bg-white border border-[#d1a054] rounded-xl shadow-2xl w-full max-w-md p-8">
            {/* Modal Header */}
            <div className="border-b border-[#d1a054] pb-4 mb-6">
              <h2
                className="text-xl font-semibold text-[#AD5727] tracking-wide"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Edit Opening Hours
              </h2>
              {selectedLocation && (
                <p className="text-sm text-[#c4884a] font-normal mt-1 !font-[system-ui]">
                  {selectedLocation.name}
                </p>
              )}
            </div>

            {/* Input */}
            <div className="mb-6">
              <label className="text-xs uppercase tracking-wider text-[#AD5727] mb-2 block">
                Opening Hours <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                className="w-full border-b border-[#d1a054] text-[#AD5727] focus:outline-none py-2 bg-transparent font-[system-ui] placeholder:text-[#d1b08a]"
                placeholder="e.g. 9:00 AM – 10:00 PM"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleClose}
                className="px-5 py-2 rounded-full border border-[#d1a054] text-sm font-semibold text-[#AD5727] bg-white transition hover:bg-[#fdf1e4]"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="px-5 py-2 rounded-full bg-[#d1a054] text-white text-sm font-semibold transition hover:opacity-90 disabled:opacity-60"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
