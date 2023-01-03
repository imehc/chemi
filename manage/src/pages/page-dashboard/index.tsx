import React, { useCallback, useEffect } from 'react';
import { DatePicker, ScrollWrap, Switch, Button, ToolTip } from '~/components';
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

  const randomColor = useCallback(() => {
    return (
      '#' +
      ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6)
    );
  }, []);
  return (
    <React.Fragment>
      <hr />
      {/* <div className="w-60 ml-5 mt-5">
        <DatePicker
          defaultValue={d}
          onChange={(evt) => console.log(evt, 'evt')}
          // type="minute"
          // maxDate={new Date("2022-11")}
        />
      </div> */}
      {/* <div className="w-32 h-20 bg-purple-200 flex justify-center items-center">
        <Switch
          activeBackGround="pink"
          backGround="orange"
          onChange={(d) => console.log('result:', d)}
          value={true}
          disabled
        />
      </div> */}
      <div className="m-12 w-40 h-32 bg-purple-200 flex justify-center items-center">
        {/* <ScrollWrap>
          {[...new Array(15)].map((_, i) => (
            <div
              key={i}
              style={{
                 background: randomColor()
                // background: '#ffffff',
              }}
              className="flex justify-center items-center"
            >
              {i}
            </div>
          ))}
        </ScrollWrap> */}
        <ToolTip
          trigger="click"

          content={
            <div className="p-5 bg-purple-100 absolute flex z-10 justify-center flex-col rounded-lg items-center left-[50%] translate-x-[-50%]">
              <Button
                style={{ marginBottom: '0.5rem' }}
                onClick={() => {
                  console.log('click: 1');
                }}
              >
                按钮一
              </Button>
              <Button
                onClick={() => {
                  console.log('click: 2');
                }}
              >
                按钮二
              </Button>
            </div>
          }
        >
          <Button theme="primary" color="orange">
            more
          </Button>
        </ToolTip>
      </div>
    </React.Fragment>
  );
};

export default PageDashboard;
