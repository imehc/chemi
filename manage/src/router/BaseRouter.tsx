import React, { useCallback, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalContextProvider } from '~/globalContext';
import type { GlobalContextProps } from '~/globalContext';
import { PageBasic } from '~/pages';
import { useStorage } from '~/hooks';
import AuthRouter from './AuthRouter';
import { CustomDeleteDialogProvider } from '~/components';

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
    <CustomDeleteDialogProvider>
      <GlobalContextProvider value={globalValue}>
        <Routes>
          <Route path="login" element={<PageBasic />} />
          <Route path="*" element={<AuthRouter />} />
        </Routes>
      </GlobalContextProvider>
      </CustomDeleteDialogProvider>
  );
};
export default BaseRouter;
