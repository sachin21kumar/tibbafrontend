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
  }
];

export default function Testimonials() {
  return (
    <section className="py-10 pt-20 bg-white">
      <div className="text-center mb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[26px]  text-[#d1a054] leading-[0.7]">
           What Our Clients Say
          </p>
          <div className="h-px w-[300px] mx-auto bg-gradient-to-r from-transparent via-black to-transparent" />

          <button className="text-lg text-black p-[8px] leading-7 text-[34px] font-normal">
            Testimonials
          </button>
          <div className="h-px w-[300px] mx-auto bg-gradient-to-r from-transparent via-black to-transparent" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={3}
          spaceBetween={30}
          centeredSlides={false}
          navigation
          pagination={{ clickable: true }}
            slidesOffsetAfter={120}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-[#f8f8f8] rounded-xl shadow-md p-8 h-full">
                <div className="flex items-center gap-5 mb-5">
                  <img
                    src="http://mtb.dgh.mybluehost.me/wp-content/uploads/2024/07/client-4.jpg"
                    alt={item.name}
                    className="w-[70px] h-[70px] rounded-full object-cover"
                  />
                  <div>
                    <h4 className=" text-[18px] text-[#1B2024]">{item.name}</h4>
                    <div className="text-[#c8a35a] mt-2 text-xl leading-none">
                      ★★★★★
                    </div>
                  </div>
                </div>
                <p className="text-[#1B2024] opacity-60 !font-[system-ui] text-[16px] leading-relaxed">
                  {item.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .testimonial-swiper {
          overflow: visible; /* keep overflow hidden for layout */
        }

        /* Arrow button size */
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

        /* Arrow icon size */
        .testimonial-swiper .swiper-button-prev::after,
        .testimonial-swiper .swiper-button-next::after {
          font-size: 12px !important;
          font-weight: bold;
        }

        .testimonial-swiper .swiper-pagination {
          margin-top: 40px;
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
