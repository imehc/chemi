import React, { useCallback, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalContextProvider } from '~/globalContext';
import type { GlobalContextProps } from '~/globalContext';
import { PageBasic } from '~/pages';
import { useStorage } from '~/hooks';
import AuthRouter from './AuthRouter';
import { CustomDeleteDialogProvider } from '~/components';

const BaseRouter: React.FC = () => {
  return (
    <CustomDeleteDialogProvider>
      <GlobalContextProvider>
        <Routes>
          <Route path="login" element={<PageBasic />} />
          <Route path="*" element={<AuthRouter />} />
        </Routes>
      </GlobalContextProvider>
      </CustomDeleteDialogProvider>
  );
};
export default BaseRouter;
