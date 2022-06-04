import { createContext, Dispatch, ReactNode, useReducer } from "react";
import IUser from "../types/IUser";

interface IAction {
  type: ActionType;
  payload?: any;
}
interface IState {
  user: IUser | null;
  // * key: ProductID, Value: {details,quantity}
}

export const initialState: IState = {
  user: null,
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
  | "SET_CART"
  | "ADD_TO_CART"
  | "REMOVE_FROM_CART"
  | "CLEAR_CART";

const reducer = (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    case "LOG_OUT":
      localStorage.clear();
      return { ...state, user: null };
    case "SET_CART":
      return {
        ...state,
        user: { ...state.user, shoppingCart: action.payload },
      };
    case "CLEAR_CART":
      return { ...state, user: { ...state.user, shoppingCart: {} } };
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
