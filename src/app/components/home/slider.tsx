"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonText: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "http://mtb.dgh.mybluehost.me/wp-content/uploads/2024/07/post-1.jpg",
    title: "Family Feast Special",
    description:
      "Bring your loved ones for our Family Feast Special! Enjoy a complimentary dessert for tables of four or more. Book now and make memories over a delicious meal!",
    buttonText: "Book a Table",
  },
  {
    id: 2,
    image: "http://mtb.dgh.mybluehost.me/wp-content/uploads/2024/07/herro-slide-1-1620x1080.jpg",
    title: "Weekday Lunch Delight",
    description:
      "Take a break with our Weekday Lunch Delight! Enjoy a two-course meal at a special price, Monday to Friday, 11 AM to 3 PM. Treat yourself to a delightful lunch today!",
    buttonText: "Our Menu",
  },
];

export default function ImageSlider() {
  return (
    <div className="relative w-full h-[404px] md:h-[404px]">
      <Swiper
        modules={[Navigation,Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-[404px] bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div
                className={`absolute inset-0 ${
                  slide.image ? "" : "white"
                } flex items-center justify-center px-4 sm:px-6`}
              >
                <div className="relative bg-white p-[44px_clamp(1rem,_-1.3602rem_+_9.9379vw,_5rem)] rounded-xl max-w-[720px] text-center shadow-[inset_0_0_3px_rgba(255,255,255,0.25),0_3px_15px_rgba(0,0,0,0.25)]">
                  <h2 className="text-2xl md:text-[32px] mb-4">
                    {slide.title}
                  </h2>
                  <div className="text-[16px] md:text-base text-gray-700 font-regular font-[system-ui] mb-6">
                    {slide.description}
                  </div>
                  {slide.buttonText && (
                    <>
                      <div className="h-px w-[100px] mx-auto bg-gradient-to-r from-transparent via-[#d1a054] to-transparent" />

                      <button className="text-gray-800 hover:text-[#d1a054] px-2 py-2 cursor-pointer">
                        {slide.buttonText}
                      </button>
                      <div className="h-px w-[100px] mx-auto bg-gradient-to-r from-transparent via-[#d1a054] to-transparent" />
                    </>
                  )}

                  {/* Arrows with small gap from content */}
                  <div
                    className="hidden xl:flex absolute top-1/2 -translate-y-1/2 -left-19 w-[52px] h-[52px] border border-gray-300 bg-white rounded-full flex items-center justify-center cursor-pointer swiper-button-prev-custom"
                    style={{
                      borderRadius: "63% 37% 30% 70% / 50% 45% 55% 50%",
                    }}
                  >
                    ❮
                  </div>
                  <div
                    className="hidden xl:flex absolute top-1/2 -translate-y-1/2 -right-19 w-[52px] h-[52px] border border-gray-300 bg-white rounded-full flex items-center justify-center cursor-pointer swiper-button-next-custom"
                    style={{
                      borderRadius: "63% 37% 30% 70% / 50% 45% 55% 50%",
                    }}
                  >
                    ❯
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
