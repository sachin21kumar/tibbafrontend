export const Banner = () => {
  return (
    <section className="relative h-[calc(100vh-90px)] w-full overflow-hidden">
      <div className="absolute inset-0 hero-img-1">
        <img
          src="/hero-1.jpg"
          alt="Restaurant Dish"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 hero-img-2">
        <img
          src="/hero-2.jpg"
          alt="Restaurant Ambience"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 flex h-full items-center justify-center text-center text-white px-6">
        <div>
          <div className="text-center text-white">
            <div className="inline-block">
              <div className="mb-3 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent" />
              <h1
                className="
  hero-title
  text-4xl md:text-6xl
  font-cinzel tracking-wide whitespace-nowrap
"
              >
                TIBBA RESTAURANT
              </h1>
              <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>
          </div>

          <div className="p-8 font-[system-ui] py-6 text-[20px] max-w-[560px] mx-auto md:text-base text-white/90">
            Welcome to <b>Tibba Restaurant</b>, where authentic Yemeni flavors
            thrive. Enjoy a memorable dining experience and explore our menu.
          </div>
          <div className="flex justify-center">
            <div className="inline-flex flex-col items-center">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d1a054] to-transparent mb-3" />

              <button className="px-8  text-sm tracking-widest hover:text-[#d1a054] transition cursor-pointer whitespace-nowrap">
                OUR MENU
              </button>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d1a054] to-transparent mt-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
