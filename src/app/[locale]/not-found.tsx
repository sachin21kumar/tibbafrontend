"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaUtensils, FaArrowLeft } from "react-icons/fa";
import { useTranslations } from "@/i18n/TranslationProvider";
import { useChrome } from "@/app/common/ChromeContext";

export default function NotFound() {
  const { locale } = useTranslations();
  const { hideChrome, showChrome } = useChrome();

  useEffect(() => {
    hideChrome();
    return () => showChrome();
  }, [hideChrome, showChrome]);

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden bg-[#1a120a] flex items-center justify-center px-4 sm:px-6"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 20%, rgba(173,87,39,0.25), transparent 60%), url("/background.webp")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg py-16">
        <span className="flex items-center justify-center w-16 h-16 rounded-full border border-[#d1a054]/40 bg-white/5 backdrop-blur-sm mb-6">
          <FaUtensils className="text-[#d1a054]" size={22} />
        </span>

        <div className="inline-block">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d1a054] to-transparent" />
          <h1 className="hero-title font-cinzel text-7xl sm:text-9xl tracking-widest text-white text-shadow-gold py-2">
            404
          </h1>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d1a054] to-transparent" />
        </div>

        <span className="mt-7 font-cinzel text-2xl sm:text-3xl tracking-wide text-white">
          Page Not Found
        </span>
        <span className="mt-4 max-w-sm font-[system-ui] text-sm sm:text-[15px] text-white/60 leading-relaxed">
          This page isn&apos;t on our menu. It may have been moved, renamed,
          or no longer exists.
        </span>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={`/${locale}`}
            className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-t from-[#7a4a24] via-[#9C5F30] to-[#c07a3d] shadow-lg hover:shadow-[0_8px_30px_rgba(173,87,39,0.45)] text-white font-semibold tracking-widest text-sm uppercase transition-all duration-300 rounded-sm"
          >
            <FaArrowLeft
              className="transition-transform duration-300 group-hover:-translate-x-1"
              size={12}
            />
            Back to Home
          </Link>
          <Link
            href={`/${locale}/menu`}
            className="px-8 py-3 border border-white/70 hover:border-white hover:bg-white/10 text-white font-semibold tracking-widest text-sm uppercase transition-all duration-300 rounded-sm"
          >
            View Menu
          </Link>
        </div>
      </div>
    </main>
  );
}
