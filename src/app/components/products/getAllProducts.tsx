"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
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
  const savedLocationId = Cookies.get("selectedLocationId");

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();
  const [removeFromCart, { isLoading: isRemoving }] =
    useRemoveFromCartMutation();
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useGetCategoryQuery();
  const { data: productsResponse, isLoading: productsLoading } =
    useGetProductsQuery({ limit: 1000 });
  const { items: cartItems } = useGetCartQuery(savedLocationId!, {
    skip: !savedLocationId,
    selectFromResult: ({ data }) => ({
      items: data?.items ?? [],
    }),
  });

  const categories: Category[] = categoriesResponse?.data || [];
  const products: any[] = productsResponse?.data || [];

  const sortedCategories = useMemo(() => {
    if (!categories.length) return [];
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
    if (!categories.length || debouncedSearch) return;

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
  }, [categories, products, debouncedSearch]);

  useEffect(() => {
    if (!activeCategory) return;

    const mobileBtn = mobileCategoryButtonRefs.current[activeCategory];
    if (mobileBtn && mobileCategoryContainerRef.current) {
      mobileBtn.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }

    const desktopItem = desktopCategoryRefs.current[activeCategory];
    if (desktopItem && desktopCategoryContainerRef.current) {
      desktopItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [products, debouncedSearch]);

  const getCartItem = useCallback(
    (productId: string) =>
      cartItems.find((item) => item.productId._id === productId),
    [cartItems],
  );

  const getProductName = useCallback(
    (name: string) => {
      if (isClient && window.innerWidth < 768 && name.length > 11) {
        return name.slice(0, 11) + "...";
      }
      return name;
    },
    [isClient],
  );

  const handleIncrease = useCallback(
    (productId: string, qty: number) => {
      if (isUpdating || !order.location?._id) return;

      updateCart({
        productId,
        quantity: qty + 1,
        locationId: order.location._id,
      });
    },
    [updateCart, isUpdating, order.location?._id],
  );

  const handleDecrease = useCallback(
    (productId: string, qty: number) => {
      if (isUpdating || isRemoving || !order.location?._id) return;

      if (qty <= 1) {
        removeFromCart({
          productId,
          locationId: order.location._id,
        });
        return;
      }

      updateCart({
        productId,
        quantity: qty - 1,
        locationId: order.location._id,
      });
    },
    [updateCart, removeFromCart, isUpdating, isRemoving, order.location?._id],
  );

  useEffect(() => setIsClient(true), []);

  if (categoriesLoading || productsLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <>
      <RestaurantCard order={order} />
      {!debouncedSearch && (
        <div className="xl:hidden sticky top-[88px] z-40 bg-white border-t border-b border-gray-300 font-semibold">
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
                      ? "text-[#AD5727]"
                      : "text-gray-700"
                  }`}
                >
                  {cat.title}
                  {activeCategory === cat._id && (
                    <span className="absolute -bottom-2 left-0 bottom-0 w-full h-[2px] bg-[#56381D] rounded-full" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 py-6 font-semibold">
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
                        ? "border-l-3 border-l-[#AD5727] font-bold text-[#AD5727]"
                        : "text-[#7A4A2E] font-semibold hover:text-[#AD5727]"
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
              <h2 className="text-2xl font-semibold mb-6 text-[#AD5727]">
                Search results
              </h2>
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
                            className="font-semibold text-lg text-[#56381D]"
                            onClick={() => {
                              setSelectedProductId(product._id);
                              setOpen(true);
                            }}
                          >
                            {getProductName(product.name)}
                          </h3>
                          <span className="text-[16px] font-semibold text-[#56381D]">
                            د.إ {product.price}
                          </span>
                        </div>
                        <div className="relative w-[140px] h-[120px] flex-shrink-0">
                          <Image
                            src={
                              product.imagePath
                                ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${product.imagePath}`
                                : "https://f.nooncdn.com/s/app/com/noon-food/consumer/icons/placeholder.png"
                            }
                            alt={product.name}
                            fill
                            className="object-cover rounded-xl"
                            sizes="140px"
                            priority
                          />
                          {!cartItem && (
                            <button
                              onClick={() =>
                                addToCart({
                                  productId: product._id,
                                  quantity: 1,
                                  locationId: order?.location?._id,
                                  product: {
                                    name: product.name,
                                    price: product.price,
                                    imagePath: product.imagePath,
                                  },
                                })
                              }
                              className="absolute bottom-2 right-2 cursor-pointer w-9 h-9 bg-white border rounded-lg flex items-center justify-center text-[#56381D] text-xl shadow"
                            >
                              +
                            </button>
                          )}
                          {cartItem && (
                            <div className="border border-[#AD5727] rounded-2xl flex justify-center items-center absolute bottom-2 right-2 bg-white">
                              <div className="flex items-center justify-center gap-2 p-1">
                                <button
                                  onClick={() =>
                                    handleDecrease(
                                      product._id,
                                      cartItem.quantity,
                                    )
                                  }
                                  className="px-2 py-1 rounded text-[#AD5727] text-lg cursor-pointer"
                                >
                                  −
                                </button>
                                <span className="px-3 py-1 rounded font-bold text-[#AD5727]">
                                  {cartItem.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleIncrease(
                                      product._id,
                                      cartItem.quantity,
                                    )
                                  }
                                  className="px-2 py-1 rounded text-lg cursor-pointer text-[#56381D]"
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
                        className="mb-12 scroll-mt-32"
                      >
                        <h2 className="text-2xl text-[#AD5727] mb-6 font-regular">
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
                                    className="font-regular text-lg text-[#AD5727]"
                                    onClick={() => {
                                      setSelectedProductId(product._id);
                                      setOpen(true);
                                    }}
                                  >
                                    {getProductName(product.name)}
                                  </h3>
                                  <span className="text-[18px] font-[system-ui] font-medium text-[#AD5727]">
                                    د.إ {product.price}
                                  </span>
                                </div>
                                <div className="relative w-[140px] h-[120px] flex-shrink-0">
                                  <Image
                                    src={
                                      product.imagePath
                                        ? `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/${product.imagePath}`
                                        : "https://f.nooncdn.com/s/app/com/noon-food/consumer/icons/placeholder.png"
                                    }
                                    alt={product.name}
                                    fill
                                    className="object-cover rounded-xl"
                                    sizes="140px"
                                    priority
                                  />
                                  {!cartItem && (
                                    <button
                                      onClick={() =>
                                        addToCart({
                                          productId: product._id,
                                          quantity: 1,
                                          locationId: order?.location?._id,
                                          product: {
                                            name: product.name,
                                            price: product.price,
                                            imagePath: product.imagePath,
                                          },
                                        })
                                      }
                                      className="absolute bottom-2 right-2 cursor-pointer w-9 h-9 bg-white border rounded-lg flex items-center justify-center text-[#56381D] text-xl shadow"
                                    >
                                      +
                                    </button>
                                  )}
                                  {cartItem && (
                                    <div className="border border-[#56381D] rounded-2xl flex justify-center items-center absolute bottom-2 right-2 bg-white">
                                      <div className="flex items-center justify-center gap-2 p-1">
                                        <button
                                          onClick={() =>
                                            handleDecrease(
                                              product._id,
                                              cartItem.quantity,
                                            )
                                          }
                                          className="px-2 py-1 rounded text-[#56381D] text-lg cursor-pointer"
                                        >
                                          −
                                        </button>
                                        <span className="px-3 py-1 rounded font-bold text-[#56381D]">
                                          {cartItem.quantity}
                                        </span>
                                        <button
                                          onClick={() =>
                                            handleIncrease(
                                              product._id,
                                              cartItem.quantity,
                                            )
                                          }
                                          className="px-2 py-1 rounded text-lg cursor-pointer text-[#56381D]"
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
