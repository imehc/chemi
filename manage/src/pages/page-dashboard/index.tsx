import React from 'react';
import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  RadarModifyChart,
  ResponsiveContainer,
} from '~/components';
import { Ardar, ardarData } from '~/mock/radar_chart';
import { barData } from '~/mock/bar_chart';
import { data2, data3 } from '~/mock/line_chart';
import { pieData } from '~/mock/pie_chart';

export const PageDashboard: React.FC = () => {
  // console.log(data2,'data2')
  return (
    <div className="overflow-hidden">
      {/* <div className="h-[200px] w-[300px] ml-11 mt-11">
        <ResponsiveContainer>
          <AreaChart data={data3} getX={(d) => d.time} getY={(d) => d.value2} />
        </ResponsiveContainer>
      </div> */}
      {/* <div className="h-[200px] w-[300px] ml-11 mt-11 bg-[#81e] ">
        <ResponsiveContainer>
          <RadarChart
          data={ardarData}
          getKey={(d) => d.brand}
          getValue={(d) => d.online_rate}
        />
          <RadarModifyChart
            data={undefined as unknown as Ardar[]}
            // data={ardarData}
            getKey={(d) => d.brand}
            getValue={(d) => d.online_rate}
          />
        </ResponsiveContainer>
      </div> */}
      {/* <div className="h-[210px] w-[500px] ml-11 mt-11">
        <BarChart
          data={barData}
          getX={(d) => d.day}
          getCategary={(d) => d.severity}
          getValue={(d) => d.count}
        />
      </div> */}
      {/* <div className="h-[210px] w-[500px] ml-11 mt-11">
        <RadarChart data={ardarData} />
      </div> */}
      {/* <div className="h-[210px] w-[500px] ml-11 mt-11">
        <PieChart
          data={pieData}
          getKey={(d) => d.name}
          getValue={(d) => d.value}
          onChange={(d) => console.log(d, 'd...')}
        />
      </div> */}
      <div className="h-[210px] w-[500px] ml-11 mt-11">
        <LineChart
          data={data2}
          getX={(d) => d.time}
          multiKey={(d) => d.key}
          // thresholds={mockThresholds}
          // thresholdKey={(t) => t.value}
          // areaChart
          lines={[
            {
              color: '#f15858',
              label: 'x',
              key: 'x',
              getter: (d) => d.value,
            },
            {
              color: '#76f748',
              label: 'y',
              key: 'y',
              getter: (d) => d.value,
            },
            // {
            //   color: '#ca5cee',
            //   label: 'z',
            //   key: 'z',
            //   getter: (d) => d.value,
            // },
            // {
            //   color: '#da63e7',
            //   label: '分类二',
            //   key: 'l',
            //   getter: (d) => d.value2,
            // },
            // {
            //   color: '#8cdaed',
            //   label: '分类三',
            //   key: 'y',
            //   getter: (d) => d.value3,
            // },
            // {
            //   color: '#948ced',
            //   label: '分类四',
            //   key: 'z',
            //   getter: (d) => d.value4,
            // },
          ]}
          yLabel="应力"
          yUnitLeftLabel="ms/s"
          yUnitRightLabel="hs/h"
          hasRightAxis
          margin={{ right: 50 }}
        />
      </div>
      <div className="w-[500px]"></div>
    </div>
  );
};

export default PageDashboard;
