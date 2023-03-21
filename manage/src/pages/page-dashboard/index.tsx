import React from 'react';
import { useAccessToken, useGlobalContext } from '~/globalContext';
import { getUnixTime } from 'date-fns';

export const PageDashboard: React.FC = () => {
  const { setAccessToken, removeAccessToken } = useGlobalContext();
  const accessToken = useAccessToken();

  // set("tese_type",JSON.stringify(12345))
  // console.log('类型为：',typeof JSON.parse(get("tese_type") as string))// 为stringify之前的类型

  console.log('getUnixTime:', getUnixTime(new Date())); // 获取秒
  console.log('getTime:', new Date().getTime());

  return (
    <React.Fragment>
      <button
        className="px-[5px] border-[1px] rounded-[5px] border-solid border-gray-300 text-[#202324]"
        onClick={() => {
          setAccessToken('new token');
        }}
      >
        更新token
      </button>
      <button
        className="px-[5px] border-[1px] rounded-[5px] border-solid border-gray-300 text-[#202324]"
        onClick={() => {
          removeAccessToken();
        }}
      >
        删除token
      </button>
      <button
        className="px-[5px] border-[1px] rounded-[5px] border-solid border-gray-300 text-[#202324]"
        onClick={() => {
          console.log(accessToken, 'globalAccessToken');
        }}
      >
        查看token
      </button>
    </React.Fragment>
  );
};
export default PageDashboard;
