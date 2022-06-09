import React from 'react';
import { useAccessToken, useGlobalContext } from '~/GlobalContext';

export const PageDashboard: React.FC = () => {
  const { setAccessToken, removeAccessToken } = useGlobalContext();
  const accessToken = useAccessToken();
  console.log(accessToken, 'token');
  return (
    <React.Fragment>
      <button
        onClick={() => {
          setAccessToken('new token');
        }}
      >
        更新token
      </button>
      <button
        onClick={() => {
          removeAccessToken();
        }}
      >
        删除token
      </button>
    </React.Fragment>
  );
};
export default PageDashboard;
