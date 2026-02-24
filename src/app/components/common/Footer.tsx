import { FaFacebookF, FaInstagram, FaTripadvisor } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-white pt-10 xl:pt-14 border-t border-gray-200 shadow-[0_-6px_18px_rgba(0,0,0,0.08)] font-semibold">
      <div className="max-w-[1508px] mx-auto grid grid-cols-1 xl:grid-cols-3 gap-10 xl:gap-12 text-[#AD5727] px-4 sm:px-6">
        <div className="hidden xl:block text-center xl:text-left">
          <h3 className="uppercase tracking-widest text-[18px]">Lunch Time</h3>

          <div className="mt-2 h-[1px] w-[200px] sm:w-[260px] bg-gradient-to-r from-[#D1A054] to-transparent mx-auto xl:mx-0" />

          <div className="mt-6 font-[system-ui] text-sm leading-relaxed">
            <span className="font-semibold">
              Various Business Lunches Offer
            </span>
            <div>Monday to Sunday: 11:00 Am Onwards</div>
          </div>
        </div>

        <div className="text-center px-2 sm:px-0">
          <h3 className="uppercase tracking-[3px] sm:tracking-[4px] text-[20px] sm:text-[22px] font-serif">
            Tibba Restaurant
          </h3>
          <div className="w-fit m-auto">
            <div className="h-[9px] tracking-[4px] text-[8px] text-white bg-[radial-gradient(circle,_#AD5727,_transparent_100%)] mx-auto">
              Restaurant
            </div>

            <div className="mt-5 sm:mt-6 text-sm font-[system-ui] leading-relaxed">
              Al Qusais, Dubai, UAE Main Branch
            </div>
          </div>

          <div className="mt-2 text-[#AD5727]">
            <a href="tel:+97142578585">+971 4 2578585</a>,{" "}
            <a href="tel:+97142578584">+971 4 2578584</a>
          </div>

          <span className="open-close-signboard">Open until 12:00 AM</span>
        </div>

        <div className="text-center xl:text-right">
          <div className="w-fit ml-auto flex flex-col justify-end">
            <h3 className="hidden xl:block uppercase tracking-widest text-[18px]">
              Follow Us
            </h3>

            <div className="hidden xl:block mt-2 h-[1px]  sm:w-[345px] bg-gradient-to-l from-[#AD5727] to-transparent mx-auto xl:ml-auto" />
          </div>

          <div className="md:mt-6 flex justify-center xl:justify-end gap-4">
            {[FaFacebookF, FaInstagram, FaTripadvisor].map((Icon, i) => (
              <div
                key={i}
                className="w-9 cursor-pointer h-9 sm:w-10 sm:h-10 rounded-[63%_37%_30%_70%_/50%_45%_55%_50%] bg-[#AD5727]/10 flex items-center justify-center hover:bg-[#AD5727]/20 transition"
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#AD5727]/30 mt-10 xl:mt-12 py-5 xl:py-6">
        <div className="text-center text-[9px] sm:text-sm text-[#AD5727] max-w-[1508px] mx-auto px-4 sm:px-6">
          © {new Date().getFullYear()} Tibba. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
