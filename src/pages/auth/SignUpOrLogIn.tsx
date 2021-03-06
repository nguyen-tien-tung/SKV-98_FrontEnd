import React from "react";
import { useState, useEffect, useContext } from "react";
import "./SignUpOrLogIn.scss";
import FB from "/FB.png";
import Ins from "/instagram.png";
import Yt from "/Yt.png";
import Tiktok from "/tiktok.png";
import Zalo from "/zalo.png";
import { VariantType, useSnackbar } from "notistack";

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
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant: VariantType, message: string) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

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
        $axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`;
        localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
        dispatch({ type: "UPDATE_USER", payload: res.data.userInfo });
        handleClickVariant(
          "success",
          "Welcome back " + res.data.userInfo.username
        );
        navigate("/");
      } else if (res.status == 201) {
        navigate("/auth/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const { onChange, onSubmit, values } = useForm(handleAuth, userInfo);

  return (
    <div>
      <div className="section">
        <h3 className="h3Auth">
          <span style={{ color: "#FFDD55" }}>Suckhoevang98 </span>
          <span className="text-main-red">
            {action == "login" ? "????ng nh???p" : "????ng k??"}
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
              {action == "login" ? "????ng nh???p" : "????ng k??"}
            </h2>
            {action == "login" && (
              <input
                className=""
                type="text"
                placeholder="T??n ????ng nh???p/ S??? ??i???n tho???i"
                value={values.usernameOrPhoneNumber}
                onChange={onChange}
                name="usernameOrPhoneNumber"
              />
            )}
            {!(action == "login") && (
              <input
                className=""
                type="text"
                placeholder="T??n ????ng nh???p"
                value={values.username}
                onChange={onChange}
                name="username"
              />
            )}

            <input
              className=""
              type="password"
              placeholder="M???t kh???u"
              value={values.password}
              onChange={onChange}
              name="password"
            />
            {!(action == "login") && (
              <input
                className=""
                type="text"
                placeholder="S??? ??i???n tho???i"
                value={values.phoneNumber}
                onChange={onChange}
                name="phoneNumber"
              />
            )}
            <button className="authFormButton text-main-red" type="submit">
              {action == "login" ? "????ng nh???p" : "????ng k??"}
            </button>
            <h4 className="h4Auth whitespace-nowrap ">
              B???n {action == "login" ? "ch??a" : "????"} c?? t??i kho???n?{" "}
              <span
                className="text-main-red cursor-pointer"
                onClick={() =>
                  navigate(action == "login" ? "/auth/signup" : "/auth/login", {
                    replace: true,
                  })
                }
              >
                {action == "login" ? "????ng k?? ngay" : "????ng nh???p"}
              </span>
            </h4>
          </form>
        </div>
      </div>
      <div className="section flex text-main-red text-left mt-6 justify-evenly">
        <div className="">
          V??? ch??ng t??i
          <ul className="customUl">
            <li>Gi???i thi???u</li>
            <li>?????c quy???n VIP</li>
            <li>Li??n h??? ?????i t??c</li>
          </ul>
        </div>
        <div>
          S???n ph???m
          <ul className="customUl">
            <li>????ng tr??ng h??? th???o</li>
            <li>T??? y???n th?????ng h???ng</li>
            <li>Saffaron</li>
            <li>Nh??n s??m</li>
            <li>Kh??c</li>
          </ul>
        </div>
        <div>
          <div className="text-center">
            K???t n???i v???i ch??ng t??i
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
          ?????a ch???: c???u x130 x?? Ng?? Hi???p, Thanh Tr??, H?? N???i
        </div>
      </div>
    </div>
  );
};

export default SignUpOrLogIn;
