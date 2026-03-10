"use client";

import { useRouter } from "next/navigation";
import { MapPin, ChevronRight } from "lucide-react";
import { useTranslations } from "@/i18n/TranslationProvider";
import { useGetLocationsQuery } from "../../redux/query/locationsQuery/location.query";

export default function AdminOrdersPage() {
  const { t, locale } = useTranslations();
  const { data }: any = useGetLocationsQuery();
  const router = useRouter();

  const handleSelectLocation = (loc: any) => {
    router.push(`/${locale}/admin/order/${loc._id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-[#d1a054]">
            Select Location to View Orders
          </h1>
        </div>

        <div className="space-y-3">
          {data?.map((loc: any) => {
            return (
              <button
                key={loc._id}
                onClick={() => handleSelectLocation(loc)}
                className={`
                  w-full flex items-center justify-between
                  bg-white border rounded-xl px-4 py-4 text-left
                  hover:border-[#d1a054] hover:shadow-sm
                  transition-all cursor-pointer group
                 }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#d1a054]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#d1a054]" />
                  </div>

                  <div>
                    <h3 className="font-medium text-[#7A4A2E]">{loc.name}</h3>
                    {loc.area && (
                      <span className="text-xs text-[#5C3A26]">{loc.area}</span>
                    )}
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-[#d1a054] group-hover:text-[#d1a054]" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
