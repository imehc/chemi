import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  AreaChart,
  Area
} from "recharts";

export default function ReCharts() {
  const [data, setData] = useState([
    {
      name: 1,
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: 2,
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: 3,
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: 4,
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: 5,
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: 6,
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: 7,
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ]);
  return (
    <div>
      <h4>A demo of synchronized AreaCharts</h4>
      <LineChart
        width={500}
        height={200}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line dataKey="uv" stroke="#8884d8" />
      </LineChart>
      <p>Maybe some other content</p>
      <LineChart
        width={500}
        height={200}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" type="category" />
        <YAxis />
        <Tooltip />
        <Line dataKey="pv" stroke="#82ca9d" />
        <Brush />
      </LineChart>
      {/* <AreaChart
        width={500}
        height={200}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area  dataKey="pv" stroke="#82ca9d"/>
      </AreaChart> */}
      <button
        type="button"
        onClick={() => {
          setData([
            ...data,
            {
              name: data.length + 1,
              uv: 3000,
              pv: 1800,
              amt: 2800
            }
          ]);
        }}
      >
        添加
      </button>
    </div>
  );
}
