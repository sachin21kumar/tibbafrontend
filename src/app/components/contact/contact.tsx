"use client";

import { FaMapMarkerAlt, FaClock, FaPhoneAlt } from "react-icons/fa";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import ContactForm from "../locations/locationForm";
import dynamic from "next/dynamic";
const Location = dynamic(
  () => import("../home/locations").then((mod) => mod.Location),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[45vh] flex items-center justify-center text-[#7a4a2e]">
        Loading map...
      </div>
    ),
  },
);

export const Contact = () => {
  const infoCards = [
    {
      icon: <FaMapMarkerAlt />,
      title: "ADDRESS",
      text: "Al Qusais, Dubai, UAE Main Branch",
    },
    {
      icon: <FaClock />,
      title: "OPENING HOURS",
      text: "Mon - Fri: 11:00 - 24:00\nSat - Sun: 11:00 - 24:00",
    },
    {
      icon: <MdOutlinePhoneEnabled />,
      title: "PHONE",
      text: (
        <>
          <a href="tel:+97142578585">+971 4 2578585</a>
          {" , "}
          <a href="tel:+97142578584">+971 4 2578584</a>
        </>
      ),
    },
  ];
  return (
    <>
      <div
        className="w-full h-48 sm:h-56 md:h-100 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('/header.webp')`,
        }}
      >
        <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-cinzel bg-white/10 border-white/32 backdrop-blur-[20px] px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-7">
          Contact Us
        </h1>
      </div>

      <div className="max-w-[1288px] mx-auto pt-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[26px]  text-[#d1a054] leading-[0.7]">Visit Us</p>
          <div className="h-px w-[300px] mx-auto bg-gradient-to-r from-transparent via-[#d1a054] to-transparent" />

          <button className="text-lg text-[#d1a054] p-[8px] leading-7 text-[34px] font-normal">
            Our Location
          </button>
          <div className="h-px w-[300px] mx-auto bg-gradient-to-r from-transparent via-[#d1a054] to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-5 grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className="relative bg-[#7f7f7f0d] border border-[#d1a054] rounded-lg p-8 text-center shadow-sm"
            >
              {/* Icon badge */}
              <div
                className="absolute
            flex
            justify-center
            items-center
    -top-[0.1875rem] 
    left-1/2 
    -translate-x-1/2
    w-[4.5rem] 
    h-[2.8125rem] 
    text-[0.9375rem] 
    leading-[2.8125rem] 
    rounded-b-[50%] 
    bg-[#d1a054] 
    text-[#ffffff] 
    shadow-[0_0.0625rem_0.0625rem_rgba(0,0,0,0.3)]
    z-[1]"
              >
                {card.icon}
              </div>

              {/* Card content */}
              <h3 className="mt-8 text-[20px] text-[#d1a054]">{card.title}</h3>
              <p className="mt-2 text-[#7A4A2E] font-light !font-[system-ui] whitespace-pre-line">
                {card.text}
              </p>
            </div>
          ))}
        </div>
        <ContactForm />
      </div>
      <div>
        <Location />
      </div>
    </>
  );
};
