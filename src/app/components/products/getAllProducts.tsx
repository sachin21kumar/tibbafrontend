"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useMemo } from "react";
import { useGetCategoryQuery } from "../redux/query/categoryQuery/categoryQuery";
import { useGetProductsQuery } from "../redux/query/productsQuery/productsQuery";
import {
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "../redux/query/cartQuery/cart.query";
import AddToCartModal from "../common/addToCartModel";
import { RestaurantCard } from "./restaurantGuard";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setLocation } from "../redux/slices/orderSlice";
import Cookies from "js-cookie";
import Image from "next/image";
function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

interface Category {
  _id: string;
  title: string;
}

export default function MenuPage() {
  const router = useRouter();
   const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 300);
  const [updateCart] = useUpdateCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [addToCart] = useAddToCartMutation();
  const [isClient, setIsClient] = useState(false);

  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useGetCategoryQuery();
  const { data: productsResponse, isLoading: productsLoading } =
    useGetProductsQuery({ limit: 1000 });
  const { data: cart } = useGetCartQuery();

  const categories: Category[] = categoriesResponse?.data || [];
  const products: any[] = productsResponse?.data || [];

  const sortedCategories = useMemo(() => {
    if (!categories?.length) return [];
    const popular = categories.find((cat) => cat.title === "Popular Meals");
    const others = categories.filter((cat) => cat.title !== "Popular Meals");
    return popular ? [popular, ...others] : categories;
  }, [categories]);

  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});
  const desktopCategoryRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const mobileCategoryContainerRef = useRef<HTMLDivElement | null>(null);
  const desktopCategoryContainerRef = useRef<HTMLUListElement | null>(null);
  const mobileCategoryButtonRefs = useRef<
    Record<string, HTMLButtonElement | null>
  >({});

  const order = useAppSelector((state) => state.order);
   useEffect(() => {
    const savedLocationId = Cookies.get("selectedLocationId");
    if (savedLocationId && !order.location) {
      dispatch(setLocation({ _id: savedLocationId } as any));
    }
    if (!savedLocationId && !order.location) {
      router.replace("/selectLocation");
    }
  }, [order.location, dispatch, router]);

  const scrollToCategory = (categoryId: string) => {
    categoryRefs.current[categoryId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (!activeCategory && sortedCategories.length) {
      setActiveCategory(sortedCategories[0]._id);
    }
  }, [sortedCategories, activeCategory]);

  useEffect(() => {
    if (!categories.length || debouncedSearch) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length > 0) {
          setActiveCategory(visibleEntries[0].target.id);
        }
      },
      { root: null, rootMargin: "-100px 0px -70% 0px", threshold: 0 }
    );

    Object.values(categoryRefs.current).forEach(
      (el) => el && observer.observe(el)
    );
    return () => observer.disconnect();
  }, [categories, products, debouncedSearch]);

  useEffect(() => {
    if (!activeCategory) return;
    const activeMobileButton = mobileCategoryButtonRefs.current[activeCategory];
    if (activeMobileButton && mobileCategoryContainerRef.current) {
      const container = mobileCategoryContainerRef.current;
      const buttonRect = activeMobileButton.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      if (
        buttonRect.left < containerRect.left ||
        buttonRect.right > containerRect.right
      ) {
        activeMobileButton.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }
    }

    // Desktop
    const activeDesktopItem = desktopCategoryRefs.current[activeCategory];
    if (activeDesktopItem && desktopCategoryContainerRef.current) {
      const container = desktopCategoryContainerRef.current;
      const itemRect = activeDesktopItem.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      if (
        itemRect.top < containerRect.top ||
        itemRect.bottom > containerRect.bottom
      ) {
        activeDesktopItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [products, debouncedSearch]);

  const getCartItem = (productId: string) =>
    cart?.items?.find((item: any) => item.productId?._id === productId);

  const getProductName = (name: string) => {
    if (isClient && window.innerWidth < 768 && name.length > 11) {
      return name.slice(0, 11) + "...";
    }
    return name;
  };

  const handleIncrease = (productId: string, qty: number) => {
    updateCart({ productId, quantity: qty + 1 });
  };

  const handleDecrease = (productId: string, qty: number) => {
    if (qty <= 1) {
      removeFromCart({ productId });
      return;
    }
    updateCart({ productId, quantity: qty - 1 });
  };

  useEffect(() => setIsClient(true), []);

  if (categoriesLoading || productsLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <>
      <RestaurantCard order={order}/>
      {!debouncedSearch && (
        <div className="xl:hidden sticky top-[88px] z-40 bg-white border-t border-b border-gray-300">
          <div
            ref={mobileCategoryContainerRef}
            className="flex gap-6 overflow-x-auto px-4 scrollbar-hide scroll-hide"
          >
            {sortedCategories.map((cat) => (
              <button
                key={cat._id}
                ref={(el) => {
                  mobileCategoryButtonRefs.current[cat._id] = el;
                }}
                onClick={() => scrollToCategory(cat._id)}
                className="relative py-3 whitespace-nowrap text-sm font-medium"
              >
                <span
                  className={`${
                    activeCategory === cat._id
                      ? "text-[#d1a054]"
                      : "text-gray-700"
                  }`}
                >
                  {cat.title}
                  {activeCategory === cat._id && (
                    <span className="absolute -bottom-2 left-0 bottom-0 w-full h-[2px] bg-[#d1a054] rounded-full" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 py-6">
        <div className="flex gap-[10px] mx-auto">
          <aside className="hidden xl:block bg-white h-screen p-4 sticky top-[90px] h-fit border-r border-gray-200 flex-none w-[19%]">
            <input
              placeholder="Search menu"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full mb-4 rounded-full font-[system-ui] border px-4 py-2 text-sm outline-none"
            />
            {!debouncedSearch && (
              <ul
                ref={desktopCategoryContainerRef}
                className="space-y-1 max-h-[80vh] overflow-y-auto"
              >
                {sortedCategories.map((cat) => (
                  <li
                    key={cat._id}
                    ref={(el) => {
                      desktopCategoryRefs.current[cat._id] = el ?? null;
                    }}
                    onClick={() => scrollToCategory(cat._id)}
                    className={`cursor-pointer px-3 py-2 text-sm transition ${
                      activeCategory === cat._id
                        ? "border-l-3 border-l-[#D1A054] font-bold text-[#d1a054]"
                        : "text-[#7A4A2E] font-semibold hover:text-[#d1a054]"
                    }`}
                  >
                    {cat.title}
                  </li>
                ))}
              </ul>
            )}
          </aside>

          <main className="flex-1">
            {debouncedSearch && filteredProducts.length > 0 && (
              <h2 className="text-2xl font-semibold mb-6 text-[#d1a054]">Search results</h2>
            )}
            <div
              className={
                debouncedSearch ? "grid grid-cols-1 md:grid-cols-2 gap-6" : ""
              }
            >
              {debouncedSearch
                ? filteredProducts.map((product) => {
                    const cartItem = getCartItem(product._id);
                    return (
                      <div
                        key={product._id}
                        className="flex justify-between cursor-pointer items-center bg-white rounded-2xl p-5 border border-gray-200 hover:border-gray-400 transition font-sans"
                      >
                        <div className="flex-1 pr-6">
                          <h3
                            className="font-semibold text-lg text-[#252525]"
                            onClick={() => {
                              setSelectedProductId(product._id);
                              setOpen(true);
                            }}
                          >
                            {getProductName(product.name)}
                          </h3>
                          <span className="text-[16px] font-semibold text-[#252525]">
                            د.إ {product.price}
                          </span>
                        </div>
                        <div className="relative w-[140px] h-[120px] flex-shrink-0">
                          <img
                             src={
                                      product.imagePath
                                        ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${product.imagePath}`
                                        : "https://f.nooncdn.com/s/app/com/noon-food/consumer/icons/placeholder.png"
                                    }
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-xl"
                          />
                          {!cartItem && (
                            <button
                              onClick={() =>
                                addToCart({
                                  productId: product._id,
                                  quantity: 1,
                                  locationId: order?.location?._id,
                                })
                              }
                              className="absolute bottom-2 right-2 cursor-pointer w-9 h-9 bg-white border rounded-lg flex items-center justify-center text-[#d1a054] text-xl shadow"
                            >
                              +
                            </button>
                          )}
                          {cartItem && (
                            <div className="border border-[#d1a054] rounded-2xl flex justify-center items-center absolute bottom-2 right-2 bg-white">
                              <div className="flex items-center justify-center gap-2 p-1">
                                <button
                                  onClick={() =>
                                    handleDecrease(
                                      product._id,
                                      cartItem.quantity
                                    )
                                  }
                                  className="px-2 py-1 rounded text-[#d1a054] text-lg cursor-pointer"
                                >
                                  −
                                </button>
                                <span className="px-3 py-1 rounded font-bold text-[#d1a054]">
                                  {cartItem.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleIncrease(
                                      product._id,
                                      cartItem.quantity
                                    )
                                  }
                                  className="px-2 py-1 rounded text-lg cursor-pointer text-[#d1a054]"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                : sortedCategories.map((category) => {
                    const categoryProducts = products.filter(
                      (p) => p.categoryId === category._id
                    );
                    if (!categoryProducts.length) return null;

                    return (
                      <section
                        id={category._id}
                        key={category._id}
                        ref={(el) => {
                          categoryRefs.current[category._id] = el ?? null;
                        }}
                        className="mb-12 scroll-mt-32"
                      >
                        <h2 className="text-2xl text-[#d1a054] mb-6 font-regular">
                          {category.title}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {categoryProducts.map((product) => {
                            const cartItem = getCartItem(product._id);
                            return (
                              <div
                                key={product._id}
                                className="flex justify-between cursor-pointer items-center bg-white rounded-2xl p-5 border border-gray-200 hover:border-gray-400 transition"
                              >
                                <div className="flex-1 pr-6">
                                  <h3
                                    className="font-regular text-lg text-[#252525]"
                                    onClick={() => {
                                      setSelectedProductId(product._id);
                                      setOpen(true);
                                    }}
                                  >
                                    {getProductName(product.name)}
                                  </h3>
                                  <span className="text-[18px] font-[system-ui] font-medium text-[252525]">
                                    د.إ {product.price}
                                  </span>
                                </div>
                                <div className="relative w-[140px] h-[120px] flex-shrink-0">
                                  <img
                                    src={
                                      product.imagePath
                                        ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${product.imagePath}`
                                        : "https://f.nooncdn.com/s/app/com/noon-food/consumer/icons/placeholder.png"
                                    }
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-xl"
                                  />
                                  {!cartItem && (
                                    <button
                                      onClick={() =>
                                        addToCart({
                                          productId: product._id,
                                          quantity: 1,
                                          locationId: order?.location?._id,
                                        })
                                      }
                                      className="absolute bottom-2 right-2 cursor-pointer w-9 h-9 bg-white border rounded-lg flex items-center justify-center text-[#d1a054] text-xl shadow"
                                    >
                                      +
                                    </button>
                                  )}
                                  {cartItem && (
                                    <div className="border border-[#d1a054] rounded-2xl flex justify-center items-center absolute bottom-2 right-2 bg-white">
                                      <div className="flex items-center justify-center gap-2 p-1">
                                        <button
                                          onClick={() =>
                                            handleDecrease(
                                              product._id,
                                              cartItem.quantity
                                            )
                                          }
                                          className="px-2 py-1 rounded text-[#d1a054] text-lg cursor-pointer"
                                        >
                                          −
                                        </button>
                                        <span className="px-3 py-1 rounded font-bold text-[#d1a054]">
                                          {cartItem.quantity}
                                        </span>
                                        <button
                                          onClick={() =>
                                            handleIncrease(
                                              product._id,
                                              cartItem.quantity
                                            )
                                          }
                                          className="px-2 py-1 rounded text-lg cursor-pointer text-[#d1a054]"
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })}
            </div>
          </main>
        </div>
      </div>

      <AddToCartModal
        isOpen={open}
        onClose={() => setOpen(false)}
        productId={selectedProductId}
      />
    </>
  );
}
