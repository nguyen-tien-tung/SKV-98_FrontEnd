import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

import defaultAvatar from "./defaultAvatar.png";
import profileIcon from "./profileIcon.png";
import offers from "./offers.svg";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import IconButton from "@mui/material/IconButton/IconButton";
import Avatar from "@mui/material/Avatar/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu/Menu";
import Divider from "@mui/material/Divider/Divider";
import IUser from "@/types/IUser";
import { useForm } from "../../helper/useForm";
import $axios from "@/axios/index";
import { Notification } from "@/components/notification/Notification";
import { SEVERITY } from "../../types/SeverityType";
import { useRef } from "react";

const PersonalInfo = () => {
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<SEVERITY>("success");
  const notiRef = useRef<any>(null);

  const { state, dispatch } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const storageUser = JSON.parse(localStorage.getItem("userInfo")!);
  const [userInfo, setUserInfo] = useState<any>({
    username: storageUser.username,
    name: storageUser.name,
    phoneNumber: storageUser.phoneNumber,
    email: storageUser.email,
    address: storageUser.address,
    dateOfBirth: storageUser.dateOfBirth,
  });

  const submitForm: () => void = async () => {
    const res = await $axios.patch("user", values);
    if (res.status == 200) {
      setMessage("Thay đổi thông tin cá nhân thành công");
      setSeverity("success");
      if (notiRef.current) notiRef?.current?.handleOpenNoti();
      dispatch({ type: "UPDATE_USER", payload: res.data });
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    }
  };
  const { onChange, onSubmit, values } = useForm(submitForm, userInfo);

  const [tabNumber, setTabNumber] = useState<number>(0);

  return (
    <div className="section flex flex-row">
      <Notification message={message} severity={severity} ref={notiRef} />
      <div className="grid grid-cols-2 grid-rows-3">
        <div className="flex border-b-2">
          <div>
            {state.user?.avatar ? (
              <IconButton
                onContextMenu={handleClick}
                size="small"
                sx={{ p: 0 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 45, height: 45 }} src={defaultAvatar} />
              </IconButton>
            ) : (
              <IconButton
                onContextMenu={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 45, height: 45 }} src={defaultAvatar} />
              </IconButton>
            )}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  left: 60,
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  ml: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 10,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "left", vertical: "top" }}
              anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            >
              <MenuItem>Xem ảnh đại diện</MenuItem>
              <Divider />
              <MenuItem>Tải lên ảnh đại diện mới</MenuItem>
            </Menu>
          </div>
        </div>
        <div className="flex flex-col border-b-2">
          <h3>{state.user?.username}</h3>
          <h3>Sửa hồ sơ</h3>
        </div>
        <div>
          <img src={profileIcon} alt="" />
        </div>
        <div>
          <h2 className="cursor-pointer" onClick={() => setTabNumber(0)}>
            Tài khoản của tôi
          </h2>
          <h2>Hồ sơ</h2>
          <h2 className="cursor-pointer" onClick={() => setTabNumber(2)}>
            Hạng thẻ thành viên
          </h2>
          <h2>Đổi mật khẩu</h2>
        </div>
        <div>
          <img src={offers} />
        </div>
        <div>
          <h2>Ưu đãi</h2>
        </div>
      </div>
      {tabNumber == 0 && (
        <div>
          <h2>Hồ sơ của tôi</h2>
          <div className="flex flex-col">
            <form onSubmit={onSubmit} className="grid grid-cols-2">
              <label htmlFor="">Tên đăng nhập</label>
              <input
                type="text"
                value={values.username}
                onChange={onChange}
                name="username"
              />
              <label htmlFor="">Họ và tên</label>
              <input
                type="text"
                value={values.name}
                onChange={onChange}
                name="name"
              />
              <label htmlFor="">Số điện thoại</label>
              <input
                type="text"
                value={values.phoneNumber}
                onChange={onChange}
                name="phoneNumber"
              />
              <label htmlFor="">Địa chỉ</label>
              <input
                type="text"
                value={values.address}
                onChange={onChange}
                name="address"
              />
              <label htmlFor="">Email</label>
              <input
                type="text"
                value={values.email}
                onChange={onChange}
                name="email"
              />
              <label htmlFor="">Ngày sinh</label>
              <input
                type="text"
                value={values.dateOfBirth}
                onChange={onChange}
                name="dateOfBirth"
              />
              <div className="col-span-2 text-center py-4">
                <button
                  type="submit"
                  className="border-2 rounded-lg bg-red-700 text-white px-3"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {tabNumber == 2 && state.user?.loyaltySetting && (
        <div>
          {Object.keys(state.user?.loyaltySetting).map((k: string) => (
            <div>
              {k} {state.user?.loyaltySetting[k]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
