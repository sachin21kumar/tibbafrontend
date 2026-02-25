"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "@/i18n/TranslationProvider";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useTranslations();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNewPath = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
  };
  const changeLanguage = (newLocale: string) => {
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;

    window.location.href = getNewPath(newLocale); // real page refresh
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-2
          cursor-pointer
          px-4 py-2
          border border-[#d1a054]
          text-[13px] font-medium tracking-wide
          text-[#2b2b2b]
          bg-white
          hover:bg-[#d1a054] hover:text-white
          transition-all duration-300
          rounded-sm
        "
      >
        <span>{locale === "en" ? "English" : "العربية"}</span>

        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white text-black shadow-lg cursor-pointer rounded-md overflow-hidden z-50">
          <button
            onClick={() => changeLanguage("en")}
            className={`block w-full text-left cursor-pointer px-4 py-2 text-sm ${
              locale === "en" ? "bg-[#56381D] text-white font-semibold" : ""
            }`}
          >
            English
          </button>


          <button
            onClick={() => changeLanguage("ar")}
            className={`block w-full text-left cursor-pointer px-4 py-2 text-sm ${
              locale === "ar" ? "bg-[#56381D] text-white font-semibold" : ""
            }`}
          >
            العربية
          </button>
        </div>
      )}
    </div>
  );
}
