"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useGetProductsQuery } from "../redux/query/productsQuery/productsQuery";

export const Gallery = () => {
  const { data, isLoading } = useGetProductsQuery({});
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = data?.data?.map((item) =>
    item.imagePath
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${item.imagePath}`
      : "/placeholder.png"
  );

  return (
    <>
    <div
        className="w-full h-64 md:h-100 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('/header.jpg')`,
        }}
      >
        <h1 className="text-white text-4xl md:text-5xl font-cinzel bg-white/10 border-white/32 backdrop-blur-[20px] px-6 py-7">
          Gallery
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1288px] mx-auto p-4 py-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"
              />
            ))
          : images?.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Gallery image ${i + 1}`}
                className="w-full h-64 object-cover rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
              />
            ))}
      </div>

      {open && images && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={images.map((src) => ({ src }))}
          index={index}
          carousel={{ finite: false }}
          styles={{
            container: {
              backgroundColor: "rgba(5, 0, 0, 0.9)",
            },
          }}
          controller={{
            closeOnBackdropClick: true,
          }}
        />
      )}
    </>
  );
};
