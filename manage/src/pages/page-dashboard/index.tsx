import React from 'react';
import { useAccessToken, useGlobalContext } from '~/globalContext';
import {
  DateRangePicker,
  Pagination,
  Progress,
  useShowlDialog,
} from '~/components';
import { usePosition, useStorage } from '~/hooks';

export const PageDashboard: React.FC = () => {
  const { setAccessToken, removeAccessToken } = useGlobalContext();
  const { position, setInitPosition } = usePosition();
  // setInitPosition('111,34');
  // console.log('position', position);
  const accessToken = useAccessToken();
  const showDelDialog = useShowlDialog();
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
      {/* <DateRangePicker
        onChange={(date) => console.log('选择的日期范围：', date)}
      /> */}
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
