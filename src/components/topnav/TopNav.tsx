import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import "./TopNav.scss";
import { Link } from "react-router-dom";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const TopNav = () => {
  const goto: (
    url: string
  ) => React.MouseEventHandler<HTMLImageElement> | undefined = (url) => {
    window.location.href = url;
    return undefined;
  };
  return (
    <div>
      <div className="flex  bg-main-yellow justify-between section">
        <div className="text-main-red max-w-xl">
          Suckhoevang98 - Tự hào là đơn vị chuyên cung cấp các dòng sản phẩm
          thượng hạng, với chất lượng cao nhất... Hotline: 0963.463.198
        </div>
        <div className="flex flex-wrap">
          <div className="flex items-center">
            <img
              src="src/public/FB.svg"
              alt=""
              onClick={() => goto(import.meta.env.VITE_FACEBOOK_URL as string)}
              className="mr-1.5"
            />
            <img
              src="src/public/instagram.png"
              alt=""
              onClick={() => goto(import.meta.env.VITE_INSTA_URL as string)}
              className="mr-3"
            />
            <img
              src="src/public/Yt.png"
              alt=""
              style={{ width: "35px", height: "35px" }}
              onClick={() => goto(import.meta.env.VITE_YOUTUBE_URL as string)}
              className="mr-2.5"
            />
            <img
              src="src/public/tiktok.png"
              alt=""
              style={{ width: "35px", height: "35px" }}
              onClick={() => goto(import.meta.env.VITE_TIKTOK_URL as string)}
            />
            <img
              src="src/public/zalo.png"
              alt=""
              style={{ width: "50px", height: "50px" }}
              onClick={() => goto(import.meta.env.VITE_ZALO_URL as string)}
              className="mr-6"
            />
          </div>
          <div className="flex items-center">
            <button className="signInSignUpButton mr-1">Đăng ký</button>
            <div
              className="bg-main-red"
              style={{ width: "2px", height: "20px", overflow: "hidden" }}
            ></div>
            <button className="signInSignUpButton ml-1">Đăng nhập</button>
          </div>
        </div>
      </div>

      <div className="flex bg-main-red section items-center ">
        <img
          src="src/public/companyLogo.png"
          alt=""
          style={{ width: "258.26px", height: "250px" }}
          className="mr-20"
        />
        <div className="flex h-fit mr-32">
          <div>
            <div className="search">
              <input type="text" className="searchInput" />
              <button className="searchButton" type="submit">
                <svg
                  width="56"
                  height="40"
                  viewBox="0 0 56 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="56" height="40" rx="12" fill="#C20000" />
                  <rect
                    width="24"
                    height="24"
                    transform="translate(16 8)"
                    fill="#C20000"
                  />
                  <path
                    d="M31.5 22H30.71L30.43 21.73C31.41 20.59 32 19.11 32 17.5C32 13.91 29.09 11 25.5 11C21.91 11 19 13.91 19 17.5C19 21.09 21.91 24 25.5 24C27.11 24 28.59 23.41 29.73 22.43L30 22.71V23.5L35 28.49L36.49 27L31.5 22ZM25.5 22C23.01 22 21 19.99 21 17.5C21 15.01 23.01 13 25.5 13C27.99 13 30 15.01 30 17.5C30 19.99 27.99 22 25.5 22Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
            <div className="flex w-full justify-between px-3">
              <h3>Đông trùng hạ thảo</h3>
              <h3>Tổ yến</h3>
              <h3>Saffaron</h3>
              <h3>Nhân sâm</h3>
              <h3>Khác</h3>
            </div>
          </div>
        </div>
        <div>
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M45.4625 15.4813C45.2708 15.2043 45.0149 14.978 44.7167 14.8216C44.4184 14.6652 44.0867 14.5835 43.75 14.5833H15.277L12.8729 8.81251C12.5576 8.05255 12.0239 7.40332 11.3392 6.94712C10.6545 6.49091 9.84978 6.24829 9.02704 6.25001H4.16663V10.4167H9.02704L18.9104 34.1354C19.0687 34.5149 19.3357 34.8391 19.6779 35.0671C20.0201 35.2951 20.4221 35.4167 20.8333 35.4167H37.5C38.3687 35.4167 39.1458 34.8771 39.452 34.0667L45.702 17.4C45.8202 17.0846 45.8601 16.7453 45.8183 16.4112C45.7766 16.077 45.6545 15.7579 45.4625 15.4813ZM36.0562 31.25H22.2229L17.0145 18.75H40.7437L36.0562 31.25Z"
              fill="white"
            />
            <path
              d="M21.875 43.75C23.6009 43.75 25 42.3509 25 40.625C25 38.8991 23.6009 37.5 21.875 37.5C20.1491 37.5 18.75 38.8991 18.75 40.625C18.75 42.3509 20.1491 43.75 21.875 43.75Z"
              fill="white"
            />
            <path
              d="M36.4584 43.75C38.1843 43.75 39.5834 42.3509 39.5834 40.625C39.5834 38.8991 38.1843 37.5 36.4584 37.5C34.7325 37.5 33.3334 38.8991 33.3334 40.625C33.3334 42.3509 34.7325 43.75 36.4584 43.75Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <div className="flex bg-main-yellow section justify-between items-center">
        <Link to="/">Trang chủ</Link>
        <Link to="/">Giới thiệu</Link>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              Sản phẩm
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Account settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Support
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      License
                    </a>
                  )}
                </Menu.Item>
                <form method="POST" action="#">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="submit"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block w-full text-left px-4 py-2 text-sm"
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <Link to="/">Đặc quyền</Link>
        <Link to="/">Tin tức</Link>
        <Link to="/">Liên hệ</Link>
      </div>
    </div>
  );
};

export default TopNav;
