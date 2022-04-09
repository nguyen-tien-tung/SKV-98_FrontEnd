import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CartState {
  cart: { [key: string]: number };
}

const initialState: CartState = {
  cart: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOne: (state, { payload }: PayloadAction<string>) => {
      state.cart[payload]
        ? (state.cart[payload] = state.cart[payload] + 1)
        : (state.cart[payload] = 1);
    },
    removeOne: (state, { payload }: PayloadAction<string>) => {
      state.cart[payload] > 1
        ? (state.cart[payload] = state.cart[payload] - 1)
        : delete state.cart[payload];
    },
    removeOneProduct: (state, { payload }: PayloadAction<string>) => {
      delete state.cart[payload];
    },
    removeAllProduct: (state) => {
      state.cart = {};
    },
  },
});
export const { addOne, removeOne, removeAllProduct, removeOneProduct } =
  cartSlice.actions;
export const cartSelector = (state: RootState) => state.cart;
export default cartSlice.reducer;
