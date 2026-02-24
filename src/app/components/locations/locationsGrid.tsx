"use client";
import Image from "next/image";
import { useGetLocationsQuery } from "../redux/query/locationsQuery/location.query";
import { useRouter } from "next/navigation";
import { useTranslations } from "@/i18n/TranslationProvider";

interface Location {
  _id: string;
  name: string;
  area?: string;
  description?: string;
  location?: string;
  operation_hours?: string;
  branchEmail?: string;
  telephone?: string;
  mobileNumber?: string;
  imagePath?: string;
}
export default function LocationsGrid() {
  const { data: locations }: any = useGetLocationsQuery();
  const router = useRouter();
  const { t, locale } = useTranslations();

  return (
    <section className="bg-white ">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {locations?.map((loc: Location) => (
            <div
              key={loc._id}
              className="bg-[#f8f8f8] rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative md:h-64 w-full">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${loc.imagePath}`}
                  alt={loc.name}
                  sizes="100vw"
                  className="object-cover h-full"
                />
              </div>
              <div className="md:p-8 p-4 space-y-6 cursor-pointer">
                <h3
                  className="md:text-[20px] text-[16px] text-[#7a4a2e] leading-snug"
                  onClick={() =>
                    router.push(`/${locale}/locations/${loc?._id}`)
                  }
                >
                  {loc.name}
                </h3>

                <div className="flex items-start gap-3 text-[#7a4a2e]">
                  <Image
                    src="/location.png"
                    alt="Location"
                    width={14}
                    height={14}
                  />
                  <span>{loc.location}</span>
                </div>

                <div className="flex items-center gap-3 text-[#7a4a2e]">
                  <Image
                    src="/phoneIcon.png"
                    alt="Phone"
                    width={14}
                    height={14}
                  />
                  <a href={`tel:${loc.mobileNumber}`}>{loc.mobileNumber}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
