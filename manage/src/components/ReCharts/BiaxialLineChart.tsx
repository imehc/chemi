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
} from 'recharts';

const data = [
  {
    time: 'Page A',
    temp_value_max: 4000,
    temp_value_min: 2400,
    humidity_value_max: 240,
    humidity_value_min: 189,
  },
  {
    time: 'Page B',
    temp_value_max: 3000,
    temp_value_min: 1398,
    humidity_value_max: 221,
    humidity_value_min: 189,
  },
  {
    time: 'Page C',
    temp_value_max: 2000,
    temp_value_min: 9800,
    humidity_value_max: 229,
    humidity_value_min: 189,
  },
  {
    time: 'Page D',
    temp_value_max: 2780,
    temp_value_min: 3908,
    humidity_value_max: 200,
    humidity_value_min: 189,
  },
  {
    time: 'Page E',
    temp_value_max: 1890,
    temp_value_min: 4800,
    humidity_value_max: 218,
    humidity_value_min: 189,
  },
  {
    time: 'Page F',
    temp_value_max: 2390,
    temp_value_min: 3800,
    humidity_value_max: 250,
    humidity_value_min: 189,
  },
  {
    time: 'Page G',
    temp_value_max: 3490,
    temp_value_min: 4300,
    humidity_value_max: 210,
    humidity_value_min: 189,
  },
];

export const BiaXialLineChart: React.FC = () => {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="bg-[#F4F6FB] rounded-[14px]"
    >
      <LineChart
        data={data}
        margin={{
          left: -10,
          right: -10,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tick={{
            fill: '#9A9FA5',
            fontSize: '12px',
          }}
          minTickGap={-10}
        />
        <YAxis
          yAxisId="left"
          fontSize={12}
          tick={{ fill: '#9A9FA5', fontSize: '12px' }}
        />
        <YAxis
          yAxisId="right"
          fontSize={12}
          orientation="right"
          tick={{ fill: '#9A9FA5', fontSize: '12px' }}
        />
        <Tooltip />
        <Legend
          height={30}
          iconType="circle"
          iconSize={10}
          verticalAlign="top"
          align="center"
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="temp_value_min"
          stroke="#8884d8"
          dot={false}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="temp_value_max"
          stroke="#d884ce"
          dot={false}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="humidity_value_max"
          stroke="#82ca9d"
          dot={false}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="humidity_value_min"
          stroke="#f694e6"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
