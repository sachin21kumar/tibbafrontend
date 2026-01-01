"use client";
import { useState } from "react";

export default function MenuSection() {
  const menuItems = [
    {
      name: "Rainbow Roll",
      description:
        "Experience a burst of color and flavor with our Rainbow Roll, which includes a California roll base topped with a variety of fresh sashimi slices, including tuna, salmon, yellowtail, and avocado.",
      price: "$14.99",
      image:
        "http://mtb.dgh.mybluehost.me/wp-content/uploads/2024/07/product-sushi-5-150x150.jpg",
    },
    {
      name: "Waldorf Salad",
      description:
        "A classic American salad, our Waldorf Salad features crisp apples, grapes, celery, and walnuts mixed with fresh lettuce and dressed in a light yogurt-based dressing.",
      price: "$10.49",
    },
    {
      name: "Sea Salad",
      description:
        "A healthy and satisfying option, our Quinoa Avocado Salad includes a blend of quinoa, diced avocado, cherry tomatoes, cucumber, red onion, and mixed greens, all tossed in a light lemon vinaigrette.",
      price: "$10.99",
    },
    {
      name: "Lemon Herb Grilled Salmon",
      description:
        "Enjoy our tender grilled salmon, marinated in a zesty lemon herb sauce and served with wild rice and a side of sautéed spinach.",
      price: "$24.99",
    },
    {
      name: "Turkey Burger",
      description:
        "A lighter option, our Turkey Burger is made with a seasoned ground turkey patty, topped with avocado, lettuce, tomato, and cranberry mayo, served on a whole wheat bun.",
      price: "$10.99",
    },
    {
      name: "Vegetable Roll",
      description:
        "A delightful choice for vegetarians, our Vegetable Roll features a mix of fresh veggies, including avocado, cucumber, carrot, and bell pepper, wrapped in seaweed and rice, and sprinkled with sesame seeds.",
      price: "$6.99",
      image:
        "http://mtb.dgh.mybluehost.me/wp-content/uploads/2024/07/product-sushi-1-150x150.jpg",
    },
  ];

  // Track which image is clicked on mobile/tablet
  const [clickedImage, setClickedImage] = useState<string | null>(null);

  return (
    <section className="py-20 bg-white text-gray-800">
      <div className="max-w-[1288px] mx-auto md:px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[26px] text-[#d1a054] leading-[0.7]">Featured Dishes</p>
          <div className="w-fit mx-auto">

          <div className="h-px mx-auto bg-gradient-to-r from-transparent via-black to-transparent" />

          <button className="text-lg text-black p-[8px] leading-7 text-[34px] font-normal">
            Order Menu
          </button>
          <div className="h-px  mx-auto bg-gradient-to-r from-transparent via-black to-transparent" />
          </div>
        </div>

        <div className="grid xl:grid-cols-2 md:px-8 px-[10px] gap-x-16 gap-y-12 pt-5">
          {menuItems.map((item, index) => (
            <div key={index} className="flex items-start gap-4 md:gap-6 relative">
              {item.image && (
                <div className="relative group flex-shrink-0 cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-[63%_37%_30%_70%/_50%_45%_55%_50%] shadow-[inset_0_0_0.3125rem_rgba(255,255,255,0.25),_0_0.0625rem_0.1875rem_rgba(0,0,0,0.25)]"
                    onClick={() =>
                      window.innerWidth < 1024
                        ? setClickedImage(clickedImage === item.image ? null : item.image)
                        : null
                    }
                  />

                  <div className="hidden md:block absolute top-0 left-9 pb-3 -translate-y-full w-60 h-60 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out z-50 pointer-events-none">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg shadow-xl"
                    />
                  </div>

                  <div
                    className={`md:hidden absolute top-0 left-0 -translate-y-full w-40 h-40 sm:w-60 sm:h-60 rounded-lg shadow-xl transition-all duration-300 ${
                      clickedImage === item.image ? "opacity-100 scale-100 z-50" : "opacity-0 scale-75"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              )}

              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center w-full justify-between gap-4">
                    <h3 className="text-[#1B2024] uppercase md:text-[20px] text-[16px] font-normal">
                      {item.name}
                    </h3>

                    <div className="flex-1 h-[2px] bg-gray-300" />

                    <span className="text-[#d1a054] text-[20px] font-medium">{item.price}</span>
                  </div>
                </div>
                <p className="text-[14px] md:text-base text-[#1B2024] font-extralight opacity-[0.75] !font-[system-ui]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="h-px w-[200px] mx-auto bg-gradient-to-r from-transparent via-[#d1a054] to-transparent" />
          <button className="text-gray-800 hover:text-[#d1a054] cursor-pointer px-2 py-2 transition-colors">
            View Full Menu
          </button>
          <div className="h-px w-[200px] mx-auto bg-gradient-to-r from-transparent via-[#d1a054] to-transparent" />
        </div>
      </div>
    </section>
  );
}
