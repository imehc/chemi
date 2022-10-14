import React, { lazy, useCallback, useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GlobalContextProvider } from '~/globalContext';
import { CustomDeleteDialogProvider } from '~/components';
const PageDashboard = lazy(() => import('~/pages/page-dashboard'));
import PageFather from '~/pages/page-father';
import { QueryClient, QueryClientProvider } from 'react-query';

const BaseRouter: React.FC = () => {
  const handleHttpError = useCallback((err: unknown) => {
    console.log('出错了....', err);
  }, []);
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            onError: handleHttpError,
          },
          mutations: {
            onError: handleHttpError,
          },
        },
      }),
    [handleHttpError]
  );
  return (
    <QueryClientProvider client={queryClient}>
      <CustomDeleteDialogProvider>
        <GlobalContextProvider>
          <Routes>
            <Route path="/" element={<PageDashboard />} />
            {/* 注意这后面要加* */}
            <Route path="father/*" element={<PageFather />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </GlobalContextProvider>
      </CustomDeleteDialogProvider>
    </QueryClientProvider>
  );
};
export default BaseRouter;
