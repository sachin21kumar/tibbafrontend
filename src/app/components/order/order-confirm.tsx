"use client";

import { useTranslations } from "@/i18n/TranslationProvider";
import Link from "next/link";
export default function OrderSuccessPage() {
  const { locale, t } = useTranslations();

  return (
    <div className="min-h-[89vh] flex items-center justify-center bg-gray-50 p-6 font-semibold">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg text-center">
        <div className="mb-6 text-center flex items-center justify-center">
          <svg
            width="64px"
            height="64px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#1f7a2e"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <circle
                opacity="0.5"
                cx="12"
                cy="12"
                r="10"
                stroke="#00ff2a"
                strokeWidth="1.5"
              ></circle>
              <path
                d="M8.5 12.5L10.5 14.5L15.5 9.5"
                stroke="#00ff2a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#AD5727] mb-4">
          {t("orderSuccess.thankyou")}
        </h1>

        <p className="text-[#AD5727] !font-[system-ui] mb-6">
          {t("orderSuccess.sucesspayment")}
        </p>

        <Link
          href={`/${locale}`}
          className="inline-block bg-[#AD5727] text-white py-3 px-8 rounded-full font-semibold hover:opacity-90 transition"
        >
          {t("orderSuccess.continueShopping")}
        </Link>

        <div className="mt-6 text-sm text-[#7a4a2e]">
          {t("orderSuccess.needhelp")}{" "}
          <Link
            href={`/${locale}/contact`}
            className="underline text-[#AD5727]"
          >
            {t("orderSuccess.contactus")}
          </Link>
        </div>
      </div>
    </div>
  );
}
