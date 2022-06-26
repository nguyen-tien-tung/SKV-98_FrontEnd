import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import IProduct from "../../types/IProduct";
import $axios from "@/axios/index";

import policyImg from "./policy.png";
import { UserContext } from "../../contexts/UserContext";

import "./ProductDetails.scss";
const ProductDetails = () => {
  let { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<IProduct>();
  const [number, setNumber] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await $axios.get(`product/${productId}`);
      setProduct(res.data);
      if (res.data.description.length > 350) {
        setNeedSplit(true);
        setDescriptionSplit(true);
      }
    })();
  }, [productId]);

  useEffect(() => {
    if (number > 0) {
      setError("");
    }
  }, [number]);

  const { state, dispatch } = useContext(UserContext);

  const [error, setError] = useState<string>("");

  const [descriptionSplit, setDescriptionSplit] = useState<boolean>(false);
  const [needSplit, setNeedSplit] = useState<boolean>(false);

  const updateCart = async (product: IProduct, quantity: number) => {
    if (number + quantity <= 0) {
      setError("Please select a positive quantity !");
      return;
    }
    const cartTemp = JSON.parse(JSON.stringify(state.user?.shoppingCart));
    if (cartTemp.hasOwnProperty(product.id)) {
      cartTemp[product.id!].quantity =
        cartTemp[product.id!].quantity + quantity;
    } else {
      cartTemp[product.id!] = {
        details: product,
        quantity: quantity,
      };
    }
    try {
      const res = await $axios.patch("user", {
        ...state.user,
        shoppingCart: cartTemp,
      });
      if (res.status == 200) {
        dispatch({ type: "UPDATE_USER", payload: res.data });
      }
    } catch (error) {}
    dispatch({ type: "SET_CART", payload: cartTemp });
    setNumber(0);
  };

  return (
    <>
      {product && (
        <div className="flex flex-row section justify-between mt-10 mb-40">
          <div className="images">
            <img
              src={product.mainImage}
              alt=""
              style={{ width: "500px", height: "500px" }}
              className="mb-4"
            />
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((i) => (
                <img
                  src={i}
                  style={{ width: "110px", height: "110px" }}
                  key={i}
                />
              ))}
            </div>
          </div>
          <div className="productDetails">
            <h1 className="pdh1">{product.name}</h1>
            <div
              className="bg-yellow-600"
              style={{ height: "3px", width: "45px", margin: "10px 0 20px 0" }}
            >
              &nbsp;
            </div>
            <h2 className="text-yellow-600 price">
              {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
            </h2>
            <h2 className="pdText">Sản phẩm: {product.name}</h2>
            <h2 className="pdText">Xuất xứ: {product.origin}</h2>
            <div className="addingSection">
              <div className="pdText flex  items-center">
                <span className="">Số Lượng :</span>
                <FontAwesomeIcon
                  icon={solid("minus")}
                  className="cursor-pointer mx-3 bg-slate-400 p-1 rounded-md"
                  onClick={() =>
                    setNumber((number) => (number != 0 ? number - 1 : number))
                  }
                />
                {number}
                <FontAwesomeIcon
                  icon={solid("plus")}
                  className="cursor-pointer ml-3 bg-slate-400 p-1 rounded-md"
                  onClick={() => setNumber((number) => number + 1)}
                />
              </div>
              {error}
              <div className="flex flex-row mb-8">
                <button
                  className="border-solid border-2 border-main-red flex flex-row rounded-md p-1"
                  onClick={() => updateCart(product, number)}
                >
                  <FontAwesomeIcon
                    icon={solid("cart-plus")}
                    className=" mr-1 pdBtIcon"
                  />
                  <span className="pdBtText">Thêm vào giỏ hàng</span>
                </button>
                <div>&nbsp;</div>
                <button
                  className="border-solid border-2 border-main-red flex flex-row rounded-md p-1"
                  onClick={async () => {
                    await updateCart(product, number);
                    if (number > 0) {
                      navigate("/shopping-cart");
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={solid("money-bill-1-wave")}
                    className=" mr-1 pdBtIcon"
                  />
                  <span className="pdBtText">Thanh toán ngay</span>
                </button>
              </div>
            </div>
            <p className="pdText whitespace-wrap w-full">
              {descriptionSplit
                ? product.description.slice(0, 350)
                : product.description}
              {descriptionSplit && "..."}

              {needSplit && (
                <button
                  className="border-solid border-2 border-main-red flex flex-row rounded-md p-1 mx-auto mt-4"
                  onClick={() => {
                    setDescriptionSplit((pre) => !pre);
                  }}
                >
                  <span className="pdBtText">Tìm hiểu thêm</span>
                </button>
              )}
            </p>
          </div>
          <div className="policy">
            <img src={policyImg} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
