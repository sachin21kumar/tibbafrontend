"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Rachel K.",
    text: "I had the pleasure of dining at this restaurant with a group of friends and it was truly fantastic. The food was delicious and the service was impeccable. I would highly recommend this restaurant to anyone looking for an amazing meal.",
  },
  {
    name: "James H.",
    text: "I visited this restaurant with my family and we were blown away by the quality of the food and the service. The ambiance was perfect and we felt so comfortable and relaxed throughout the entire meal.",
  },
  {
    name: "Sarah P.",
    text: "The food at this restaurant is absolutely delicious! Every dish we tried was expertly prepared and bursting with flavor. The service was also fantastic, making for a truly memorable dining experience.",
  },
  {
    name: "Alex B.",
    text: "If you're looking for a restaurant with incredible food, a great atmosphere, and top-notch service, look no further than this gem. I've been a regular for years and have never been disappointed.",
  },
  {
    name: "Alex B.",
    text: "If you're looking for a restaurant with incredible food, a great atmosphere, and top-notch service, look no further than this gem. I've been a regular for years and have never been disappointed.",
  },
];

export default function Testimonials() {
  
  return (
    <section className="py-10 pt-20 bg-white overflow-x-hidden">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[26px] text-[#d1a054] leading-[0.7]">
            What Our Clients Say
          </p>
          <div className="h-px w-[200px] sm:w-[250px] md:w-[300px] mx-auto bg-gradient-to-r from-transparent via-black to-transparent my-2" />
          <button className="text-lg sm:text-xl md:text-[34px] text-black p-2 leading-7 font-normal">
            Testimonials
          </button>
          <div className="h-px w-[200px] sm:w-[250px] md:w-[300px] mx-auto bg-gradient-to-r from-transparent via-black to-transparent my-2" />
        </div>
      </div>

      {/* Swiper */}
      <div className="relative max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1} // Mobile default
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },   // small phones
            768: { slidesPerView: 2, spaceBetween: 25 },   // tablets
            1024: { slidesPerView: 3, spaceBetween: 30 },  // desktop
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-[#f8f8f8] rounded-xl shadow-md p-6 sm:p-8 h-full flex flex-col justify-between">
                <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-5">
                  <img
                    src="http://mtb.dgh.mybluehost.me/wp-content/uploads/2024/07/client-4.jpg"
                    alt={item.name}
                    className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-[16px] sm:text-[18px] text-[#1B2024]">
                      {item.name}
                    </h4>
                    <div className="text-[#c8a35a] mt-1 sm:mt-2 text-lg sm:text-xl leading-none">
                      ★★★★★
                    </div>
                  </div>
                </div>
                <p className="text-[#1B2024] opacity-60 !font-[system-ui] text-sm sm:text-[16px] leading-relaxed">
                  {item.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        /* Mobile & tablet: overflow hidden */
        .testimonial-swiper {
          overflow: hidden;
        }

        /* Desktop: overflow visible */
        @media (min-width: 1024px) {
          .testimonial-swiper {
            overflow: visible;
          }
        }

        .testimonial-swiper .swiper-button-next,
        .testimonial-swiper .swiper-button-prev {
          width: 48px;
          height: 48px;
          background: #fff;
          border-radius: 50%;
          box-shadow: rgba(0, 0, 0, 0.1) -3px 0px 3px inset;
          color: #333;
          z-index: 10;
        }

        .testimonial-swiper .swiper-button-prev::after,
        .testimonial-swiper .swiper-button-next::after {
          font-size: 12px !important;
          font-weight: bold;
        }

        .testimonial-swiper .swiper-pagination {
          margin-top: 30px;
          position: relative;
        }

        .testimonial-swiper .swiper-pagination-bullet {
          background: #d1d1d1;
          opacity: 1;
        }

        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #c8a35a;
        }

        :is(.swiper-button-prev, .swiper-button-next) svg {
          width: 18px !important;
          height: 18px !important;
        }
      `}</style>
    </section>
  );
}
