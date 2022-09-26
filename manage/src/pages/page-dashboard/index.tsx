import React, { useRef, useState } from 'react';
import { useAccessToken, useGlobalContext } from '~/globalContext';
import {
  Button,
  DatePicker,
  DateRange,
  DateRangePicker,
  Pagination,
  Progress,
  Slider,
  ToolTip,
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

  const [brushIndex, setBrushIndex] = useState<{
    startIndex: number;
    endIndex: number;
  }>({
    startIndex: 0,
    endIndex: 5,
  });

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
      <div className="m-10 w-20">
        <ToolTip
          content={
            <div className="w-12 h-6 flex justify-center items-center rounded-[8px]">
              tool
            </div>
          }
          color="#ff5f5f"
          diretion="top"
          radius="6px"
          arrow
        >
          <div className="bg-blue-200">tooltip</div>
        </ToolTip>
      </div>
      <div className="w-[900px]">
        <Slider
          handleUpdate={(val) => {
            console.log(val, 'val');
            setBrushIndex({ startIndex: val[0], endIndex: val[1] });
          }}
          startIndex={brushIndex.startIndex}
          endIndex={brushIndex.endIndex}
          max={13}
          marks={[
            new Date('2022-09-13T00:00:00+08:00'),
            new Date('2022-09-13T01:00:00+08:00'),
            new Date('2022-09-13T02:00:00+08:00'),
            new Date('2022-09-13T03:00:00+08:00'),
            new Date('2022-09-13T04:00:00+08:00'),
            new Date('2022-09-13T05:00:00+08:00'),
            new Date('2022-09-13T06:00:00+08:00'),
            new Date('2022-09-13T07:00:00+08:00'),
            new Date('2022-09-13T08:00:00+08:00'),
            new Date('2022-09-13T09:00:00+08:00'),
            new Date('2022-09-13T10:00:00+08:00'),
            new Date('2022-09-13T11:00:00+08:00'),
            new Date('2022-09-13T12:00:00+08:00'),
          ]}
        />
      </div>
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
      <div className="w-[120px] h-60 p-2 flex flex-col justify-between items-center bg-purple-100">
        <Button>default</Button>
        <Button theme="primary">primary</Button>
        <Button theme="contained">contained</Button>
        <Button theme="contained" color="delete">
          delete
        </Button>
        <Button theme="primary" color="lightgreen">
          custom
        </Button>
      </div>
    </React.Fragment>
  );
};
export default PageDashboard;
