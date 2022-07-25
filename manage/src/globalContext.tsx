import { createContext, useContext, useMemo, useState } from 'react';
import { useStorage } from './hooks';

export interface GlobalContextProps {
  accessToken: string | null;
  setAccessToken: (token: string, session?: boolean) => void;
  removeAccessToken: (session?: boolean) => void;
}

const defaultProps: GlobalContextProps = {
  accessToken: null,
  setAccessToken: () => {},
  removeAccessToken: () => {},
};

const GlobalContext = createContext<GlobalContextProps>(defaultProps);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    getAccessToken,
    setAccessToken: setToken,
    removeAccessToken,
  } = useStorage();

  const [accessToken, setAccessToken] = useState<string | null>(
    () => getAccessToken() ?? getAccessToken(true)
  );

  const handleSetAccessToken = (token: string, isSession?: boolean) => {
    setAccessToken(token);
    setToken(token, isSession);
  };

  const handleRemoveAccessToken = (isSession?: boolean) => {
    setAccessToken(null);
    removeAccessToken(isSession);
  };

  const globalValue = useMemo<GlobalContextProps>(() => {
    return {
      accessToken,
      setAccessToken: handleSetAccessToken,
      removeAccessToken: handleRemoveAccessToken,
    };
  }, [accessToken]);
  // 可以在这里处理以token判断是否跳转到登录页
  // if(!accessToken) {
  //   // 跳转到登录页
  // }
  return (
    <GlobalContext.Provider value={globalValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider'
    );
  }
  return context;
};

export const useAccessToken = () => {
  const { accessToken } = useGlobalContext();
  return accessToken;
};
