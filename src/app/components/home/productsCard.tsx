"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "@/i18n/TranslationProvider";
import { useGetProductsQuery } from "../redux/query/productsQuery/productsQuery";
import { MdNavigateNext } from "react-icons/md";
import { useGetCategoryQuery } from "../redux/query/categoryQuery/categoryQuery";

const SignatureDishes = () => {
  const router = useRouter();
  const { locale } = useTranslations();
  const { data: products } = useGetProductsQuery({ limit: 500 });
  const { data: categories } = useGetCategoryQuery();
  const signatureCategory = categories?.data.find(
    (cat: any) => cat.title.toLowerCase() === "chicken" || cat.title === "فرخة",
  );
  console.log(products, "products");
  const featuredProducts = products?.data
    ?.filter(
      (prod: any) =>
        prod.categoryId === signatureCategory?._id && prod.imagePath,
    )
    .slice(0, 4);
  return (
    <section className="pt-20 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl text-[#56381D]">
          Our Signature Dishes
        </h2>
        <p className="mt-4 text-[#56381D] text-[15px] sm:text-base !font-[system-ui] leading-relaxed">
          Crafted with authentic Yemeni spices and slow-cooked to perfection.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {featuredProducts?.map((product: any) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
          >
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/uploads/products/${product.imagePath}`}
                alt={product.name}
                fill
                className="object-cover transition duration-500"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-semibold text-base text-[#56381D]">
                {product.name}
              </h3>

              <p className="mt-3 text-sm text-[#56381D] line-clamp-3">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-14 text-center">
        <button
          onClick={() => router.push(`/${locale}/menu`)}
          className="px-10 py-3 flex m-auto items-center gap-2 justify-center font-[system-ui] bg-gradient-to-b from-[#56381D] cursor-pointer to-[#5a3416] text-white font-semibold tracking-wide text-lg rounded-md shadow-md hover:shadow-lg transition duration-300"
        >
          Explore Full Menu <MdNavigateNext />
        </button>
      </div>
    </section>
  );
};

export default SignatureDishes;
