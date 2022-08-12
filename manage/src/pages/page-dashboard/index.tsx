import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { PageDeviceData } from '~/components/DeviceData';
import { DemoPie } from '~/components/DemoPie';
import { testGetFetch, testPostFetch } from '~/http/apis/test';
import DemoLine from '~/components/DemoLine';
import { Pagination, Progress, ToolTip, useShowlDialog } from '~/components';
import { usePosition } from '~/hooks';
import { DeviceCategoryStatistical } from '~/components/AntVStaistical';
import { SignalOrVoltage } from '~/components/DualAxes';
import { DualChart } from '~/components/DualChart';
import { MapboxGL } from '~/components/MapboxGL';
import { LineChart } from '~/components/Charts/LineChart';
import { ReChartsByLineChart } from '~/components/ReCharts/LineChart';
import { BiaXialLineChart } from '~/components/ReCharts/BiaxialLineChart';
import ReCharts from '~/components/ReCharts';
import { DemoPieForGitHub } from '~/components/DemoPieForGitHub';
import { SliderDemo } from '~/components/Slider';
import { Slider as CustomSlider } from '~/components/CustomSlider';

export const PageDashboard: React.FC = () => {
  // const { setAccessToken, removeAccessToken } = useGlobalContext();
  // const { position, setInitPosition } = usePosition();
  // setInitPosition('111,34');
  // console.log('position', position);
  // const accessToken = useAccessToken();
  // console.log(accessToken, 'token');
  const showDelDialog = useShowlDialog();
  useLayoutEffect(() => {
    // const ss = function () {
    //   let I = 0;
    //   for (let j = 0; j < 1e9; j++) {
    //     I++;
    //   }
    //   console.log(I);
    //   return I;
    // };
    // setTimeout(() => {
    //   ss();
    // }, 0);
    // console.log('其它操作');
  }, []);
  return (
    <React.Fragment>
      <div className="mt-10 ml-10 w-[300px]">
        <SliderDemo />
        {/* <CustomSlider/> */}
      </div>
      {/* <DemoPieForGitHub/> */}
      {/* <button
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
      </button> */}
      {/* <button
        onClick={() => {
          testGetFetch().then((res) => console.log('getfetch',res));
        }}
      >
        getfetch
      </button>
      <button
        onClick={() => {
          testPostFetch()
            .then((res) => console.log('postfetch',res))
            .catch((e) => console.log(e));
        }}
      >
        postfetch
      </button> */}
      {/* <PageDeviceData/> */}
      {/* <DemoLine /> */}
      {/* <DemoPie/> */}
      <div style={{ marginLeft: '50px', marginTop: '50px' }}>
        {/* <ToolTip
          arrow={true}
          content={
            <div
              style={{
                height: '100px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                color: '#bca2e6',
              }}
            >
              <div onClick={()=>{console.log('编辑')}}>编辑</div>
              <div onClick={()=>{console.log('删除')}}>删除</div>
              <div onClick={()=>{console.log('刷新')}}>刷新</div>
            </div>
          }
          trigger="click"
        >
          <div>tip</div>
        </ToolTip> */}
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
      />
      <div style={{ width: '300px', height: '150px',background:"rgba(0,0,0,.1)" }}>
        <DeviceCategoryStatistical
          data={[
            { name: '一', count: 2200 },
            { name: '二', count: 1300 },
            { name: '三', count: 300 },
            { name: '四', count: 200 },
            { name: '五', count: 800 },
          ]}
        /> 
      </div>*/}
      {/* <button
        className="px-[5px] border-[1px] rounded-[5px] border-solid border-gray-300 text-[#9adaf3]"
        onClick={async () => {
          const result = await showDelDialog();
          console.log(result, '最终结果');
        }}
      >
        dialog
      </button> */}
      {/* <div className="w-[600px] h-[200px] bg-red-200 rounded-[10px]">
        <SignalOrVoltage />
      </div> */}
      {/* <div className="w-[600px] bg-red-200 rounded-[10px]">
        <DualChart
          config={{
            color: ['#b656ff', '#ff4ad4'],
            name: '啥',
            min: -9,
            max: 9,
            tickCount: 3,
          }}
          data={[
            ...generateMockData('angleX', -9, 9),
            ...generateMockData('angleY', -9, 9),
          ]}
        />
      </div> */}
      {/* <div className='w-[500px] h-[300px]'>
        <MapboxGL/>
      </div> */}
      {/* https://github.com/farhan687/chart-test?utm_source=gold_browser_extension */}
      {/* <ReCharts/> */}
      <div className="w-[400px] h-[200px] ml-5 mt-5">
        {/* <LineChart/> */}
        {/* <ReChartsByLineChart/> */}
        {/* <BiaXialLineChart /> */}
      </div>
    </React.Fragment>
  );
};

const generateMockData = (type: string, min: number, max: number) => {};
export default PageDashboard;
