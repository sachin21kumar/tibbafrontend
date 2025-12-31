"use client";
import { useState } from "react";
import {
  useAddToCartMutation,
  useGetCartQuery,
} from "../redux/query/cartQuery/cart.query";
import { useGetProductsQuery } from "../redux/query/productsQuery/productsQuery";
import ViewCartModal from "../common/ViewCartModel";

export const BestSeller = () => {
  const { data, isLoading } = useGetProductsQuery({});
  const { data: cart } = useGetCartQuery();
  const [addToCart, { isLoading: addingToCart }] = useAddToCartMutation();
  const getCartItem = (productId: string) =>
    cart?.items?.find((item: any) => item.productId?._id === productId);
  const [open, setOpen] = useState(false);

  return (
    <section className="py-[90px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[26px]  text-[#d1a054] leading-[0.7]">
            Best Sellers for Delivery
          </p>
          <div className="h-px w-[400px] mx-auto bg-gradient-to-r from-transparent via-black to-transparent" />

          <button className="text-lg text-black p-[8px] leading-7 text-[34px] font-normal">
            Favourite Delivery
          </button>
          <div className="h-px w-[400px] mx-auto bg-gradient-to-r from-transparent via-black to-transparent" />
        </div>
        <div className="max-w-[1288px] mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data.slice(0, 3).map((product) => {
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

                <div className="p-4 flex flex-col pt-6 px-6 gap-2 bg-[#F5F5F5]">
                  <h2 className="text-lg text-left text-[#1b2024] uppercase cursor-pointer ">
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
                      cursor-pointer border-b-[#d1a054] text-[14px]"
                      >
                        {addingToCart ? "Adding..." : "Add to cart"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {data?.data.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
      <ViewCartModal isOpen={open} onClose={() => setOpen(false)} cart={cart} />
    </section>
  );
};
