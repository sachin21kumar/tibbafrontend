"use client";

import Image from "next/image";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import tibbaLogo from "../../../../public/tibba-logo.webp";
import { useGetCategoryQuery } from "../redux/query/categoryQuery/categoryQuery";
import { useGetLocationsQuery } from "../redux/query/locationsQuery/location.query";
import { useGetCartQuery } from "../redux/query/cartQuery/cart.query";
import { useRouter, usePathname } from "next/navigation";
import ViewCartModal from "./ViewCartModel";
import { FaFacebookF, FaInstagram, FaTripadvisor } from "react-icons/fa";

interface Location {
  _id: string;
  name: string;
  area?: string;
}

const Navbar = () => {
  const { data: category } = useGetCategoryQuery();
  const { data: locations } = useGetLocationsQuery();
  const { data: cart } = useGetCartQuery();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);

  const navigate = useRouter();
  const pathname = usePathname();

  /* ===== DESKTOP STYLES (UNCHANGED) ===== */
  const navBase =
    "relative uppercase text-sm cursor-pointer tracking-wider px-2 " +
    "after:absolute after:left-1/2 after:bottom-[-4px] after:h-[1.5px] " +
    "after:bg-gradient-to-r after:from-transparent after:via-[#d1a054] after:to-transparent " +
    "after:-translate-x-1/2 after:transition-all after:duration-200 after:ease-in-out";

  const navHover = "after:w-0 hover:after:w-full";
  const navActive = "after:w-full";

  /* ===== MOBILE STYLES (TEXT WIDTH ONLY) ===== */
  const mobileNavBase =
    "relative inline-block uppercase text-sm cursor-pointer tracking-wider " +
    "after:absolute after:left-0 after:bottom-[-4px] after:h-[1.5px] " +
    "after:bg-[#d1a054] after:w-0 after:transition-all after:duration-200 after:ease-in-out";

  const mobileNavHover = "hover:after:w-full";
  const mobileNavActive = "after:w-full";

  return (
    <nav className="bg-[#56381D] text-white sticky top-0 z-50 py-3">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:justify-around">
          <div className="lg:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <HiX size={26} /> : <HiMenu size={26} />}
            </button>
          </div>

          <Image
            src={tibbaLogo}
            alt="Logo"
            className=" md:w-[72px] w-[50px] object-cover cursor-pointer"
            onClick={() => navigate.push("/")}
          />

          <div className="hidden lg:flex items-center space-x-6 font-[system-ui]">
            <a
              href="/"
              className={`${navBase} ${
                pathname === "/" ? navActive : navHover
              }`}
            >
              Home
            </a>
            <a
              href="/gallery"
              className={`${navBase} ${
                pathname === "/gallery" ? navActive : navHover
              }`}
            >
              Gallery
            </a>
            <a
              href="/contact"
              className={`${navBase} ${
                pathname === "/contact" ? navActive : navHover
              }`}
            >
              Contact Us
            </a>

            <div className="relative py-2">
              <a
                href="/onlineordering"
                className={`${navBase} ${
                  pathname === "/onlineordering" ? navActive : navHover
                }`}
              >
                Online Ordering
              </a>
            </div>

            <div
              className="relative py-2"
              onMouseEnter={() => setLocationsOpen(true)}
              onMouseLeave={() => setLocationsOpen(false)}
            >
              <div
                onClick={() => navigate.push("/locations")}
                className={`${navBase} ${
                  pathname.startsWith("/locations") ? navActive : navHover
                }`}
              >
                Locations
              </div>

              {locationsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 bg-[#56381D] p-4 rounded-lg min-w-[300px] grid gap-2">
                  {locations?.slice(0, 3)?.map((loc: Location) => (
                    <div
                      key={loc._id}
                      className="text-sm hover:text-[#d1a054] cursor-pointer"
                      onClick={() => navigate.push(`/locations/${loc._id}`)}
                    >
                      {loc.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              className="relative py-3"
              onMouseEnter={() => setReservationOpen(true)}
              onMouseLeave={() => setReservationOpen(false)}
            >
              <div
                className={`${navBase} ${
                  pathname.startsWith("/reservation") ? navActive : navHover
                }`}
              >
                Reservation
              </div>

              {reservationOpen && (
                <div className="absolute top-full bg-[#56381D] left-1/2 -translate-x-1/2 p-4 rounded-lg min-w-[200px]">
                  <div
                    onClick={() => navigate.push("/opentable")}
                    className="text-sm py-2 hover:text-[#d1a054] cursor-pointer"
                  >
                    OpenTable
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className="relative cursor-pointer flex items-center"
            onClick={() => setOpen(true)}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle fill="white" cx="18.4" cy="12" r="0.9" />
              <circle fill="white" cx="11.3" cy="12" r="0.9" />
              <path
                stroke="white"
                d="M18.4 9C18.4 7 16.8 5.4 14.8 5.4C12.9 5.4 11.3 7 11.3 9"
              />
              <path
                stroke="white"
                d="M8.3 9H21.4C22.1 9 22.6 9.5 22.7 10.1L24 24.4C24.1 25.2 23.5 25.8 22.7 25.8H7C6.2 25.8 5.6 25.2 5.7 24.4L7 10.1C7 9.5 7.6 9 8.3 9Z"
              />
            </svg>

            {cart?.items?.length > 0 && (
              <span className="absolute md:-top-2 top-4 left-2 bg-[#d1a054] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cart.items.length}
              </span>
            )}

            <span className="ml-2 hidden xl:block">
              {cart?.totalPrice ? `د.إ ${cart.totalPrice}` : ""}
            </span>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[#56381D] border-t border-white/10">
          <div className="flex flex-col px-8 py-7 space-y-4 items-start h-[calc(100vh-88px)]">
            {[
              { label: "Home", path: "/" },
              { label: "Gallery", path: "/gallery" },
              { label: "Contact Us", path: "/contact" },
              { label: "Online Ordering", path: "/onlineordering" },
              { label: "Locations", path: "/locations" },
              { label: "Reservation", path: "/opentable" },
            ].map((item) => (
              <div
                key={item.path}
                className={`${mobileNavBase} ${
                  item.path === "/"
                    ? pathname === "/"
                      ? mobileNavActive
                      : mobileNavHover
                    : pathname.startsWith(item.path)
                      ? mobileNavActive
                      : mobileNavHover
                } text-[18px]`}
                onClick={() => {
                  navigate.push(item.path);
                  setMobileOpen(false);
                }}
              >
                {item.label}
              </div>
            ))}

            <p className="text-[16px] mt-[35px] !font-[cinzel]">
              Closed until 12:00 am
            </p>

            <p className="text-[14px] !font-[system-ui]">
              Al Qusais, Dubai, UAE Main Branch
            </p>

            <p className="text-[14px] !font-[system-ui]">
              {" "}
              <a href="tel:+97142578585">+971 4 2578585</a>,{" "}
              <a href="tel:+97142578584">+971 4 2578584</a>
            </p>

            <div className="mt-2 flex justify-center xl:justify-end gap-4">
              {[FaFacebookF, FaInstagram, FaTripadvisor].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-[63%_37%_30%_70%_/50%_45%_55%_50%] bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                >
                  <Icon />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ViewCartModal isOpen={open} onClose={() => setOpen(false)} cart={cart} />
    </nav>
  );
};

export default Navbar;
