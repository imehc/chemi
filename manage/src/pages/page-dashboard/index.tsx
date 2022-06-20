import React from 'react';
import { useAccessToken, useGlobalContext } from '~/GlobalContext';
import { testGetFetch, testPostFetch } from '~/http/apis/test';

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
      <button
        onClick={() => {
          testGetFetch().then((res) => console.log(res));
        }}
      >
        getfetch
      </button>
      <button
        onClick={() => {
          testPostFetch()
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
        }}
      >
        postfetch
      </button>
    </React.Fragment>
  );
};
export default PageDashboard;
