import React, { lazy, useCallback, useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GlobalContextProvider } from '~/globalContext';
import { CustomDeleteDialogProvider } from '~/components';
const PageDashboard = lazy(() => import('~/pages/page-dashboard'));
import PageFather from '~/pages/page-father';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useProfileStore } from '~/store';

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
          <GlobalProfileDemo />
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

const GlobalProfileDemo = () => {
  const { name, year, setName, setYear } = useProfileStore();
  return (
    <React.Fragment>
      <h3 className="text-[#00ff4c] text-xl">profile_name：{name}</h3>
      <div className="text-[#00ff4c]">profile_year：{year}</div>
      <button
        className="px-[5px] border-[1px] rounded-[5px] border-solid border-gray-300 text-[#202324]"
        type="button"
        onClick={() => {
          setName('New-imche');
          setYear(20222);
        }}
      >
        更新
      </button>
      <button
        className="px-[5px] border-[1px] rounded-[5px] border-solid border-gray-300 text-[#202324] ml-3 my-3"
        type="button"
        onClick={() => {
          setName('imche');
          setYear(2022);
        }}
      >
        重置
      </button>
      <hr />
    </React.Fragment>
  );
};
