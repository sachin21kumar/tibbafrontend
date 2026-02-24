"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/i18n/TranslationProvider";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const { locale } = useTranslations();
console.log(locale,"localelocale")
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="
    flex items-center gap-2
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

        {/* caret arrow */}
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
        <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg border rounded-md overflow-hidden z-50">
          <Link
            href={getNewPath("en")}
            onClick={() => setOpen(false)}
            className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
              locale === "en" ? "bg-gray-100 font-semibold" : ""
            }`}
          >
            English
          </Link>

          <Link
            href={getNewPath("ar")}
            onClick={() => setOpen(false)}
            className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
              locale === "ar" ? "bg-gray-100 font-semibold" : ""
            }`}
          >
            العربية
          </Link>
        </div>
      )}
    </div>
  );
}
