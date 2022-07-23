import React from "react";
import Logo from "./logo.png";

import "./ContactUs.scss";
import { useForm } from "../../helper/useForm";
import axios from "axios";
import $axios from "@/axios/index";

const icons = [
  "/FB.png",
  "/instagram.png",
  "/Yt.png",
  "/tiktok.png",
  "/zalo.png",
];

const ContactUs = () => {
  const customerComplaintFormData = {
    name: "",
    phoneNumberOrEmail: "",
    content: "",
  };
  const submitForm = async () => {
    try {
      const res = await $axios.post(
        import.meta.env.VITE_API_URL + "complaints",
        values
      );
    } catch (error) {
      console.error(error);
    }
  };

  const { onChange, onSubmit, values } = useForm(
    submitForm,
    customerComplaintFormData
  );
  return (
    <div className="section grid grid-cols-3 grid-rows-2 grid-flow-col gap-10 mt-6">
      <div className="col-span-1 border-b-2">
        <img src={Logo} className="mb-10" />
        <h2>Liên hệ</h2>
      </div>
      <div className="col-span-1 ">
        <input
          type="text"
          placeholder="Tên của bạn"
          className="input-contact"
          value={values.name}
          onChange={onChange}
          name="name"
        />
        <input
          type="text"
          placeholder="Số điện thoại/Email"
          className="input-contact"
          value={values.phoneNumberOrEmail}
          onChange={onChange}
          name="phoneNumberOrEmail"
        />
        <textarea
          placeholder="Thông điệp"
          className="input-contact"
          value={values.content}
          onChange={onChange}
          name="content"
        />
        <div className="w-full text-center mb-8">
          <button className="bg-red-400 rounded-md px-12 py-3">
            <p>Gửi đi</p>
          </button>
        </div>
      </div>
      <div className="col-span-2 border-b-2" style={{ maxWidth: "700px" }}>
        <h2 className="uppercase">Liên hệ với chúng tôi</h2>
        <p>
          Cảm ơn bạn đã đến với Suckhoevang98! Chúc bạn Thân luôn nhẹ nhàng,
          thanh tịnh Tâm luôn An lạc bạn nhé! “Với một đội ngũ tràn đầy sức trẻ,
          nhiệt huyết cộng thêm tình yêu và lòng biết ơn sâu sắc về miền núi
          tuyết – nơi được ân sủng trời đất ban cho những dược liệu vô cùng quý
          báu có tác dụng rất lớn với sức khoẻ của con người, Suckhoevang98 luôn
          tâm nguyện mang đến tận tay người dùng những sản vật quý giá nhất,
          chất lượng tốt nhất, giá tốt nhất để bất cứ ai cũng có thể tiếp cận
          với các sản vật của vùng núi tuyết Hymalaya”.
        </p>
        <p>
          Nếu bạn cần tư vấn ngay xin gọi hotline:{" "}
          <span className="text-main-red">0963.463.198 bạn nhé</span>
        </p>
      </div>
      <div className="col-span-2 ">
        <div className="flex flex-col justify-evenly items-center max-w-xl">
          <h1>Liên hệ với chúng tôi</h1>
          <div className="flex flex-row">
            {icons.map((i) => (
              <img src={i} key={i} />
            ))}
          </div>
          <div className="w-full">
            <h2 className="w-full">
              Chính sách tuyển đối tác là CTV, đại lý, nhà phân phối,... <br />
              vui lòng liên hệ zalo: 0963.463.198
            </h2>
          </div>
          <div>
            <p>
              Mọi liên hệ hoặc góp ý Quý khách hàng vui lòng gửi về địa chỉ sau:
              <br />
              Sức khỏe vàng 98
              <br /> Địa chỉ: Cầu x130, Ngũ Hiệp, Thanh Trì, Hà Nội Hotline:
              0963.463.198 – Email: suckhoevang98@gmail.com
              <br /> Xin chân thành cảm ơn Quý khách!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
