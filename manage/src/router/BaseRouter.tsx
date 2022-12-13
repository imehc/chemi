import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageBasic } from '~/pages';
import AuthRouter from './AuthRouter';

const BaseRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<PageBasic />} />
      <Route path="*" element={<AuthRouter />} />
    </Routes>
  );
};
export default BaseRouter;
