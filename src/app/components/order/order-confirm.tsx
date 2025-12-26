"use client";

import Link from "next/link";
export default function OrderSuccessPage() {
  return (
    <div className="min-h-[89vh] flex items-center justify-center bg-gray-50 p-6">
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

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Thank you for your order!
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment was successful and your order is being processed. You
          will receive an email confirmation shortly.
        </p>

        <Link
          href="/"
          className="inline-block bg-[#d1a054] text-white py-3 px-8 rounded-full font-semibold hover:opacity-90 transition"
        >
          Continue Shopping
        </Link>

        <div className="mt-6 text-sm text-gray-500">
          Need help?{" "}
          <Link
            href="http://mtb.dgh.mybluehost.me/contact-us/"
            className="underline text-[#d1a054]"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
