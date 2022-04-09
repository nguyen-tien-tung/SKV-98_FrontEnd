import { combineReducers } from "@reduxjs/toolkit";
import cart from "../features/shopping-cart/cartSlice";
import auth from "../features/auth/authSlice";
const rootReducer = combineReducers({ cart, auth });

export default rootReducer;
