"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useGetProductByIdQuery } from "../redux/query/productsQuery/productsQuery";
import { useGetCategoryQuery } from "../redux/query/categoryQuery/categoryQuery";
import { useAddToCartMutation } from "../redux/query/cartQuery/cart.query";

export default function ProductDetail() {
  const router = useRouter();
  const { id }: any = useParams();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  const { data: category } = useGetCategoryQuery();
  const categoryName =
    category?.data.find((cat: any) => cat._id === product?.categoryId)?.title ||
    "";
  const [quantity, setQuantity] = useState(1);

  const [addToCart, { isLoading: addingToCart }] = useAddToCartMutation();

  if (isLoading) return <p className="text-center my-12">Loading product...</p>;
  if (isError || !product)
    return <p className="text-center my-12">Product not found.</p>;

  return (
    <div className="max-w-[1508px] mx-auto my-12 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      <div className="absolute inset-0 bg-gradient-to-b from-[#4e4719] via-transparent to-white -z-10"></div>

      {/* Image Container */}
      <div className="w-full md:w-[754px] h-[300px] sm:h-[400px] md:h-[502px] flex-shrink-0">
        <img
          src={
            product.imagePath
              ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${product.imagePath}`
              : "/placeholder.png"
          }
          alt={product.name}
          className="w-full h-full object-cover rounded-t-xl md:rounded-none md:rounded-l-xl"
        />
      </div>

      {/* Product Info */}
      <div className="w-full md:w-[754px] p-6 md:p-8 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl mb-2">{product.name}</h1>
          {product.categoryId && (
            <span className="text-sm text-gray-700 mb-4 capitalize block">
              Category:{" "}
              <span className="text-black font-semibold">{categoryName}</span>
            </span>
          )}
          {product.description && (
            <p className="text-gray-700 mb-6">{product.description}</p>
          )}
        </div>

        {/* Price & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mt-6">
          <span className="text-2xl font-semibold text-[#d1a054]">
            ${product.price.toFixed(2)}
          </span>

          <div className="flex items-center border rounded-full">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 text-lg font-bold hover:bg-gray-100 rounded-l-full"
            >
              -
            </button>
            <span className="px-6 py-2">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 text-lg font-bold hover:bg-gray-100 rounded-r-full"
            >
              +
            </button>
          </div>

          <div className="flex gap-2 sm:gap-4 flex-wrap">
            <button
              onClick={() => router.push("/cart")}
              className="bg-[#d1a054] hover:opacity-90 text-white font-medium py-3 px-6 rounded-full shadow-md transition-all duration-200 w-full md:w-auto"
            >
              View Cart
            </button>

            <button
              onClick={() =>
                addToCart({
                  productId: product._id,
                  quantity,
                })
              }
              className="bg-[#d1a054] hover:opacity-90 text-white font-medium py-3 px-6 rounded-full shadow-md transition-all duration-200 w-full md:w-auto"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
