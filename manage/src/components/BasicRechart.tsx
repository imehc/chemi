import clsx from 'clsx';
import { format } from 'date-fns';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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

interface SensorDataChartProps {
  config: {
    name: string;
  };
  data?: any[];
  threshold?: any[];
}

export const BaiscSensorDataChart: React.FC<SensorDataChartProps> = ({
  config: { name = "温湿度" } = {},
  data,
  threshold,
}) => {
  const formatData = useMemo(() => {
    const _d = data?.filter((d) => d.time !== undefined);
    if (!_d) {
      return undefined;
    }
    return _d.map((item) => {
      return {
        ...item,
      };
    });
  }, [data]);
  if (!formatData) {
    return <div>暂无数据</div>;
  }
  console.log(formatData, threshold, name, "formatData");
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="bg-[#F4F6FB] rounded-[14px]"
    >
      <LineChart
        data={formatData}
        margin={{
          left: -30,
          right: -30,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tick={{
            fill: "#9A9FA5",
            fontSize: "12px",
          }}
          minTickGap={-10}
          padding={{ left: 30, right: 30 }}
          tickLine={false}
          axisLine={{
            stroke: "#DCDEEA",
            strokeWidth: 1,
          }}
        />
        <YAxis
          yAxisId="left"
          fontSize={12}
          tick={{ fill: "#9A9FA5", fontSize: "12px" }}
          axisLine={{
            stroke: "#DCDEEA",
            strokeWidth: 1,
          }}
          tickLine={false}
          // type="number"
          // tickCount={2}
        />
        <YAxis
          yAxisId="right"
          fontSize={12}
          orientation="right"
          tick={{ fill: "#9A9FA5", fontSize: "12px" }}
          axisLine={{
            stroke: "#DCDEEA",
            strokeWidth: 1,
          }}
          tickLine={false}
          // type="number"
          // tickCount={2}
        />
        <Tooltip
          content={<CustomTooltip />}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend
          height={45}
          verticalAlign="top"
          content={<CustomizedLegend name={name} />}
        />
        {threshold?.map((cvt, i) => (
          <ReferenceLine
            key={i}
            y={cvt.value}
            yAxisId="left"
            label={<CustomizedLabel />}
            stroke="#F95B5B"
            alwaysShow
            strokeDasharray="3 3"
          />
        ))}
        <Line
          yAxisId="left"
          dataKey="temp_value_min"
          stroke="#8884d8"
          dot={false}
        />
        <Line
          yAxisId="left"
          dataKey="temp_value_max"
          stroke="#d884ce"
          dot={false}
        />
        <Line
          yAxisId="right"
          dataKey="humidity_value_max"
          stroke="#82ca9d"
          dot={false}
        />
        <Line
          yAxisId="right"
          dataKey="humidity_value_min"
          stroke="#d0ef81"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const CustomizedLegend: React.FC<any> = ({ payload, name }) => {
  const formatValue = useCallback((val: string) => {
    switch (val) {
      case "temp_value_max":
        return "最高温度";
      case "temp_value_min":
        return "最低温度";
      case "humidity_value_max":
        return "最高湿度";
      case "humidity_value_min":
        return "最低湿度";
    }
  }, []);
  return (
    <div
      className="h-full absolute left-[30px] w-full"
      style={{ width: "calc(100% - 60px)" }}
    >
      <ul className="h-[25px] flex justify-between items-center mt-1">
        <li className="ml-4 font-bold text-[14px] text-[#040F1F]">{name}</li>
        <li className="flex justify-start items-center mr-4">
          {payload.map((entry: any, index: any) => (
            <p
              className={clsx(
                "text-[12px] text-[#9A9FA5] ml-5 first:ml-0 relative before:content-center before:absolute before:top-1/2 before:left-[-12px] before:w-[10px] before:h-[10px] before:rounded-[50%] before:translate-y-[-50%]",
                [entry.value === "temp_value_min" && "before:bg-[#8884d8]"],
                [entry.value === "temp_value_max" && "before:bg-[#d884ce]"],
                [entry.value === "humidity_value_min" && "before:bg-[#d0ef81]"],
                [entry.value === "humidity_value_max" && "before:bg-[#82ca9d]"]
              )}
              key={`item-${index}`}
            >
              {formatValue(entry.value)}
            </p>
          ))}
        </li>
      </ul>
      <ul className="h-[20px] flex justify-between items-center mt-[-6px]">
        <li className="text-[12px] text-[#9A9FA5] ml-4">温度</li>
        <li className="text-[12px] text-[#9A9FA5] mr-4">湿度</li>
      </ul>
    </div>
  );
};

const CustomTooltip: React.FC<any> = ({ active, payload, label }: any) => {
  const formatValue = useCallback((val: string) => {
    switch (val) {
      case "temp_value_max":
        return "最高温度";
      case "temp_value_min":
        return "最低温度";
      case "humidity_value_max":
        return "最高湿度";
      case "humidity_value_min":
        return "最低湿度";
    }
  }, []);
  if (active && payload && payload.length) {
    return (
      <div className="bg-[rgba(255,255,255,.41)] rounded-[8px] p-2">
        <div>{label}</div>
        {payload.map(
          ({ name, value }: { name: string; value: any }, index: number) => {
            return (
              <div
                key={`item-${index}`}
                className={clsx(
                  "text-[12px] text-[#9A9FA5] ml-5 first:ml-0 relative before:content-center before:absolute before:top-1/2 before:left-[-12px] before:w-[10px] before:h-[10px] before:rounded-[50%] before:translate-y-[-50%]",
                  [name === "temp_value_min" && "before:bg-[#8884d8]"],
                  [name === "temp_value_max" && "before:bg-[#d884ce]"],
                  [name === "humidity_value_min" && "before:bg-[#d0ef81]"],
                  [name === "humidity_value_max" && "before:bg-[#82ca9d]"]
                )}
              >
                {formatValue(name)}:{value}
              </div>
            );
          }
        )}
      </div>
    );
  }

  return null;
};

const CustomizedLabel: React.FC<any> = ({ viewBox }) => {
  const { width, y } = viewBox;
  return (
    <text {...viewBox} x={width - 8} y={y - 5} fill="#FF5F5F" fontSize="12">
      预警阈值
    </text>
  );
};


