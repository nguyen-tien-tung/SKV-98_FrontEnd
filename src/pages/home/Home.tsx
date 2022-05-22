import React, { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/scss";
import "swiper/scss/pagination";

import "./Home.scss";
import logo from "./logo.png";
import naturalIcon from "./100percentNatural.png";
import advantages from "./advantages.png";
import $axios from "@/axios/index";
import axios from "axios";
import { Category } from "../../types/Category";
import ProductsByCategoryComponent from "@/components/productsByCategory/ProductsByCategoryComponent";
import IProduct from "../../types/IProduct";

const images = [
  { url: "src/public/1banner.png" },
  { url: "src/public/2banner.png" },
  { url: "src/public/3banner.png" },
  { url: "src/public/4banner.png" },
  { url: "src/public/5banner.png" },
];

const Home = () => {
  const [bestSeller, setBestSeller] = useState<IProduct[]>([]);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [category, setCategory] = useState<Category>(Category.ALL);

  useEffect(() => {
    (async () => {
      try {
        const res = await $axios.get("product/best");
        setBestSeller(res.data);
        const allProductsRes = await $axios.get("product");
        setAllProducts(allProductsRes.data);
        console.log(bestSeller, allProducts);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        console.log(category);
      } catch (error) {}
    })();
  }, [category]);

  return (
    <div className="section-no-padding homeSlider">
      <SimpleImageSlider
        width={1440}
        height={600}
        images={images}
        showBullets={true}
        showNavs={true}
      />

      <div className="flex  gap-28 mb-36 section">
        <div className="flex flex-col">
          <img
            src={logo}
            alt="logo"
            className="m-auto"
            style={{ width: "170px", height: "140px" }}
          />
          <h3
            className="text-main-red mt-7 mb-3.5"
            style={{
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "16px",
            }}
          >
            Đôi nét về doanh nghiệp
          </h3>
          <h2
            className="mb-4"
            style={{
              fontSize: "26px",
              fontWeight: "600",
              lineHeight: "30px",
            }}
          >
            Sức khỏe vàng 98{" "}
            <span className="text-main-red">uy tín tạo thương hiệu</span>
          </h2>
          <p
            className="mb-4"
            style={{
              fontSize: "15px",
              fontWeight: "400",
              lineHeight: "20px",
            }}
          >
            Suckhoevang98 ra đời với mục đích đem đến những sản phẩm giá trị,
            thượng hạng cùng chất lượng cao nhất cho cộng đồng.
          </p>
          <p
            className="mb-4"
            style={{
              fontSize: "15px",
              fontWeight: "400",
              lineHeight: "20px",
            }}
          >
            Chúng tôi luôn đặt tiêu chuẩn chất lượng lên hàng đầu và nghiêm ngặt
            tuân thủ các quy định về kiểm định chất lượng. Lựa chọn nguyên liệu
            tỉ mỉ khắt khe. Suckhoevang98 tự hào cung cấp 100%﻿ ﻿nguồn sản phẩm
            thượng hạng, chất lượng cao...
          </p>
          <button
            style={{
              fontSize: "15px",
              fontWeight: "400",
              lineHeight: "18px",
            }}
            className="w-fit border-solid border-2 text-main-red border-main-red rounded-lg px-5 py-2.5"
          >
            Tìm hiểu thêm
          </button>
        </div>
        <div className="flex justify-center items-center">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/QDOfpy6LyRQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div>
        <h2 className="sectionHeader mx-auto mb-14 section">
          Sản phẩm bán chạy
        </h2>

        <div className="flex flex-row justify-between section mb-12">
          {bestSeller &&
            bestSeller.map((product: IProduct, index: number) => (
              <div key={index} className="bestSellerProductCard">
                <img
                  className="border-4 border-main-red mb-4"
                  src={product.mainImage}
                  style={{ width: "286px", height: "232px" }}
                />
                <h3
                  className="text-main-red mb-2"
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    lineHeight: "21px",
                  }}
                >
                  {product.name}
                </h3>
                <p className="mb-1">{product.description}</p>
                <div
                  className="text-main-red text-right"
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    lineHeight: "20px",
                  }}
                >
                  Xem thêm
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-main-yellow pt-8 pb-36 section">
        <div className="section">
          <h3 className="sectionHeader mx-auto">Sản phẩm</h3>
        </div>
        <div className="flex flex-row justify-evenly my-14">
          <h2
            className={`cursor-pointer category  ${
              category == "ALL" ? "text-main-red" : ""
            }`}
            onClick={() => setCategory(Category.ALL)}
          >
            Tất cả sản phẩm
          </h2>
          <h2
            className={`cursor-pointer category ${
              category == "DONG_TRUNG_HA_THAO" ? "text-main-red" : ""
            }`}
            onClick={() => setCategory(Category.DONG_TRUNG_HA_THAO)}
          >
            Đông trùng hạ thảo
          </h2>
          <h2
            className={`cursor-pointer category ${
              category == "YEN_SAO_THUONG_HANG" ? "text-main-red" : ""
            }`}
            onClick={() => setCategory(Category.YEN_SAO_THUONG_HANG)}
          >
            Yến sào thượng hạng
          </h2>
          <h2
            className={`cursor-pointer category ${
              category == "SAFFARON" ? "text-main-red" : ""
            }`}
            onClick={() => setCategory(Category.SAFFARON)}
          >
            Saffaron
          </h2>
          <h2
            className={`cursor-pointer category ${
              category == "NHAN_SAM" ? "text-main-red" : ""
            }`}
            onClick={() => setCategory(Category.NHAN_SAM)}
          >
            Nhân sâm
          </h2>
          <h2
            className={`cursor-pointer category ${
              category == "KHAC" ? "text-main-red" : ""
            }`}
            onClick={() => setCategory(Category.KHAC)}
          >
            Khác
          </h2>
        </div>

        <ProductsByCategoryComponent
          allProducts={allProducts.filter((product: any) =>
            category == "ALL" ? true : product.category == category
          )}
        />
      </div>

      <div className="section mb-14">
        <h2 className="sectionHeader mt-4 mb-8">Tin Tức & thông tin</h2>
        <Swiper
          slidesPerView={3}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
        >
          {Array.from(Array(9).keys()).map((e, index) => (
            <SwiperSlide key={index}>
              <div
                className="flex flex-col justify-items-start cursor-pointer"
                style={{ maxWidth: "354px" }}
              >
                <img
                  src={
                    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  }
                  style={{ width: "354px", height: "253px" }}
                />
                <h2>3 điều bạn nên biết khi mua đông trùng hạ thảo</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled
                </p>
                <div style={{ height: "55px" }}></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div>
        <div className="relative mb-7">
          <img
            src={naturalIcon}
            alt="natural icon"
            className="absolute my-auto"
            style={{ top: 0, bottom: 0 }}
          />
          <h2 className="sectionHeader">Tại sao chọn chúng tôi</h2>
        </div>
        <img
          src={advantages}
          alt=""
          className="w-full"
          style={{ maxHeight: "256px" }}
        />
      </div>
    </div>
  );
};

export default Home;
