import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
  },
];

export const ReChartsByLineChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        // margin={{
        //   top: 5,
        //   right: 30,
        //   left: 20,
        //   bottom: 5,
        // }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend
          height={30}
          iconType="circle"
          iconSize={10}
          verticalAlign="top"
          align="right"
          // margin={{ bottom: 10, right: 30, top: 10, left: 0 }}
          // content={<CustomizedLegend />} //自定义图例
        />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          // activeDot={{ r: 8 }}
          dot={false} // 显示折线上的点
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        <ReferenceLine y={7500} label="阈值" stroke="red" strokeDasharray="3 3" />
      </LineChart>
    </ResponsiveContainer>
  );
};

const CustomizedLegend: React.FC = () => {
  return <React.Fragment>1111</React.Fragment>;
};
