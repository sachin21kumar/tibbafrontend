export const Footer = () => {
  return (
    <footer className="bg-[#1B2024] pt-14">
      <div className="max-w-[1140px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-white">
        <div>
          <h3 className="uppercase tracking-widest text-[18px]">Lunch Time</h3>

          <div className="mt-2 h-[1px] w-[260px] bg-gradient-to-r from-[#D1A054] to-transparent" />

          <div className="mt-6 font-[system-ui] text-sm leading-relaxed">
            <span className="font-semibold">
              Various Business Lunches Offer
            </span>
            <div>Monday to Sunday: 12:00 - 14:00</div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="uppercase tracking-[4px] text-[22px] font-serif">
            Tibba Restaurant
          </h3>

          <div className=" h-[9px]  tracking-[4px] text-[8px] text-black bottom-[0.5px] bg-[radial-gradient(circle,_#d1a054_20%,_transparent_100%)]">
            Restaurant
          </div>
          <div className="mt-6 text-sm font-[system-ui] mt-7">
            Via Monte Napoleone 10 20121 Milan, Italy
          </div>

          <div className="mt-2 text-[#D1A054]">+39 02 98765432</div>

          <button className="mt-6 px-4 py-2 text-xs uppercase tracking-wider bg-white/10 border border-white/20">
            Closed Until 9:00 AM
          </button>
        </div>

        {/* RIGHT – Follow Us */}
        <div className="text-right">
          <h3 className="uppercase tracking-widest text-[18px]">Follow Us</h3>

          {/* Gold line */}
          <div className="ml-auto mt-2 h-[1px] w-[200px] bg-gradient-to-l from-[#D1A054] to-transparent" />

          <div className="mt-6 flex justify-end gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              f
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              ig
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              in
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-white/10 py-6 text-center text-sm text-white/60">
        Copyright © 2024 Cristiano. All rights reserved.
      </div>
    </footer>
  );
};
