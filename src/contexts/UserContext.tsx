import { createContext, Dispatch, ReactNode, useReducer } from "react";
import IUser from "../types/IUser";

interface IAction {
  type: ActionType;
  payload?: any;
}
interface IState {
  user: IUser | null;
  // * key: ProductID, Value: {details,quantity}
  shoppingCart: { [key: string]: { details: object; quantity: number } } | null;
}

export const initialState: IState = {
  user: null,
  shoppingCart: null,
};
interface UserContextProvider {
  children: ReactNode;
}

type UserContextType = {
  state: IState;
  dispatch: Dispatch<IAction>;
};
export const UserContext = createContext<UserContextType>({
  state: initialState,
  dispatch: () => {},
});

type ActionType =
  | "UPDATE_USER"
  | "LOG_OUT"
  | "ADD_TO_CART"
  | "REMOVE_FROM_CART"
  | "CLEAR_CART";

const reducer = (state: IState = initialState, action: IAction) => {
  let cartTemp;
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    case "LOG_OUT":
      localStorage.removeItem("userInfo");
      localStorage.removeItem("accessToken");
      return { ...state, user: null };
    case "ADD_TO_CART":
      cartTemp = JSON.parse(JSON.stringify(state.shoppingCart));
      if (cartTemp.hasOwnProperty(action.payload.productId)) {
        cartTemp[action.payload.productId].quantity =
          cartTemp[action.payload.productId].quantity + action.payload.quantity;
      } else {
        cartTemp[action.payload.productId] = {
          details: action.payload.details,
          quantity: action.payload.details,
        };
      }
      return { ...state, shoppingCart: cartTemp };
    case "REMOVE_FROM_CART":
      cartTemp = JSON.parse(JSON.stringify(state.shoppingCart));
      if (cartTemp.hasOwnProperty(action.payload.productId)) {
        cartTemp[action.payload.productId].quantity =
          cartTemp[action.payload.productId].quantity - action.payload.quantity;
      }
      return { ...state, shoppingCart: cartTemp };
    case "CLEAR_CART":
      return { ...state, shoppingCart: null };
    default:
      return state;
  }
};
const UserContextProvider = ({ children }: UserContextProvider) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch } as UserContextType}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
