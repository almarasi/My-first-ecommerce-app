"use client";
import React, { useContext } from "react";
import { Navbar, NavbarCollapse, NavbarToggle } from "flowbite-react";
import { ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "../ui/badge";
import { CartCountContext } from "@/context/CartCountProvider";
import { WishlistCountContext } from "@/context/WishlistCountProvider";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function NAVBAR() {
  const { data: session } = useSession();
  const cartContext = useContext(CartCountContext);
  const numberOfCartItems = cartContext?.numberOfCartItems;
  const WishlistContext = useContext(WishlistCountContext);
  const numberOfWishlistItems = WishlistContext?.numberOfWishlistItems;
  // console.log(session, status);

  const [hidden, setHidden] = useState(false);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY || window.pageYOffset;
        const lastY = lastScrollYRef.current;
        const delta = currentY - lastY;

        // Small threshold to avoid jitter
        const threshold = 5;
        if (Math.abs(delta) > threshold) {
          if (delta > 0 && currentY > 80) {
            // scrolling down
            setHidden(true);
          } else {
            // scrolling up
            setHidden(false);
          }
          lastScrollYRef.current = currentY;
        }
        tickingRef.current = false;
      });
    }

    lastScrollYRef.current = window.scrollY || window.pageYOffset;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleLogout() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <div
      className={`bg-white pt-1 fixed top-0 inset-x-0 z-50 transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <Navbar
        fluid
        rounded
        className=" px-2 sm:px-4 py-2.5 lg:w-[95%] mx-auto text-black"
      >
        <Link href="/">
          <span className="self-center whitespace-nowrap text-3xl font-bold gradient-text">
            Marasi
          </span>
        </Link>
        <div className="flex md:order-2 items-center mt-2 sm:mt-1">
          {session && (
            <div className="space-x-1">
              <Link className="m-0 p-0" href="/cart">
                <button className="mr-3 cursor-pointer relative">
                  {numberOfCartItems! > 0 && (
                    <Badge
                      variant="default"
                      className="absolute top-[-13px] right-[-13px] animate-pulse bg-emerald-700"
                    >
                      {numberOfCartItems}
                    </Badge>
                  )}
                  <ShoppingCart />
                </button>
              </Link>
              <Link href="/wishlist">
                <button className="mr-4 cursor-pointer relative">
                  {numberOfWishlistItems! > 0 && (
                    <Badge
                      variant="default"
                      className="absolute top-[-13px] right-[-13px] animate-pulse bg-red-700"
                    >
                      {numberOfWishlistItems}
                    </Badge>
                  )}
                  <Heart className="text-gray-700 group-hover:text-red-500 transition-colors" />
                </button>
              </Link>
            </div>
          )}

          {!session ? (
            <div className="flex items-center space-x-2">
              <Link 
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                  pathname === "/register" 
                    ? "bg-emerald-600 text-white shadow-lg" 
                    : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                }`} 
                href="/register"
              >
                Register
              </Link>
              <Link 
                className={`px-4 py-2 mr-2 rounded-full font-semibold transition-all duration-200 ${
                  pathname === "/login" 
                    ? "bg-emerald-600 text-white shadow-lg" 
                    : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                }`} 
                href="/login"
              >
                Login
              </Link>
            </div>
          ) : (
            <div>
              <span className="font-bold mr-3 ">hi {session.user?.name}</span>
              <span
                onClick={handleLogout}
                className="mr-3 font-bold text-red-500 cursor-pointer"
              >
                Logout
              </span>
            </div>
          )}
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <Link className={`font-bold ${pathname === "/" ? `active` : null }`} href="/">
            Home
          </Link>
          <Link className={`font-bold ${pathname === "/products" ? `active` : null }`} href="/products">
            Products
          </Link>
          {session && (
            <Link className={`font-bold ${pathname === "/cart" ? `active` : null }`} href="/cart">
              Cart
            </Link>
          )}
          <Link className={`font-bold ${pathname === "/categories" ? `active` : null }`} href="/categories">
            Categories
          </Link>
          <Link className={`font-bold ${pathname === "/brands" ? `active` : null }`}href="/brands">
            Brands
          </Link>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}
