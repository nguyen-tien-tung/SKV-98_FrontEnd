import React from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const ShoppingCart = () => {
  const { state, dispatch } = useContext(UserContext);

  return (
    <>
      <div>ShoppingCart</div>
      {state.shoppingCart &&
        Object.keys(state.shoppingCart).map((item, index) => (
          <div key={index}>
            {[item]}
            {state.shoppingCart}
          </div>
        ))}
    </>
  );
};

export default ShoppingCart;
