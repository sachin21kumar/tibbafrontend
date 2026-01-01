"use client";

export const LatestNews = () => {
  return (
    <section className="relative w-full h-full sm:h-[550px] md:h-[700px] overflow-hidden">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('http://mtb.dgh.mybluehost.me/wp-content/uploads/2024/07/post-2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1288px] mx-auto h-full flex flex-col gap-6 md:gap-8 px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center md:text-center py-9 pt-14 md:py-8">
          <p className="text-[20px] sm:text-[24px] md:text-[28px] text-[#d1a054] leading-[1] sm:leading-[0.8]">
            From Our Blog
          </p>
          <div className="h-px w-[180px] sm:w-[220px] md:w-[280px] mx-auto bg-gradient-to-r from-transparent via-white to-transparent md:my-2" />
          <button className="text-lg sm:text-xl md:text-[34px] text-white p-2 leading-6 md:leading-7 font-normal">
            Latest News
          </button>
          <div className="h-px w-[180px] sm:w-[220px] md:w-[280px] mx-auto bg-gradient-to-r from-transparent via-white to-transparent md:my-2" />
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-15">
          <div className="w-full">
            <img
              src="http://mtb.dgh.mybluehost.me/wp-content/uploads/2024/07/post-2.jpg"
              alt="Latest News"
              className="rounded-xl  w-full h-auto object-cover"
            />
          </div>

          <div className="text-white flex flex-col justify-center">
            <p className="text-[17.5px] sm:text-sm md:text-[20px] mb-1 sm:mb-2">July 22, 2024</p>
            <h3 className="text-[24.5px] sm:text-xl md:text-[28px] font-normal leading-snug mb-2 sm:mb-4 cursor-pointer hover:text-[#d1a054]">
              Elevate Your Event with Our Exceptional Catering Services
            </h3>
            <p className="text-white !font-[system-ui] text-[14px] sm:text-sm md:text-[16px] mb-2 sm:mb-4">
              Discover how our top-notch catering services can make your next event unforgettable, 
              with customizable menus and impeccable service. Planning an event? Let Cristiano take 
              care of all your catering needs...
            </p>
            <button
              className="inline-block text-left text-[14px] sm:text-sm md:text-base mb-10 w-fit border-b border-b-[#d1a054] leading-[1.8rem] sm:leading-[2rem] hover:text-[#d1a054] font-medium
              
              
              "
            

            >
              READ MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
