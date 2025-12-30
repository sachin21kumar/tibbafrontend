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

// Type for locations
interface Location {
  _id: string;
  name: string;
  area?: string;
  description?: string;
  location?: string;
  operation_hours?: string;
  branchEmail?: string;
  telephone?: string;
  mobileNumber?: string;
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

  const navBase =
    "relative uppercase text-sm cursor-pointer tracking-wider px-2 " +
    "after:absolute after:left-1/2 after:bottom-[-4px] after:h-[1.5px] " +
    "after:bg-gradient-to-r after:from-transparent after:via-[#d1a054] after:to-transparent " +
    "after:-translate-x-1/2 after:transition-all after:duration-200 after:ease-in-out";

  const navHover = "after:w-0 hover:after:w-full";
  const navActive = "after:w-full";

  return (
    <nav className="bg-[#141617] text-white sticky top-0 z-50 py-3">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-around">
          {/* Logo */}
          <Image
            src={tibbaLogo}
            alt="Logo"
            className="h-15 w-auto cursor-pointer"
            onClick={() => navigate.push("/")}
          />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 font-[system-ui]">
            {/* Home */}
            <a
              href="http://mtb.dgh.mybluehost.me/"
              target="_blank"
              className={`${navBase} ${
                pathname === "/" ? navHover : navHover
              }`}
            >
              Home
            </a>

            {/* Blog */}
            <a
              href="http://mtb.dgh.mybluehost.me/blog/"
              target="_blank"
              className={`${navBase} ${
                pathname === "/blog" ? navActive : navHover
              }`}
            >
              Blog
            </a>

            {/* Contact */}
            <a
              href="http://mtb.dgh.mybluehost.me/contact-us/"
              target="_blank"
              className={`${navBase} ${
                pathname === "/contact-us" ? navActive : navHover
              }`}
            >
              Contact Us
            </a>

            {/* Online Ordering */}
            <div
              className="menu_wrapper relative py-2"
              onMouseEnter={() => setDesktopOpen(true)}
              onMouseLeave={() => setDesktopOpen(false)}
            >
              <a
                href="/"
                className={`${navBase} ${
                  pathname === "/" ? navActive : navHover
                }`}
              >
                Online Ordering
              </a>

              {desktopOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 text-white p-6 rounded-lg shadow-xl grid grid-cols-2 gap-4 min-w-[300px] bg-black">
                  {category?.data?.map((item) => (
                    <a
                      key={item._id}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate.push(`/?category=${item._id}`);
                        setDesktopOpen(false);
                      }}
                      className="text-sm font-medium hover:text-[#d1a054] cursor-pointer"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Locations */}
            <div
              className="menu_wrapper relative py-2"
              onMouseEnter={() => setLocationsOpen(true)}
              onMouseLeave={() => setLocationsOpen(false)}
            >
              <div
                onClick={() => navigate.push("/locations")}
                className={`${navBase} ${
                  pathname.startsWith("/locations")
                    ? navActive
                    : navHover
                }`}
              >
                Locations
              </div>

              {locationsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 bg-black text-white p-4 rounded-lg shadow-lg min-w-[300px] grid gap-2">
                  {locations?.slice(0, 3)?.map((loc: Location) => (
                    <div
                      key={loc._id}
                      className="text-sm py-1 px-2 hover:text-[#d1a054] cursor-pointer"
                      onClick={() =>
                        navigate.push(`/locations/${loc._id}`)
                      }
                    >
                      {loc.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reservation */}
            <div
              className="menu_wrapper relative py-3"
              onMouseEnter={() => setReservationOpen(true)}
              onMouseLeave={() => setReservationOpen(false)}
            >
              <div className={`${navBase} ${navHover}`}>
                Reservation
              </div>

              {reservationOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 bg-black text-white p-4 rounded-lg shadow-lg min-w-[200px]">
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

          {/* Cart */}
          <div className="flex items-center gap-1">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle fill="white" cx="18.4112" cy="12.0304" r="0.894082" />
              <circle fill="white" cx="11.2586" cy="12.0304" r="0.894082" />
              <path
                stroke="white"
                d="M18.4112 9.01638C18.4112 7.04123 16.81 5.44006 14.8349 5.44006C12.8597 5.44006 11.2586 7.04123 11.2586 9.01638"
              />
              <path
                stroke="white"
                d="M8.27491 8.95409H21.3949C22.0622 8.95409 22.621 9.46298 22.6817 10.1247L23.993 24.43C24.0622 25.1847 23.4681 25.8357 22.7102 25.8357H6.95958C6.20171 25.8357 5.60761 25.1847 5.67679 24.43L6.98811 10.1247C7.04876 9.46298 7.60763 8.95409 8.27491 8.95409Z"
              />
            </svg>

            <span className="cursor-pointer" onClick={() => setOpen(true)}>
              {cart?.totalPrice ? `$${cart.totalPrice}` : "$0.00"}
            </span>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <HiX size={26} /> : <HiMenu size={26} />}
            </button>
          </div>
        </div>
      </div>

      <ViewCartModal isOpen={open} onClose={() => setOpen(false)} cart={cart} />
    </nav>
  );
};

export default Navbar;
