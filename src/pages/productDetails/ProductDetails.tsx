import React from "react";
import { useParams } from "react-router-dom";
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

const ProductDetails = () => {
  let { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<IProduct>();
  const [number, setNumber] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const res = await $axios.get(`product/${productId}`);
      setProduct(res.data);
    })();
  }, []);

  const { state, dispatch } = useContext(UserContext);

  const updateCart = async (product: IProduct, quantity: number) => {
    if (number + quantity <= 0) return;
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
              style={{ maxWidth: "500px", maxHeight: "500px" }}
              className="mb-4"
            />
            <div className="flex flex-row justify-evenly">
              {product.images.map((i) => (
                <img
                  src={i}
                  style={{ maxWidth: "110px", maxHeight: "110px" }}
                  key={i}
                />
              ))}
            </div>
          </div>
          <div className="productDetails">
            <h1>{product.name}</h1>
            <h2 className="text-yellow-600">
              {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
            </h2>
            <h2>Sản phẩm: {product.name}</h2>
            <div className="addingSection">
              <div>
                <span>Số Lượng :</span>
                <FontAwesomeIcon
                  icon={solid("minus")}
                  className="cursor-pointer mx-3"
                  onClick={() => setNumber((number) => number - 1)}
                />
                {number}
                <FontAwesomeIcon
                  icon={solid("plus")}
                  className="cursor-pointer ml-3"
                  onClick={() => setNumber((number) => number + 1)}
                />
              </div>
              <div className="flex flex-row">
                <button
                  className="border-solid border-2 border-main-red flex flex-row"
                  onClick={() => updateCart(product, number)}
                >
                  <FontAwesomeIcon
                    icon={solid("cart-plus")}
                    className=" mr-1"
                  />
                  <h2>Thêm vào giỏ hàng</h2>
                </button>
                <div>&nbsp;</div>
                <button className="border-solid border-2 border-main-red flex flex-row">
                  <FontAwesomeIcon
                    icon={solid("money-bill-1-wave")}
                    className=" mr-1"
                  />
                  <h2>Thanh toán ngay</h2>
                </button>
              </div>
            </div>
            <p>{product.description}</p>
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
