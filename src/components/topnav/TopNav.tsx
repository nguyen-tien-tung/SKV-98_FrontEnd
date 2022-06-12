import React, { Fragment, useContext, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import "./TopNav.scss";
import companyLogo from "@/public/companyLogo.png";
import FB from "@/public/FB.svg";
import Ins from "@/public/instagram.png";
import Yt from "@/public/Yt.png";
import Tiktok from "@/public/tiktok.png";
import Zalo from "@/public/zalo.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import $axios from "@/axios/index";
import AdminRoutes from "../adminRoutes/AdminRoutes";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import TextField from "@mui/material/TextField/TextField";
import IProduct from "../../types/IProduct";
import { Stack } from "@mui/material";

import userIcon from "./Icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const TopNav = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      if (!state.user) {
        try {
          const res = await $axios.get("profile");
          dispatch({ type: "UPDATE_USER", payload: res.data });
        } catch (error) {}
      }
    })();
  }, []);
  const goto: (
    url: string
  ) => React.MouseEventHandler<HTMLImageElement> | undefined = (url) => {
    window.location.href = url;
    return undefined;
  };

  const [searchText, setSearchText] = useState<string>("");
  const [options, setOptions] = useState<any[]>([]);
  useEffect(() => {
    if (searchText) {
      const search = setTimeout(async () => {
        const res = await $axios.get("product/search-by-name", {
          params: { name: searchText },
        });
        setOptions(
          res.data.map((i: IProduct) => ({ label: i.name, id: i.id }))
        );
      }, 1000);
      return () => clearTimeout(search);
    }
  }, [searchText]);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  let closeCountDown: any = useRef();
  const closeDropdown = () => {
    closeCountDown.current = setTimeout(() => setIsDropdownOpen(false), 2000);
  };

  const clear = () => {
    clearTimeout(closeCountDown.current);
  };

  return (
    <div>
      <div className=" bg-main-yellow  relative  ">
        <div className="flex justify-between section relative ">
          <div className="text-main-red max-w-xl relative ">
            Suckhoevang98 - Tự hào là đơn vị chuyên cung cấp các dòng sản phẩm
            thượng hạng, với chất lượng cao nhất... Hotline: 0963.463.198
          </div>
          <div className="flex flex-wrap">
            <div className="flex items-center relative ">
              <img
                src={FB}
                alt=""
                onClick={() =>
                  goto(import.meta.env.VITE_FACEBOOK_URL as string)
                }
                className="mr-1.5"
              />
              <img
                src={Ins}
                alt=""
                onClick={() => goto(import.meta.env.VITE_INSTA_URL as string)}
                className="mr-3"
              />
              <img
                src={Yt}
                alt=""
                style={{ width: "35px", height: "35px" }}
                onClick={() => goto(import.meta.env.VITE_YOUTUBE_URL as string)}
                className="mr-2.5"
              />
              <img
                src={Tiktok}
                alt=""
                style={{ width: "35px", height: "35px" }}
                onClick={() => goto(import.meta.env.VITE_TIKTOK_URL as string)}
              />
              <img
                src={Zalo}
                alt=""
                style={{ width: "50px", height: "50px" }}
                onClick={() => goto(import.meta.env.VITE_ZALO_URL as string)}
                className="mr-6"
              />
            </div>
            {state.user ? (
              <div
                className="bg-slate-100  flex flex-col justify-center items-center  "
                style={{ width: "170px" }}
              >
                <div className=" text-main-red font-extrabold flex relative ">
                  <div
                    className="flex flex-row"
                    onMouseOver={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => closeDropdown()}
                  >
                    <img src={userIcon} alt="" className="mr-2" />
                    {state.user.username}
                  </div>
                  {isDropdownOpen && (
                    <div
                      className="absolute bg-white text-black  z-20  top-9"
                      style={{ width: "170px", left: "-32px" }}
                      onMouseEnter={() => clear()}
                      onMouseLeave={() => closeDropdown()}
                    >
                      <ul className="px-2">
                        <li className="cursor-pointer">
                          <Link
                            to="personal-info"
                            style={{ fontSize: "16px", fontWeight: "800" }}
                          >
                            <FontAwesomeIcon
                              icon={solid("user-secret")}
                              className=" mr-1"
                            />
                            <span>Thông tin của tôi</span>
                          </Link>
                        </li>
                        <li
                          className="cursor-pointer"
                          onClick={() => dispatch({ type: "LOG_OUT" })}
                        >
                          <FontAwesomeIcon
                            icon={solid("right-from-bracket")}
                            className=" mr-1"
                          />{" "}
                          <span>Đăng xuất</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <Link to="auth/signup">
                  <button className="signInSignUpButton mr-1">Đăng ký</button>
                </Link>
                <div
                  className="bg-main-red"
                  style={{ width: "2px", height: "20px", overflow: "hidden" }}
                ></div>
                <Link to="auth/login">
                  <button className="signInSignUpButton ml-1">Đăng nhập</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <AdminRoutes />

      <div className=" bg-main-red  ">
        <div className="flex section items-center w-full overflow-hidden">
          <Link to="/">
            <img
              src={companyLogo}
              alt=""
              style={{ width: "255px", height: "255px" }}
              className="mr-20 "
            />
          </Link>
          <div className="flex h-fit mr-20 grow max-w-2xl">
            <div className="w-full">
              <div className="w-full ">
                {/* <input
                  type="text"
                  className="searchInput w-full"
                  value={searchText}
                  onChange={($event) => setSearchText($event.target.value)}
                /> */}
                <Autocomplete
                  inputValue={searchText}
                  onInputChange={(event, newInputValue) => {
                    if (event && event.type == "click") {
                      const item = options.filter(
                        (o) => o.label == newInputValue
                      );
                      navigate(`/product/${item[0].id}`);
                      setSearchText("");
                    } else if (event && event.type == "change") {
                      setSearchText(newInputValue);
                    }
                  }}
                  id="productSearch"
                  options={options}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tìm kiếm sản phẩm"
                      InputLabelProps={{ disabled: true }}
                    />
                  )}
                  className="bg-slate-100 w-full"
                />
                {/* <button className="searchButton" type="submit">
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
                </button> */}
              </div>
              <div className="flex w-full justify-between px-3">
                <h3 className="topNavh3">Đông trùng hạ thảo</h3>
                <h3 className="topNavh3">Tổ yến</h3>
                <h3 className="topNavh3">Saffaron</h3>
                <h3 className="topNavh3">Nhân sâm</h3>
                <h3 className="topNavh3">Khác</h3>
              </div>
            </div>
          </div>
          <Link to="/shopping-cart">
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
          </Link>
        </div>
      </div>

      <div className=" bg-main-yellow ">
        <div className="flex section justify-between items-center">
          <Link to="/">Trang chủ</Link>
          <Link to="about-us">Giới thiệu</Link>
          <Menu as="div" className="relative inline-block text-left ">
            <div>
              <Menu.Button className="inline-flex justify-center items-center w-full customA    ">
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
              <Menu.Items className="origin-top-right absolute z-20 right-0 mt-2 w-56 rounded-md shadow-lg bg-main-yellow ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }: { active: any }) => (
                      <Link
                        to="products-by-category/DONG_TRUNG_HA_THAO"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Đông trùng hạ thảo
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }: { active: any }) => (
                      <Link
                        to="products-by-category/YEN_SAO_THUONG_HANG"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Tổ yến thượng hạng
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }: { active: any }) => (
                      <Link
                        to="products-by-category/SAFFARON"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Saffaron
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }: { active: any }) => (
                      <Link
                        to="products-by-category/NHAN_SAM"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block w-full text-left px-4 py-2 text-sm"
                        )}
                      >
                        Nhân sâm
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }: { active: any }) => (
                      <Link
                        to="products-by-category/KHAC"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block w-full text-left px-4 py-2 text-sm"
                        )}
                      >
                        Khác
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <Link to="/">Đặc quyền</Link>
          <Link to="news">Tin tức</Link>
          <Link to="contact-us">Liên hệ</Link>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
