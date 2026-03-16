"use client";

import { useTranslations } from "@/i18n/TranslationProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar, FaUtensils, FaMosque, FaCar } from "react-icons/fa";

export const Banner = () => {
  const router = useRouter();
  const { t, locale } = useTranslations();
  const restaurantName = t("banner.name");

  return (
    <div className="relative">
      <section className="relative h-[calc(100vh-90px)] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/herro-slide-1.jpg.webp"
            alt="Restaurant Dish"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/40 z-10" />
        <div className="relative z-20 flex flex-col h-full items-center justify-center text-center text-white px-4 sm:px-6">
          <div>
            <div className="inline-block">
              <div className="mb-2 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent" />

              <h1 className="hero-title text-3xl sm:text-4xl md:text-6xl font-cinzel tracking-wide whitespace-normal sm:whitespace-nowrap">
                {t("banner.title")}
              </h1>

              <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>
            <div
              className="pt-6 sm:p-6 font-[system-ui] text-[15px] sm:text-base md:text-[20px] sm:max-w-[560px] mx-auto text-white/90 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: t("banner.description", { name: restaurantName }),
              }}
            />
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => router.push(`/${locale}/onlineordering`)}
                className="px-8 py-3 bg-gradient-to-t from-[#7a4a24] via-[#9C5F30] to-[#c07a3d] cursor-pointer shadow-lg hover:shadow-xl text-white font-semibold tracking-widest text-sm uppercase transition-all duration-300 rounded-sm"
              >
                {t("banner.order")}
              </button>
              <button
                onClick={() => router.push(`/${locale}/menu`)}
                className="px-8 py-3 border border-white cursor-pointer text-white font-semibold tracking-widest text-sm uppercase transition-all duration-300 rounded-sm"
              >
                {t("banner.viewmenu")}
              </button>
            </div>
            <div className="flex justify-center mt-7">
              <div className="inline-flex flex-col items-center w-fit">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d1a054] to-transparent mb-2" />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d1a054] to-transparent mt-2" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative z-30 -mt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-md shadow-2xl rounded-md py-6 px-6 border border-white/40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <FaStar className="text-[#d1a054]" size={20} />
              <p className="text-sm font-semibold text-gray-800 !font-[system-ui]">
                ⭐ 4.7 Google Rating
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FaUtensils className="text-[#d1a054]" size={20} />
              <p className="text-sm font-semibold text-gray-800 !font-[system-ui]">
                Signature: Mandi / Fahsa / Saltah
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FaMosque className="text-[#d1a054]" size={20} />
              <p className="text-sm font-semibold text-gray-800 !font-[system-ui]">
                100% Halal
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FaCar className="text-[#d1a054]" size={20} />
              <p className="text-sm font-semibold text-gray-800 !font-[system-ui]">
                Parking & Delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
