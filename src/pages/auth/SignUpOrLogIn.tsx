import React from "react";
import { useState, useEffect } from "react";
import "./SignUpOrLogIn.scss";

import logo from "./logo.png";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useForm } from "../../helper/useForm";
import $axios from "@/axios/index";

const SignUpOrLogIn = () => {
  const { action } = useParams();
  let navigate = useNavigate();

  const userInfo: {
    username: "";
    password: "";
    phoneNumber: "";
    usernameOrPhoneNumber: "";
  } = {
    username: "",
    password: "",
    phoneNumber: "",
    usernameOrPhoneNumber: "",
  };

  const handleAuth = async () => {
    console.log("HANDLE AUTH");
    const res = await $axios.post(
      `user${action == "signin" ? "/signin" : ""}`,
      { ...values, phoneNumber: +values.phoneNumber }
    );
  };
  const { onChange, onSubmit, values } = useForm(handleAuth, userInfo);

  return (
    <div>
      <div className="section">
        <h3 className="h3Auth">
          <span style={{ color: "#FFDD55" }}>Suckhoevang98 </span>
          <span className="text-main-red">
            {action == "signin" ? "Đăng nhập" : "Đăng ký"}
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
              {action == "signin" ? "Đăng nhập" : "Đăng ký"}
            </h2>
            {action == "signin" && (
              <input
                className=""
                type="text"
                placeholder="Tên đăng nhập/ Số điện thoại"
                value={values.usernameOrPhoneNumber}
                onChange={onChange}
                name="usernameOrPhoneNumber"
              />
            )}
            {!(action == "signin") && (
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
            {!(action == "signin") && (
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
              {action == "signin" ? "Đăng nhập" : "Đăng ký"}
            </button>
            <h4 className="h4Auth whitespace-nowrap ">
              Bạn {action == "signin" ? "chưa" : "đã"} có tài khoản?{" "}
              <span
                className="text-main-red cursor-pointer"
                onClick={() =>
                  navigate(
                    action == "signin" ? "/auth/signup" : "/auth/signin",
                    {
                      replace: true,
                    }
                  )
                }
              >
                {action == "signin" ? "Đăng ký ngay" : "Đăng nhập"}
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
                <img src="src/public/FB.svg" />
              </li>
              <li>
                <img src="src/public/instagram.png" />
              </li>
              <li>
                <img src="src/public/Yt.png" />
              </li>
              <li>
                <img src="src/public/tiktok.png" />
              </li>
              <li>
                <img src="src/public/zalo.png" />
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