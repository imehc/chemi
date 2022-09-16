import React, { useLayoutEffect } from 'react';
import { useShowlDialog } from '~/components';
import { AutoInput } from '~/components/AutoComplete';
import { SearchInput } from '~/components/AutoInput';
import { BaiscSensorDataChart } from '~/components/BasicRechart';
import { MapboxGL } from '~/components/mapbox/MapboxGL';
import { PieChart } from '~/components/PieChart';
import ReCharts from '~/components/ReCharts';

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
  // [...Array(4)].map((_, i) => console.log(i))
  return (
    <div className="bg-blue-50 overflow-hidden">
      {/* <TailWind/> */}
      {/* <div className="h-screen"></div> */}
      <div className="ml-10 w-[353px] h-[179px] bg-white mt-12">
        {/* <PieChart
          data={[
            // 数据
            { value: 10800, name: '一' },
            { value: 735, name: '一二三四五' },
            { value: 5080, name: '一二三' },
            { value: 4484, name: '一二' },
            { value: 1000, name: '一二三四' },
          ]}
          onChange={(idx) => console.log(idx, 'idx...')}
        /> */}
        {/* <SliderDemo /> */}
        {/* <CustomSlider/> */}
        {/* <DatePicker1/> */}
        {/* <DatePicker2 onChange={(date) => console.log(date, 'date')} /> */}
        {/* <DatePicker3/> */}
        {/* <DatePicker onChange={(e) => console.log(e, '日期')} /> */}
      </div>
      {/* <div className='h-5'></div> */}
      {/* <div className='h-screen'></div> */}
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
      {/* <div style={{ marginLeft: '50px', marginTop: '50px' }}> */}
      <div style={{ marginLeft: '50px' }} className="bg-purple-100 w-40">
        {/* <AutoInput/> */}
        <SearchInput/>
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
      <div className="w-[500px] h-[300px]">
        {/* <MapboxGL onResult={(e) => console.log(e, 'result')} /> */}
      </div>
      {/* https://github.com/farhan687/chart-test?utm_source=gold_browser_extension */}
      {/* <ReCharts /> */}
      <div className="w-[500px] h-[200px]">
        {/* <BaiscSensorDataChart
          config={{
            name: '测试',
          }}
          data={[
            { time: '0', temp_value_max: 40, temp_value_min: 15, humidity_value_max: 200, humidity_value_min: 100 },
            { time: '2', temp_value_max: 40, temp_value_min: 20, humidity_value_max: 200, humidity_value_min: 100 },
            { time: '4', temp_value_max: 50, temp_value_min: 15, humidity_value_max: 200, humidity_value_min: 80 },
            { time: '6', temp_value_max: 45, temp_value_min: 20, humidity_value_max: 150, humidity_value_min: 100 },
            { time: '8', temp_value_max: 30, temp_value_min: 10, humidity_value_max: 200, humidity_value_min: 100 },
            { time: '10', temp_value_max: 20, temp_value_min: 10, humidity_value_max: 100, humidity_value_min: 70 },
            { time: '12', temp_value_max: 30, temp_value_min: 20, humidity_value_max: 200, humidity_value_min: 100 },
            { time: '14', temp_value_max: 37, temp_value_min: 10, humidity_value_max: 200, humidity_value_min: 100 },
          ]}
          threshold={[{ value: 223 }]}
        /> */}
      </div>
      {/* <div className="w-[400px] h-[200px] ml-5 mt-5"> */}
      <div className="w-[400px] ml-5 mt-5">
        {/* <LineChart/> */}
        {/* <ReChartsByLineChart/> */}
        {/* <BiaXialLineChart /> */}
      </div>
    </div>
  );
};

const generateMockData = (type: string, min: number, max: number) => {};
export default PageDashboard;
