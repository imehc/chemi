import React, { lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
const PageDashboard = lazy(() => import('~/pages/page-dashboard'));

const AuthRouter: React.FC = () => {
  const location = useLocation();
  console.log(location);
  // 未登录跳转
  // if (login) {
  //   return <Navigate to={`/login?continue=${location.pathname}`} />;
  // }
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<PageDashboard />} />
      </Routes>
    </React.Fragment>
  );
};

export default AuthRouter;
