import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import IUser from "../domains/user";

const defaultUserValue: IUser = {
  username: "",
  avatarUrl: "https://via.placeholder.com/32",
};

export interface IUserContextValue {
  userData: IUser;
  setUserData(user: IUser): void;
}

// this merely to demonstrate useContext
export const UserContext = createContext<IUserContextValue>({
  userData: defaultUserValue,
  setUserData(): void {
    console.error("Please add provider to App root");
  },
});

export const useUserContext = () => useContext(UserContext);

interface IUserContextProvider {
  children: ReactNode;
}

export const UserContextProvider = (props: IUserContextProvider) => {
  const { children } = props;
  const [userData, setUserData] = useState<IUser>(defaultUserValue);

  const value = useMemo(
    () => ({ userData, setUserData }),
    [userData, setUserData]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
