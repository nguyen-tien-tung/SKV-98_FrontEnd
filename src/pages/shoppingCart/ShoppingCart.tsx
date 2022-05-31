import React from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import $axios from "@/axios/index";
import moneyConverter from "@/utils/moneyConverter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link, useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  let navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  const updateCart = async (product: any, quantity: number) => {
    const cartTemp = JSON.parse(JSON.stringify(state.user?.shoppingCart));
    if (cartTemp.hasOwnProperty(product.id)) {
      cartTemp[product.id].quantity = cartTemp[product.id].quantity + quantity;
    } else {
      cartTemp[product.id] = {
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
  };

  return (
    <div className="section flex flex-row justify-between items-center">
      <div className="py-8">
        <table className="border-r-4 table-auto border-separate my-table-spacing text-center">
          <thead className="border-b-2">
            <tr>
              <th>Sản phẩm</th>
              <th>Giá</th>
              <th>Số Lượng</th>
              <th>Tạm tính</th>
            </tr>
          </thead>
          <tbody className="gap-3">
            {state.user?.shoppingCart &&
              Object.keys(state.user?.shoppingCart).map((key) => (
                <tr key={key}>
                  <td className="flex flex-row items-center">
                    <img
                      src={state.user?.shoppingCart[key].details.mainImage}
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                    <span>{state.user?.shoppingCart[key].details.name}</span>
                  </td>
                  <td>{state.user?.shoppingCart[key].details.price}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={solid("minus")}
                      className="cursor-pointer mx-3"
                      onClick={() =>
                        state.user?.shoppingCart[key].quantity >= 1
                          ? updateCart(
                              state.user?.shoppingCart[key].details,
                              -1
                            )
                          : null
                      }
                    />
                    {state.user?.shoppingCart[key].quantity}
                    <FontAwesomeIcon
                      icon={solid("plus")}
                      className="cursor-pointer ml-3"
                      onClick={() =>
                        updateCart(state.user?.shoppingCart[key].details, 1)
                      }
                    />
                  </td>
                  <td>
                    {moneyConverter(
                      state.user?.shoppingCart[key].details.price *
                        state.user?.shoppingCart[key].quantity
                    )}
                    đ
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="px-16 flex-grow flex flex-col items-left h-full ">
        <h1 className="border-b-2">Tổng</h1>
        <h2 className="border-b-4 w-full">
          {state.user?.shoppingCart
            ? moneyConverter(
                Object.values(state.user?.shoppingCart).reduce(
                  (acc, item) => acc + item.details.price * item.quantity,
                  0
                )
              )
            : 0}
          đ
        </h2>

        <h2>Phiếu ưu đãi</h2>
        <input type="text" className="full-width-input" />
        <button
          className="mt-4 bg-cyan-200 border-2 rounded-md text-xl px-4 py-4"
          onClick={() => navigate("/complete-order")}
        >
          Tiến hành thanh toán
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
