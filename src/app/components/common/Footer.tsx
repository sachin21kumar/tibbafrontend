import { FaFacebookF, FaInstagram, FaTripadvisor } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-[#1B2024] pt-14 mt-20">
      <div className="max-w-[1140px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-white px-4 sm:px-6">
        {/* LEFT – Lunch Time */}
        <div className="text-center md:text-left">
          <h3 className="uppercase tracking-widest text-[18px]">Lunch Time</h3>

          <div className="mt-2 h-[1px] w-[200px] sm:w-[260px] bg-gradient-to-r from-[#D1A054] to-transparent mx-auto md:mx-0" />

          <div className="mt-6 font-[system-ui] text-sm leading-relaxed">
            <span className="font-semibold">Various Business Lunches Offer</span>
            <div>Monday to Sunday: 12:00 - 14:00</div>
          </div>
        </div>

        {/* CENTER – Tibba Restaurant */}
        <div className="text-center">
          <h3 className="uppercase tracking-[4px] text-[22px] font-serif">
            Tibba Restaurant
          </h3>

          <div className="h-[9px] tracking-[4px] text-[8px] text-black bottom-[0.5px] bg-[radial-gradient(circle,_#d1a054_20%,_transparent_100%)] mx-auto">
            Restaurant
          </div>

          <div className="mt-6 text-sm font-[system-ui]">
            Via Monte Napoleone 10 20121 Milan, Italy
          </div>

          <div className="mt-2 text-[#D1A054]">+39 02 98765432</div>

          <div className="inline-flex items-center bg-[#2D2F33] text-white text-sm px-4 py-2 rounded-sm font-medium cursor-pointer hover:bg-[#3a3c40] transition-colors">
  OPEN UNTIL 10:00 PM
  <svg
    className="ml-2 w-3 h-3"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
</div>

        </div>

        {/* RIGHT – Follow Us */}
        <div className="text-center md:text-right">
          <h3 className="uppercase tracking-widest text-[18px]">Follow Us</h3>

          <div className="mt-2 h-[1px] w-[200px] sm:w-[345px] bg-gradient-to-l from-[#D1A054] to-transparent mx-auto md:ml-auto" />

          <div className="mt-6 flex justify-center md:justify-end gap-4">
            <div className="w-10 h-10 rounded-[63%_37%_30%_70%_/50%_45%_55%_50%] bg-white/10 flex items-center justify-center">
              <FaFacebookF />
            </div>
            <div className="w-10 h-10 rounded-[63%_37%_30%_70%_/50%_45%_55%_50%] bg-white/10 flex items-center justify-center">
              <FaInstagram />
            </div>
            <div className="w-10 h-10 rounded-[63%_37%_30%_70%_/50%_45%_55%_50%] bg-white/10 flex items-center justify-center">
              <FaTripadvisor />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 mt-12 py-6">
        <div className="text-center md:text-right text-sm text-white/60 max-w-[1140px] mx-auto px-4 sm:px-6">
          Copyright © {new Date().getFullYear()} Cristiano. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
