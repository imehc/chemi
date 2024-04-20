import React, { lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Alert } from '@mantine/core';
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
    <ErrorBoundary
      fallback={
        <Alert
          variant="light"
          color="red"
          radius="lg"
          title="Error"
          icon={
            <i className="h-1em i-material-symbols:error-outline-rounded w-1em" />
          }
        >
          Something went wrong
        </Alert>
      }
    >
      <Routes>
        <Route path="/" element={<PageDashboard />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default AuthRouter;
