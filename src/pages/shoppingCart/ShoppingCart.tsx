import React from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import $axios from "@/axios/index";
import moneyConverter from "@/utils/moneyConverter";

const ShoppingCart = () => {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    console.log(state);
  }, []);

  // const updateCart = async () => {
  //   const res = await $axios.patch("user", {
  //     shoppingCart: state.shoppingCart,
  //   });
  // };

  return (
    <>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số Lượng</th>
            <th>Tạm tính</th>
          </tr>
        </thead>
        <tbody>
          {state.user?.shoppingCart &&
            Object.keys(state.user?.shoppingCart).map((key) => (
              <tr key={key}>
                <td>{state.user?.shoppingCart[key].details.name}</td>
                <td>{state.user?.shoppingCart[key].details.price}</td>
                <td>{state.user?.shoppingCart[key].quantity}</td>
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
      </table>{" "}
    </>
  );
};

export default ShoppingCart;
