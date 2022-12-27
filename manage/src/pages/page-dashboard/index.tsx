import React, { useCallback, useEffect } from 'react';
import { DatePicker, Switch } from '~/components';
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
    // initDb();
  }, []);

  const d = new Date('2022-10-03');
  return (
    <React.Fragment>
      <hr />
      <div className="w-60 ml-5 mt-5">
        <DatePicker
          defaultValue={d}
          onChange={(evt) => console.log(evt, 'evt')}
          // type="minute"
          // maxDate={new Date("2022-11")}
        />
      </div>
      <div className="w-30 h-30 bg-purple-200">
        <Switch
          className="ml-10 mt-3"
          activeBackGround="pink"
          backGround="orange"
          onChange={(d) => console.log(d, 'd...')}
          value={true}
        />
      </div>
    </React.Fragment>
  );
};

export default PageDashboard;
