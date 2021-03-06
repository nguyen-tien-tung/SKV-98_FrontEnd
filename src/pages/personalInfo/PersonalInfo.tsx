import React, { useLayoutEffect } from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

import defaultAvatar from "./defaultAvatar.png";
import profileIcon from "./profileIcon.png";
import offers from "./offers.svg";
import IconButton from "@mui/material/IconButton/IconButton";
import Avatar from "@mui/material/Avatar/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu/Menu";
import Divider from "@mui/material/Divider/Divider";
import { useForm } from "../../helper/useForm";
import $axios from "@/axios/index";

const PersonalInfo = () => {
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
    username: storageUser.username || "",
    name: storageUser.name || "",
    phoneNumber: storageUser.phoneNumber || "",
    email: storageUser.email || "",
    address: storageUser.address || "",
    dateOfBirth: storageUser.dateOfBirth || "",
  });

  const submitForm: () => void = async () => {
    const res = await $axios.patch("user", values);
    if (res.status == 200) {
      dispatch({ type: "UPDATE_USER", payload: res.data });
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    }
  };
  const { onChange, onSubmit, values } = useForm(submitForm, userInfo);

  const [tabNumber, setTabNumber] = useState<number>(0);

  return (
    <div className="section flex flex-row">
      {/* https://www.npmjs.com/package/react-notifications-component */}
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
              <MenuItem>Xem ???nh ?????i di???n</MenuItem>
              <Divider />
              <MenuItem>T???i l??n ???nh ?????i di???n m???i</MenuItem>
            </Menu>
          </div>
        </div>
        <div className="flex flex-col border-b-2">
          <h3>{state.user?.username}</h3>
          <h3>S???a h??? s??</h3>
        </div>
        <div>
          <img src={profileIcon} alt="" />
        </div>
        <div>
          <h2 className="cursor-pointer" onClick={() => setTabNumber(0)}>
            T??i kho???n c???a t??i
          </h2>
          <h2>H??? s??</h2>
          <h2 className="cursor-pointer" onClick={() => setTabNumber(2)}>
            H???ng th??? th??nh vi??n
          </h2>
          <h2>?????i m???t kh???u</h2>
        </div>
        <div>
          <img src={offers} />
        </div>
        <div>
          <h2>??u ????i</h2>
        </div>
      </div>
      {tabNumber == 0 && (
        <div>
          <h2>H??? s?? c???a t??i</h2>
          <div className="flex flex-col">
            <form onSubmit={onSubmit} className="grid grid-cols-2">
              <label htmlFor="">T??n ????ng nh???p</label>
              <input
                type="text"
                value={values.username}
                onChange={onChange}
                name="username"
              />
              <label htmlFor="">H??? v?? t??n</label>
              <input
                type="text"
                value={values.name}
                onChange={onChange}
                name="name"
              />
              <label htmlFor="">S??? ??i???n tho???i</label>
              <input
                type="text"
                value={values.phoneNumber}
                onChange={onChange}
                name="phoneNumber"
              />
              <label htmlFor="">?????a ch???</label>
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
              <label htmlFor="">Ng??y sinh</label>
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
                  C???p nh???t
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
