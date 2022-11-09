import React from 'react';
import { D3_3 } from '~/components/D3_3';
import { LineChart } from '~/components/D3_3_Modify';
import { Data, data, data2, ObjectData } from '~/components/D3_3_Modify/data';
// import { LineChart2 } from '~/components/D3_New';

export const PageDashboard: React.FC = () => {
  // console.log(d, 'data1...');
  return (
    <div className="bg-purple-0 flex">
      {/* <D1 /> */}
      {/* <D2 /> */}
      {/* <ArcProgressBar/> */}
      {/* <div className="bg-orange-50 p-3 max-w-xs">
        <RectProgressBar />
      </div> */}
      {/* <D3 /> */}
      <div className="h-[210px] w-[400px]">
        <D3_3
          data={data2}
          getX={(d) => d.time}
          getY={(d) => d.value}
          multiKey={(d) => d.key}
          themeConfig={[
            {
              color: '#f59797',
              label: '分类一',
              key: 'x',
            },
            {
              color: '#da63e7',
              label: '分类二',
              key: 'y',
            },
            {
              color: '#8cdaed',
              label: '分类三',
              key: 'z',
            },
          ]}
          yLabel="应力"
          yUnitLeftLabel="ms/s"
          yUnitRightLabel="hs/h"
          yRightAxis
          margin={{
            right: 50,
          }}
        />
      </div>
      <div className="w-[500px]">
        {/* <LineChart
          data={data2}
          // data={data2}
          // getX={[data.x[0].time, data.x[data.x.length - 1].time]}
          getX={(d) => d.time}
          // getZ={({x}) => }
          // getZ={({x}) =>x.value }
          getY={(d) => d.value}
          yLabel="二二"
          yUnitLabel="一二"
          multiKey={(d) => d.key}
        /> */}
        {/* <LineChart2<ObjectData, Data>
          data={data}
          getX={[data.x[0].time, data.x[data.x.length - 1].time]}
          lines={[
            {
              key: 'key1',
              getter: (d) => (_k = d.x)=> k => k.value
            },
            {
              key: 'key2',
              getter: (d) => (_k = d.x)=> k => k.value
            },
            {
              key: 'key3',
              getter: (d) => (_k = d.x)=> k => k.value
            },
          ]}
        /> */}
        {/* <LineChart3 data={[]} getX={(d) => new Date()} getY={() => 1} /> */}
      </div>
    </div>
  );
};

export default PageDashboard;
