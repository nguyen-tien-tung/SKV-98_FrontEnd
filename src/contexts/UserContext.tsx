import { createContext, ReactNode } from "react";
import IUser from "../types/IUser";
import { useState } from "react";

interface UserContextProvider {
  children: ReactNode;
}

type UserContextType = {
  user: IUser | null;
  updateUser: (newVal: IUser) => void;
};
export const UserContext = createContext<UserContextType>({
  user: null,
  updateUser: (newVal) => {},
});

const UserContextProvider = ({ children }: UserContextProvider) => {
  const [user, setUser] = useState<IUser | null>(null);

  const updateUser = (newVal: IUser) => {
    setUser(newVal);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
