import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalContextProvider } from '~/globalContext';
import { PageBasic } from '~/pages';
import AuthRouter from './AuthRouter';

const BaseRouter: React.FC = () => {
  return (
    <GlobalContextProvider>
      <Routes>
        <Route path="login" element={<PageBasic />} />
        <Route path="*" element={<AuthRouter />} />
      </Routes>
    </GlobalContextProvider>
  );
};
export default BaseRouter;
