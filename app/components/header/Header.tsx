"use client";
// import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import ThemeContext from "../../context/themeContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useProductCartList } from "@/app/context/ProductCountContext";
import { getProductCountFromCartList } from "@/utils/costCalculation";

// Header for every page for creating navigation
const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const { productCartList } = useProductCartList();
  const productCount = getProductCountFromCartList(productCartList);

  const { data: session } = useSession();

  return (
    <header className="py-10 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between">
      <div className="flex items-center w-full md:2/3">
        <Link href="/" className="font-black text-tertiary-dark text-[40px]">
          GatiShakti
        </Link>
        <ul className="flex items-center ml-5">
          <li className="flex items-center">
            {session?.user ? (
              <Link href={`users/${session.user.id}`}>
                {session.user.image ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={session.user.image}
                      alt={session.user.name!}
                      width={40}
                      height={40}
                      className="scale-animation img"
                    />
                  </div>
                ) : (
                  <FaUserCircle className="cursor-pointer" />
                )}
              </Link>
            ) : (
              <Link href="/auth">
                <FaUserCircle className="cursor-pointer" />
              </Link>
            )}
          </li>
          <li className="ml-2">
            {darkTheme ? (
              <MdOutlineLightMode
                className="cursor-pointer"
                onClick={() => {
                  setDarkTheme(false);
                  localStorage.removeItem("hotel-theme");
                }}
              />
            ) : (
              <MdDarkMode
                className="cursor-pointer"
                onClick={() => {
                  setDarkTheme(true);
                  localStorage.setItem("hotel-theme", "true");
                }}
              />
            )}
          </li>
          <li className="ml-2 relative">
            <Link href="/checkout">
              <FaShoppingCart className="cursor-pointer" />
              {productCount > 0 ? (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center p-0.5 text-sm font-bold leading-none text-red-600 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-100">
                  {productCount}
                </span>
              ) : (
                ""
              )}
            </Link>
          </li>
        </ul>
      </div>
      <ul className="flex items-center justify-between w-full md:w-1/3 mt-4">
        <li className="hover:-translate-y-2 duration-500 transition-all">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:-translate-y-2 duration-500 transition-all">
          <Link href="/materials">Raw Materials</Link>
        </li>
        <li className="hover:-translate-y-2 duration-500 transition-all">
          <Link href="/services">Services</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
