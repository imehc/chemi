import React, { useRef, useState } from 'react';
import { useAccessToken, useGlobalContext } from '~/globalContext';
import {
  DatePicker,
  DateRange,
  DateRangePicker,
  Pagination,
  Progress,
  useShowlDialog,
} from '~/components';
import { usePosition, useStorage } from '~/hooks';
import { getUnixTime } from 'date-fns';

export const PageDashboard: React.FC = () => {
  const { setAccessToken, removeAccessToken } = useGlobalContext();
  const { position, setInitPosition } = usePosition();
  // setInitPosition('111,34');
  // console.log('position', position);
  const accessToken = useAccessToken();
  const showDelDialog = useShowlDialog();

  // const { set,get } = useStorage();

  const [date, setDate] = useState<DateRange | undefined>({
    startDate: new Date(),
    endDate: new Date('2022-09-25'),
  });

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

      {/* <Pagination
        total={30}
        onChange={(e) => console.log(e)}
        pageSizeOptions={[5, 10, 20, 30]}
      /> */}
      {/* <Progress
        style={{ marginTop: '50px' }}
        value={80}
        width={150}
        round={true}
        height={10}
        indicator={true}
        // baseColor="green"
        // color={['pink', 'orange', 'yellow', 'skyblue']}
        color="skyblue"
      /> */}
      <div style={{ width: 300 }}>
        <DateRangePicker
          onChange={(date) => console.log('选择的日期范围：', date)}
        />
        <DatePicker
          defaultValue={date}
          range
          // allResults
          onChange={(date) => {
            console.log('选择的日期范围：', date);
            setDate(date as DateRange);
          }}
        />
        <button
          onClick={() => {
            setDate(undefined);
          }}
        >
          重置
        </button>
        <br />
      </div>

      <button
        className="px-[5px] border-[1px] rounded-[5px] border-solid border-gray-300 text-[#9adaf3]"
        onClick={async () => {
          const result = await showDelDialog();
          console.log(result, '最终结果');
        }}
      >
        dialog
      </button>
    </React.Fragment>
  );
};
export default PageDashboard;
