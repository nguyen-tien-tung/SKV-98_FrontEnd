import React, { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";

import "./Home.scss";
import logo from "./logo.png";
import naturalIcon from "./100percentNatural.png";
import advantages from "./advantages.png";
import $axios from "@/axios/index";
import { Category } from "../../types/Category";
import ProductsByCategoryComponent from "@/components/productsByCategory/ProductsByCategoryComponent";
import IProduct from "../../types/IProduct";
import News from "@/components/news/News";
import { Link } from "react-router-dom";

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
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
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
            ????i n??t v??? doanh nghi???p
          </h3>
          <h2
            className="mb-4"
            style={{
              fontSize: "26px",
              fontWeight: "600",
              lineHeight: "30px",
            }}
          >
            S???c kh???e v??ng 98{" "}
            <span className="text-main-red">uy t??n t???o th????ng hi???u</span>
          </h2>
          <p
            className="mb-4"
            style={{
              fontSize: "15px",
              fontWeight: "400",
              lineHeight: "20px",
            }}
          >
            Suckhoevang98 ra ?????i v???i m???c ????ch ??em ?????n nh???ng s???n ph???m gi?? tr???,
            th?????ng h???ng c??ng ch???t l?????ng cao nh???t cho c???ng ?????ng.
          </p>
          <p
            className="mb-4"
            style={{
              fontSize: "15px",
              fontWeight: "400",
              lineHeight: "20px",
            }}
          >
            Ch??ng t??i lu??n ?????t ti??u chu???n ch???t l?????ng l??n h??ng ?????u v?? nghi??m ng???t
            tu??n th??? c??c quy ?????nh v??? ki???m ?????nh ch???t l?????ng. L???a ch???n nguy??n li???u
            t??? m??? kh???t khe. Suckhoevang98 t??? h??o cung c???p 100%??? ???ngu???n s???n ph???m
            th?????ng h???ng, ch???t l?????ng cao...
          </p>
          <Link to="/about-us">
            <button
              style={{
                fontSize: "15px",
                fontWeight: "400",
                lineHeight: "18px",
              }}
              className="w-fit border-solid border-2 text-main-red border-main-red rounded-lg px-5 py-2.5"
            >
              T??m hi???u th??m
            </button>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/XxbzU6l94E8"
            title="T??c d???ng c???a m???t ong ?????i v???i s???c kh???e"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div>
        <h2 className="sectionHeader mx-auto mb-14 section">
          S???n ph???m b??n ch???y
        </h2>

        <div className="flex flex-row justify-between section mb-12 gap-2">
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
                <p className="mb-1 whitespace-normal">{product.description}</p>
                <div
                  className="text-main-red text-right"
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    lineHeight: "20px",
                  }}
                >
                  Xem th??m
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-main-yellow pt-8 pb-36 section">
        <div className="section">
          <h3 className="sectionHeader mx-auto">S???n ph???m</h3>
        </div>
        <div className="flex flex-row justify-evenly my-14">
          <h2
            className={`cursor-pointer category  ${
              category == "ALL" ? "text-main-red" : ""
            }`}
            onClick={() => setCategory(Category.ALL)}
          >
            T???t c??? s???n ph???m
          </h2>
          <h2
            className={`cursor-pointer category ${
              category == "DONG_TRUNG_HA_THAO" ? "text-main-red" : ""
            }`}
            onClick={() => setCategory(Category.DONG_TRUNG_HA_THAO)}
          >
            ????ng tr??ng h??? th???o
          </h2>
          <h2
            className={`cursor-pointer category ${
              category == "YEN_SAO_THUONG_HANG" ? "text-main-red" : ""
            }`}
            onClick={() => setCategory(Category.YEN_SAO_THUONG_HANG)}
          >
            Y???n s??o th?????ng h???ng
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
            Nh??n s??m
          </h2>
          <h2
            className={`cursor-pointer category ${
              category == "KHAC" ? "text-main-red" : ""
            }`}
            onClick={() => setCategory(Category.KHAC)}
          >
            Kh??c
          </h2>
        </div>

        <ProductsByCategoryComponent
          allProducts={allProducts.filter((product: any) =>
            category == "ALL" ? true : product.category == category
          )}
        />
      </div>

      <News />

      <div>
        <div className="relative mb-7">
          <img
            src={naturalIcon}
            alt="natural icon"
            className="absolute my-auto"
            style={{ top: 0, bottom: 0 }}
          />
          <h2 className="sectionHeader">T???i sao ch???n ch??ng t??i</h2>
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
