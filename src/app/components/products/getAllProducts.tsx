"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetCategoryQuery } from "../redux/query/categoryQuery/categoryQuery";
import { useGetProductsQuery } from "../redux/query/productsQuery/productsQuery";
import {
  useAddToCartMutation,
  useGetCartQuery,
} from "../redux/query/cartQuery/cart.query";
import ViewCartModal from "../common/ViewCartModel";

interface Category {
  _id: string;
  title: string;
}

export default function MenuPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "all">("asc");
  const [open, setOpen] = useState(false);
  const PRODUCTS_PER_PAGE = 9;

  useEffect(() => {
    if (categoryFromUrl) setSelectedCategory(categoryFromUrl);
    setCurrentPage(1);
  }, [categoryFromUrl]);

  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useGetCategoryQuery();

  const { data: productsResponse, isLoading: productsLoading } =
    useGetProductsQuery({
      categoryId: selectedCategory || undefined,
      page: currentPage,
      limit: PRODUCTS_PER_PAGE,
      sortBy: "price",
      order: sortOrder === "all" ? "asc" : sortOrder,
    });

  const { data: cart } = useGetCartQuery();
  const [addToCart, { isLoading: addingToCart }] = useAddToCartMutation();

  const getCartItem = (productId: string) =>
    cart?.items?.find((item: any) => item.productId?._id === productId);

  if (productsLoading || categoriesLoading)
    return <p className="text-center py-10">Loading...</p>;

  const categories: Category[] = categoriesResponse?.data || [];
  const products: any[] = productsResponse?.data || [];
  const totalProducts = productsResponse?.total || 0;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const startIndex =
    totalProducts > 0 ? (currentPage - 1) * PRODUCTS_PER_PAGE + 1 : 0;
  const endIndex = Math.min(currentPage * PRODUCTS_PER_PAGE, totalProducts);
  return (
    <div className="w-full">
      {selectedCategory && (
        <h1 className="text-center text-2xl font-serif mt-10">
          {categories.find((c) => c._id === selectedCategory)?.title}
        </h1>
      )}

      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between gap-4 mt-6">
        <div className="text-[#1b2024] text-[16px]">
          Showing {startIndex}-{endIndex} of {totalProducts} results
        </div>

        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value as "asc" | "desc" | "all")
          }
          className="border-b p-2 outline-none focus:outline-none focus:ring-0"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const cartItem = getCartItem(product._id);

          return (
            <div
              key={product._id}
              className="group rounded-xl overflow-hidden bg-white border border-[#7F7F7F26]
              transition-all duration-300
              hover:shadow-[0_16px_32px_rgba(0,0,0,0.15)] transition-shadow duration-300 hover:bg-[#f5f5f5]"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img
                  src={
                    product.imagePath
                      ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${product.imagePath}`
                      : "/placeholder.png"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex flex-col pt-6 px-6 gap-2 bg-[#ebebeb]">
                <h2 className="text-lg font-serif text-[#1b2024] uppercase cursor-pointer " onClick={()=>router.push(`/product/${product._id}`)}>
                  {product.name}
                </h2>

                {product.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 text-[#1b2024]">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <span className="mt-2 font-semibold text-[#d1a054] text-lg">
                    ${product.price}
                  </span>

                  {cartItem ? (
                    <button
                      onClick={() => setOpen(true)}
                      className="flex uppercase border-b border-b-[#d1a054]
                       cursor-pointer relative !text-[ffffff14]
                       hover:text-[#d1a054]
  before:content-['✓']
  before:absolute
  before:-left-4
  before:top-1
  before:text-[#d1a054]
  before:leading-none"
                    >
                      View Cart
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        addToCart({
                          productId: product._id,
                          quantity: 1,
                        })
                      }
                      className="flex uppercase border-b hover:text-[#d1a054]
                      cursor-pointer border-b-[#d1a054]"
                    >
                      {addingToCart ? "Adding..." : "Add to cart"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {products.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap py-5">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 rounded cursor-pointer"
            >
              ←
            </button>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border 
              ${
                currentPage === page
                  ? "bg-white text-[#d1a054] cursor-pointer [border-radius:63%_37%_30%_70%_/50%_45%_55%_50%] [border-color:#00000030]"
                  : "border-none cursor-pointer"
              }`}
            >
              {page}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 rounded cursor-pointer"
            >
              →
            </button>
          )}
        </div>
      )}

      <ViewCartModal isOpen={open} onClose={() => setOpen(false)} cart={cart} />
    </div>
  );
}
