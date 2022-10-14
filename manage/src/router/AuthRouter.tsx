import React, { lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageBasic from '~/pages/page-father';

const AuthRouter: React.FC = () => {
  const location = useLocation();
  console.log(location);
  // 未登录跳转
  // if (login) {
  //   return <Navigate to={`/login?continue=${location.pathname}`} />;
  // }
  return (
    <Routes>
      <Route path="/" element={<PageBasic />} />
    </Routes>
  );
};

export default AuthRouter;
