"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { useGetProductsQuery } from "../redux/query/productsQuery/productsQuery";
import { useGetCategoryQuery } from "../redux/query/categoryQuery/categoryQuery";

export const Gallery = () => {
  const { data: productRes, isLoading } = useGetProductsQuery({});
  const { data: categoryRes } = useGetCategoryQuery();

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const popularMealImages = useMemo(() => {
    if (!productRes?.data || !categoryRes?.data) return [];

    const popularCategory = categoryRes.data.find(
      (cat: any) => cat?.title?.trim().toLowerCase() === "popular meals"
    );

    if (!popularCategory) return [];

    return productRes.data
      .filter((product: any) => product.categoryId === popularCategory._id)
      .map((product: any) =>
        product.imagePath
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${product.imagePath}`
          : "https://f.nooncdn.com/s/app/com/noon-food/consumer/icons/placeholder.png"
      );
  }, [productRes, categoryRes]);

  return (
    <>
      {/* Header */}
      <div className="relative w-full h-40 sm:h-48 md:h-56 xl:h-100 flex items-center justify-center">
        <Image
          src="/header.webp"
          alt="Gallery Header"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <h1 className="relative z-10 text-white text-3xl font-cinzel bg-white/10 backdrop-blur-xl px-6 py-4">
          Gallery
        </h1>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1288px] mx-auto p-4 py-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-40 sm:h-56 lg:h-64 bg-[#d1a054] animate-pulse rounded-lg"
              />
            ))
          : popularMealImages.map((src, i) => (
              <div
                key={i}
                className="relative w-full h-40 sm:h-56 lg:h-64 cursor-pointer rounded-lg shadow-lg overflow-hidden hover:-translate-y-1 transition"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
              >
                <Image
                  src={src}
                  alt={`Popular meal ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ))}
      </div>

      {/* Lightbox */}
      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={popularMealImages.map((src) => ({ src }))}
          index={index}
          styles={{
            container: { backgroundColor: "rgba(5,0,0,0.9)" },
          }}
        />
      )}
    </>
  );
};
