"use client";

import {
  authSelector,
  cartSelector,
  clearCartLogout,
  logout,
  toggleCartSideBar,
} from "@redux/reducers";
import { deleteToken } from "@utils/LocalStorageHandle";
import { navMenuList } from "@utils/data";
import { default as classNames, default as cn } from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Nav.module.css";
const Nav = ({ hiddenSearch }) => {
  const router = useRouter();
  const { loggedin, user } = useSelector(authSelector);
  const { items } = useSelector(cartSelector);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleLinkTo = (path) => {
    router.push(path, { scroll: true });
  };
  return (
    <div className="fixed w-full top-0 bg-white z-50">
      <nav
        style={{
          zIndex: 10000,
        }}
        className={classNames(styles.navHeader, "flex-between w-full mb-16 ")}
      >
        <div className="md:mr-3">
          <Link
            href="/"
            className={cn(
              "flex gap-2 flex-center max-md:hidden block",
              styles.navLink
            )}
          >
            <Image
              src="/assets/images/logo_home.svg"
              alt="logo"
              width={30}
              height={30}
              className="object-contain flex-shrink-0"
            />
            <p className="logo_text">WATCH WORLD</p>
          </Link>
        </div>
        <div className="flex gap-6 font-satoshi flex-center max-md:text-sm">
          {navMenuList?.map((item, index) => (
            <Link
              key={index}
              href={item.src}
              className={cn("categories", styles.navLink)}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="sm:flex">
          <div className="flex gap-3 md:gap-7">
            {/* <form className="flex items-center">
              <label htmlFor="voice-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="voice-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tìm sản phẩm"
                  required
                />
                <button
                  type="button"
                  className="flex absolute inset-y-0 right-0 items-center pr-3"
                >
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </form> */}
            <div id="shopping-cart" className={"relative  py-2"}>
              <div className="t-0 absolute left-5 bottom-6">
                <p className="flex h-1 w-1 items-center justify-center rounded-full bg-rose-500 p-3 text-neutral-200 bg-rose-600 font-semibold">
                  {items?.length}
                </p>
              </div>

              <Image
                className={classNames(styles.cart, "cart cursor-pointer")}
                src="/assets/icons/cart.svg"
                width={30}
                height={30}
                // onClick={() => handleLinkTo("/cart")}
                onClick={() => {
                  dispatch(toggleCartSideBar());
                }}
                alt=""
              />
            </div>
            <Image
              className="cursor-pointer"
              src="/assets/icons/heart.svg"
              width={30}
              height={30}
              alt=""
            />
            <div className="relative self-center">
              {loggedin ? (
                <Image
                  className="cursor-pointer rounded-full"
                  src={
                    user?.profilePicture
                      ? user?.profilePicture
                      : "/assets/images/avatar-default-circle.png"
                  }
                  alt="Rounded avatar"
                  width={25}
                  height={25}
                  onClick={() => setOpen(!open)}
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              ) : (
                <Image
                  className="cursor-pointer"
                  src={"/assets/icons/user.svg"}
                  width={25}
                  height={25}
                  onClick={() => setOpen(!open)}
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              )}
              <ul
                className={`absolute right-0 w-40 py-2 mt-2 rounded-lg bg-white	 shadow-xl border border-slate-200 z-10 ${open ? "block" : "hidden"
                  }`}
              >
                {loggedin ? (
                  <>
                    <li
                      className="flex w-full items-center px-3 py-2  text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        handleLinkTo("/profile");
                        setOpen(false);
                      }}
                    >
                      Thông tin cá nhân
                    </li>{" "}
                    <li
                      className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        deleteToken();
                        dispatch(logout());
                        dispatch(clearCartLogout());
                        handleLinkTo("/login");
                        setOpen(false);
                      }}
                    >
                      Đăng xuất
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      className="flex w-full items-center px-3 py-2  text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        handleLinkTo("/login");
                        setOpen(false);
                      }}
                    >
                      Đăng nhập
                    </li>
                    <li
                      className="flex w-full items-center px-3 py-2  text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        handleLinkTo("/signup");
                        setOpen(false);
                      }}
                    >
                      Đăng kí
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
