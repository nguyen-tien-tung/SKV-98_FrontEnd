import React from "react";
import { useState, useEffect, useContext } from "react";
import "./SignUpOrLogIn.scss";
import FB from "@/public/FB.svg";
import Ins from "@/public/instagram.png";
import Yt from "@/public/Yt.png";
import Tiktok from "@/public/tiktok.png";
import Zalo from "@/public/zalo.png";

import logo from "./logo.png";
import {
  useParams,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useForm } from "../../helper/useForm";
import $axios from "@/axios/index";
import { UserContext } from "../../contexts/UserContext";

const SignUpOrLogIn = () => {
  const { state, dispatch } = useContext(UserContext);

  const action = useLocation().pathname.split("/").slice(-1)[0];
  let navigate = useNavigate();

  const userInfo: {
    username: string;
    password: string;
    phoneNumber: string;
    usernameOrPhoneNumber: string;
  } = {
    username: "",
    password: "",
    phoneNumber: "",
    usernameOrPhoneNumber: "",
  };

  const handleAuth = async () => {
    try {
      const res = await $axios.post(
        `${action == "login" ? "auth/login" : "user"}`,
        {
          ...(action == "login"
            ? {
                usernameOrPhoneNumber: values.usernameOrPhoneNumber,
                password: values.password,
              }
            : {
                username: values.username,
                password: values.password,
                phoneNumber: values.phoneNumber,
              }),
        }
      );
      if (res.status == 201 && res.data.accessToken && res.data.userInfo) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.accessToken)
        );

        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            id: res.data.userInfo.id,
            username: res.data.userInfo.username,
          })
        );
        dispatch({ type: "UPDATE_USER", payload: res.data.userInfo });
        navigate("/");
      } else if (res.status == 201) {
        navigate("/auth/login");
      }
    } catch (error) {}
  };
  const { onChange, onSubmit, values } = useForm(handleAuth, userInfo);

  return (
    <div>
      <div className="section">
        <h3 className="h3Auth">
          <span style={{ color: "#FFDD55" }}>Suckhoevang98 </span>
          <span className="text-main-red">
            {action == "login" ? "Đăng nhập" : "Đăng ký"}
          </span>
        </h3>
      </div>
      <div className="bg-main-red ">
        <div className="flex justify-evenly items-center redSection section">
          <img src={logo} alt="company logo" className="companyLogo" />
          <form
            className="bg-white flex flex-col authForm gap-7"
            onSubmit={onSubmit}
          >
            <h2 style={{ fontWeight: 600, lineHeight: "21px" }}>
              {action == "login" ? "Đăng nhập" : "Đăng ký"}
            </h2>
            {action == "login" && (
              <input
                className=""
                type="text"
                placeholder="Tên đăng nhập/ Số điện thoại"
                value={values.usernameOrPhoneNumber}
                onChange={onChange}
                name="usernameOrPhoneNumber"
              />
            )}
            {!(action == "login") && (
              <input
                className=""
                type="text"
                placeholder="Tên đăng nhập"
                value={values.username}
                onChange={onChange}
                name="username"
              />
            )}

            <input
              className=""
              type="password"
              placeholder="Mật khẩu"
              value={values.password}
              onChange={onChange}
              name="password"
            />
            {!(action == "login") && (
              <input
                className=""
                type="text"
                placeholder="Số điện thoại"
                value={values.phoneNumber}
                onChange={onChange}
                name="phoneNumber"
              />
            )}
            <button className="authFormButton text-main-red" type="submit">
              {action == "login" ? "Đăng nhập" : "Đăng ký"}
            </button>
            <h4 className="h4Auth whitespace-nowrap ">
              Bạn {action == "login" ? "chưa" : "đã"} có tài khoản?{" "}
              <span
                className="text-main-red cursor-pointer"
                onClick={() =>
                  navigate(action == "login" ? "/auth/signup" : "/auth/login", {
                    replace: true,
                  })
                }
              >
                {action == "login" ? "Đăng ký ngay" : "Đăng nhập"}
              </span>
            </h4>
          </form>
        </div>
      </div>
      <div className="section flex text-main-red text-left mt-6 justify-evenly">
        <div className="">
          Về chúng tôi
          <ul className="customUl">
            <li>Giới thiệu</li>
            <li>Đặc quyền VIP</li>
            <li>Liên hệ đối tác</li>
          </ul>
        </div>
        <div>
          Sản phẩm
          <ul className="customUl">
            <li>Đông trùng hạ thảo</li>
            <li>Tổ yến thượng hạng</li>
            <li>Saffaron</li>
            <li>Nhân sâm</li>
            <li>Khác</li>
          </ul>
        </div>
        <div>
          <div className="text-center">
            Kết nối với chúng tôi
            <ul className="flex w-100 justify-between mb-14 mt-2">
              <li>
                <img src={FB} />
              </li>
              <li>
                <img src={Ins} />
              </li>
              <li>
                <img src={Yt} />
              </li>
              <li>
                <img src={Tiktok} />
              </li>
              <li>
                <img src={Zalo} />
              </li>
            </ul>
          </div>
          Suckhoevang98 <br /> Hotline: 0963.463.198 <br />
          Địa chỉ: cầu x130 xã Ngũ Hiệp, Thanh Trì, Hà Nội
        </div>
      </div>
    </div>
  );
};

export default SignUpOrLogIn;
