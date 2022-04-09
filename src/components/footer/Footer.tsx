import React from "react";
import "./Footer.scss";
const Footer = () => {
  return (
    <div className="bg-red-footer pt-8">
      <div className="section flex text-white text-left  justify-between  ">
        <div>
          <img src="src/public/companyLogo.png" alt="" className="footerLogo" />
        </div>
        <div className="mt-6">
          <h2 className="font-semibold">Về chúng tôi</h2>
          <ul className="customUl">
            <li>Giới thiệu</li>
            <li>Đặc quyền VIP</li>
            <li>Liên hệ đối tác</li>
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="font-semibold">Sản phẩm</h2>
          <ul className="customUl">
            <li>Đông trùng hạ thảo</li>
            <li>Tổ yến thượng hạng</li>
            <li>Saffaron</li>
            <li>Nhân sâm</li>
            <li>Khác</li>
          </ul>
        </div>
        <div className="mt-6">
          <div>
            <h2 className="mx-auto font-semibold">Kết nối với chúng tôi</h2>
            <ul className="flex w-100 justify-between mb-20 mt-2">
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
          Hotline: 0963.463.198 <br />
          Địa chỉ: cầu x130 xã Ngũ Hiệp, Thanh Trì, Hà Nội
        </div>
      </div>
    </div>
  );
};

export default Footer;
