import { createContext, useContext } from "react";

export interface GlobalContextProps {
  accessToken?: string;
  setAccessToken: (token: string, session?: boolean) => void;
  removeAccessToken: (session?: boolean) => void;
};

const defaultProps: GlobalContextProps = {
  accessToken: undefined,
  setAccessToken: () => { },
  removeAccessToken: () => { },
}

export const GlobalContext = createContext<GlobalContextProps>(defaultProps);

export const GlobalContextProvider = GlobalContext.Provider;

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return context;
}

export const useAccessToken = () => {
  const { accessToken } = useGlobalContext();
  return accessToken;
}