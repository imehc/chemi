import React, { useCallback, useEffect } from 'react';
import DB from '~/database/indexed_db';

import { useAccessToken, useGlobalContext } from '~/globalContext';

export const PageDashboard: React.FC = () => {
  const { setAccessToken, removeAccessToken } = useGlobalContext();
  const accessToken = useAccessToken();

  const initDb = useCallback(async () => {
    const airbnbDB = new DB('storeName');
    // IndexedDB
    const db = await airbnbDB.openStore({
      // 数据表的名字
      web_user: {
        // 主键
        keyPath: 'userId',
        // 索引列表
        indexs: ['mobile', 'password', 'status'],
      },
    });
    await airbnbDB.updateItem('web_user', { name: '张三', age: 30 });
    const res = await airbnbDB.getAllItem('web_user');
    console.log(res, 'res....');
  }, []);

  useEffect(() => {
    initDb();
  }, []);

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
        className="px-[5px] border-[1px] rounded-[5px] border-solid border-gray-300 text-[#202324] mb-5"
        onClick={() => {
          console.log(accessToken, 'globalAccessToken');
        }}
      >
        查看token
      </button>
      <hr />
    </React.Fragment>
  );
};

export default PageDashboard;
