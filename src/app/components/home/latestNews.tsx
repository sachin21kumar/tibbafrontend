"use client";

export const LatestNews = () => {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('http://mtb.dgh.mybluehost.me/wp-content/uploads/2024/07/post-2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px) brightness(0.3)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1288px] mx-auto h-full flex flex-col  gap-8">
        
        {/* Section Header */}
        <div className="text-center md:text-center py-8 pt-15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[28px]  text-[#d1a054] leading-[0.7]">
            From Our Blog
          </p>
          <div className="h-px w-[280px] mx-auto bg-gradient-to-r from-transparent via-white to-transparent" />

          <button className="text-lg text-white p-[8px] leading-7 text-[34px] font-normal">
           Latest News
          </button>
          <div className="h-px w-[280px] mx-auto bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-15 ">
          <div className="w-full">
            <img
              src="http://mtb.dgh.mybluehost.me/wp-content/uploads/2024/07/post-2.jpg"
              alt="Latest News"
              className="rounded-xl shadow-xl w-full h-auto object-cover"
            />
          </div>

          <div className="text-white">
            <p className="text-sm md:text-[20px] text-white mb-2">July 22, 2024</p>
            <h3 className="text-2xl md:text-[28px] font-normal leading-snug mb-4 cursor-pointer hover:text-[#d1a054]">
              Elevate Your Event with Our Exceptional Catering Services
            </h3>
            <p className="text-white !font-[system-ui] text-sm md:text-[16px] w-full mb-4">
              Discover how our top-notch catering services can make your next event unforgettable, 
              with customizable menus and impeccable service. Planning an event? Let Cristiano take 
              care of all your catering needs...
            </p>
            <a
              href="#"
              className="inline-block text-sm bg-[#ffffff08] md:text-base leading-[2rem] px-2 hover:text-[#d1a054] font-medium border-b border-b-[#d1a054]"
            >
              READ MORE
            </a>
          </div>
        </div>
        
      </div>
    </section>
  );
};
