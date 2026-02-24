"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useGetCategoryQuery } from "../redux/query/categoryQuery/categoryQuery";
import { useGetProductsQuery } from "../redux/query/productsQuery/productsQuery";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setLocation } from "../redux/slices/orderSlice";
import Cookies from "js-cookie";
import Image from "next/image";

interface Category {
  _id: string;
  title: string;
}

export default function Gallery() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [activeCategory, setActiveCategory] = useState<string>("");

  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useGetCategoryQuery();
  const { data: productsResponse, isLoading: productsLoading } =
    useGetProductsQuery({ limit: 1000 });

  const categories: Category[] = categoriesResponse?.data || [];
  const products: any[] = productsResponse?.data || [];

  const sortedCategories = useMemo(() => {
    if (!categories.length) return [];
    const popular = categories.find((cat) => cat.title === "Popular Meals");
    const others = categories.filter((cat) => cat.title !== "Popular Meals");
    return popular ? [popular, ...others] : categories;
  }, [categories]);

  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToCategory = useCallback((categoryId: string) => {
    categoryRefs.current[categoryId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    if (!activeCategory && sortedCategories.length) {
      setActiveCategory(sortedCategories[0]._id);
    }
  }, [sortedCategories, activeCategory]);

  useEffect(() => {
    if (!categories.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) {
          setActiveCategory(visible[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -70% 0px" },
    );

    Object.values(categoryRefs.current).forEach(
      (el) => el && observer.observe(el),
    );

    return () => observer.disconnect();
  }, [categories]);

  if (categoriesLoading || productsLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="px-4 py-6 font-semibold">
      <div className="flex gap-[10px] mx-auto">
        <aside className="hidden xl:block bg-white sticky top-[90px] h-fit border-r border-gray-200 flex-none w-[19%] p-4 font-semibold">
          <ul className="space-y-1 max-h-[80vh] overflow-y-auto">
            {sortedCategories.map((cat) => (
              <li
                key={cat._id}
                onClick={() => scrollToCategory(cat._id)}
                className={`cursor-pointer px-3 py-2 text-sm transition ${
                  activeCategory === cat._id
                    ? "border-l-4 border-l-[#AD5727] font-bold text-[#AD5727]"
                    : "text-[#AD5727] font-semibold hover:text-[#AD5727]"
                }`}
              >
                {cat.title}
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1">
          {sortedCategories.map((category) => {
            const categoryProducts = products.filter(
              (p) => p.categoryId === category._id,
            );

            if (!categoryProducts.length) return null;

            return (
              <section
                id={category._id}
                key={category._id}
                ref={(el) => {
                  categoryRefs.current[category._id] = el ?? null;
                }}
                className="mb-14 scroll-mt-32"
              >
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="tracking-[3px] font-semibold text-[#AD5727] whitespace-nowrap">
                    {category.title.toUpperCase()}
                  </h2>

                  <div className="flex w-full items-center">
                    <div className="w-2.5 h-2.5 rotate-45 bg-[#AD5727]"></div>
                    <div className="flex-1 h-[2px] bg-[#AD5727]"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {categoryProducts.map((product) => (
                    <div
                      key={product._id}
                      className="group bg-white rounded-xl border border-[#e6e6e6] overflow-hidden cursor-pointer hover:shadow-lg transition"
                    >
                      <div className="relative w-full h-[200px] flex items-center justify-center bg-white">
                        <img
                          src={
                            product.imagePath
                              ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/uploads/products/${product.imagePath}`
                              : "https://f.nooncdn.com/s/app/com/noon-food/consumer/icons/placeholder.png"
                          }
                          alt={product.name}
                          className="object-contain p-6 h-[250px]"
                        />
                      </div>

                      <div className="p-5">
                        <h3 className="text-[18px] text-[#AD5727] mb-2 leading-tight">
                          {product.name}
                        </h3>

                        {product.description && (
                          <p className="text-[14px] text-[#AD5727] leading-relaxed line-clamp-2">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
}
