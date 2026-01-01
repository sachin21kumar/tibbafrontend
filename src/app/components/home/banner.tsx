export const Banner = () => {
  return (
    <section className="relative h-[calc(100vh-90px)] w-full overflow-hidden">
      {/* Background Images */}
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col xl:flex-row h-full items-center justify-center text-center text-white px-4 sm:px-6 xl:mt-0">

        <div>
          <div className="text-center text-white">
            <div className="inline-block">
              <div className="mb-2 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent" />
              
              {/* Hero Title */}
              <h1 className="hero-title text-3xl sm:text-4xl md:text-6xl font-cinzel tracking-wide whitespace-normal sm:whitespace-nowrap">
                TIBBA RESTAURANT
              </h1>
              
              <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>
          </div>

          {/* Description */}
          <div className="xl:p-4 pt-6 sm:p-6 font-[system-ui] text-[15px] sm:text-base md:text-[20px]  sm:max-w-[560px] mx-auto text-white/90 leading-relaxed">
            Welcome to <b>Tibba Restaurant</b>, where authentic Yemeni flavors
            thrive. Enjoy a memorable dining experience and explore our menu.
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <div className="inline-flex flex-col items-center w-fit sm:w-auto mt-7">
              <div className="h-px w-full sm:w-full bg-gradient-to-r from-transparent via-[#d1a054] to-transparent mb-2 sm:mb-3" />

              <button className="px-4 sm:px-8 py-2  text-xs sm:text-sm tracking-widest hover:text-[#d1a054] transition cursor-pointer whitespace-nowrap">
                OUR MENU
              </button>

              <div className="h-px w-full sm:w-full bg-gradient-to-r from-transparent via-[#d1a054] to-transparent mt-2 sm:mt-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
