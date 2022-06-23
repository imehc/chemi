import React, { useCallback, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalContextProps, GlobalContextProvider } from '~/globalContext';
import { PageBasic } from '~/pages';
import { useStorage } from '~/hooks';
import AuthRouter from './AuthRouter';

const BaseRouter: React.FC = () => {
  const { getAccessToken, setAccessToken, removeAccessToken } = useStorage();
  const accessToken = useMemo(() => getAccessToken() ?? '', []);
  const setToken = useCallback(
    (token: string, session?: boolean) => setAccessToken(token, session),
    []
  );
  const removeToken = useCallback(() => removeAccessToken(), []);

  const globalValue = useMemo<GlobalContextProps>(() => {
    return {
      accessToken,
      setAccessToken: setToken,
      removeAccessToken: removeToken,
    };
  }, []);
  return (
    <React.Fragment>
      <GlobalContextProvider value={globalValue}>
        <Routes>
          <Route path="login" element={<PageBasic />} />
          <Route path="*" element={<AuthRouter />} />
        </Routes>
      </GlobalContextProvider>
    </React.Fragment>
  );
};
export default BaseRouter;
