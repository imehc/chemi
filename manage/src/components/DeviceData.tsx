import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AllBaseConfig, Line, Plot } from '@ant-design/plots';
import type { LineConfig } from '@ant-design/plots';

export const PageDeviceData = () => {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [data2, setData2] = useState<Record<string, any>[]>([]);
  let charts: Plot<AllBaseConfig>[] = [];
  let chart: Plot<AllBaseConfig>;
  let chartData: Record<string, any>[] = [];
  useEffect(() => {
    setData(defaultData);
    setData2(defaultData2);
    if (!chart) return;
    chart.chart.on('tooltip:change', (ev: any) => {
      const {
        data: { x, y },
      } = ev;
      const position = { x, y };
      console.log(position);
      // 找出当前时间所在的位置
      const records = chart.chart.getSnapRecords(position);
      let time: string;
      records.forEach((record) => {
        // time 为 xField 字段
        time = record._origin && record._origin.time;
        if (time) return;
      });
      console.log(charts);
      // 根据time将除了当前图表其它所有图表内同一年份的数据显示出来
      for (let index = 0; index < charts.length; index++) {
        const cha = charts[index];
        if (cha != chart) {
          // 查找此图表中该time的数据
          const data = chartData[index].filter(
            (data: { time: string }) => data.time === time
          );
          if (!data.length) {
            continue;
          }
          // 查找此图表中此条数据对应的位置
          let position;
          for (let d of data) {
            let position = cha.getEvents();
            // let s = cha.getD();
            console.log('========');
            console.log(position);
            // console.log(s);
            console.log('========');
            // position = cha.getXY(d);
            // if (position) {
            //   break;
            // }
          }
          // 如果位置合法，则展示位置对应的 tooltip
          // if (position.x > 0 && position.y > 0) {
          //   // cha.showTooltip(position);
          // }
        }
      }
    });
  }, []);
  const defaultData = [
    {
      time: '2',
      signalValue: 20,
    },
    {
      time: '4',
      signalValue: 40,
    },
    {
      time: '6',
      signalValue: 60,
    },
    {
      time: '8',
      signalValue: 40,
    },
    {
      time: '10',
      signalValue: 60,
    },
    {
      time: '12',
      signalValue: 40,
    },
    {
      time: '14',
      signalValue: 80,
    },
    {
      time: '16',
      signalValue: 60,
    },
    {
      time: '18',
      signalValue: 80,
    },
    {
      time: '20',
      signalValue: 58,
    },
    {
      time: '22',
      signalValue: 60,
    },
    {
      time: '24',
      signalValue: 60,
    },
  ];
  const defaultData2 = [
    {
      time: '2',
      signalValue: 30,
    },
    {
      time: '4',
      signalValue: 50,
    },
    {
      time: '6',
      signalValue: 60,
    },
    {
      time: '8',
      signalValue: 30,
    },
    {
      time: '10',
      signalValue: 100,
    },
    {
      time: '12',
      signalValue: 90,
    },
    {
      time: '14',
      signalValue: 120,
    },
    {
      time: '16',
      signalValue: 80,
    },
    {
      time: '18',
      signalValue: 80,
    },
    {
      time: '20',
      signalValue: 45,
    },
    {
      time: '22',
      signalValue: 60,
    },
    {
      time: '24',
      signalValue: 76,
    },
  ];
  const config: LineConfig = {
    data: data,
    padding: [30, 40],
    xField: 'time',
    yField: 'signalValue',
    theme: 'dark',
    smooth: true,
    autoFit: true,
    renderer: 'canvas',
    yAxis: {
      line: {
        style: {
          stroke: '#ffffff',
        },
      },
      grid: {
        line: {
          style: {
            stroke: '#ffffff',
            opacity: 0.3,
          },
        },
      },
    },
    xAxis: {
      // position: 'bottom',
      line: {
        style: {
          stroke: '#ffffff',
        },
      },
      tickLine: {
        style: {
          stroke: '#ffffff',
        },
      },
    },
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
    tooltip: {
      fields: ['signalValue'],
      formatter: (datum) => {
        return { name: '信号值', value: datum.signalValue };
      },
      showTitle: false,
    },
    meta: {
      signalValue: {
        min: 0,
        max: 140,
        tickInterval: 20,
      },
    },
    annotations: [
      // 低于中位数颜色变化
      {
        type: 'regionFilter',
        start: ['min', '110'],
        end: ['max', '0'],
      },
      {
        type: 'text',
        position: ['min', '110'],
        content: '报警阈值',
        offsetY: -4,
        style: {
          textBaseline: 'bottom',
        },
      },
      {
        type: 'line',
        start: ['min', '110'],
        end: ['max', '110'],
        style: {
          stroke: '#F4664A',
          lineDash: [2, 2],
        },
      },
    ],
  };
  const config2: LineConfig = {
    data: data2,
    padding: [30, 40],
    xField: 'time',
    yField: 'signalValue',
    theme: 'dark',
    smooth: true,
    autoFit: true,
    renderer: 'canvas',
    xAxis: {
      position: 'top',
    },
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
    tooltip: {
      fields: ['signalValue'],
      formatter: (datum) => {
        return { name: '信号值', value: datum.signalValue };
      },
      showTitle: false,
    },
    meta: {
      signalValue: {
        min: 0,
        max: 140,
        tickInterval: 20,
      },
    },
    annotations: [
      // 低于中位数颜色变化
      {
        type: 'regionFilter',
        start: ['min', '110'],
        end: ['max', '0'],
      },
      {
        type: 'text',
        position: ['min', '110'],
        content: '报警阈值',
        offsetY: -4,
        style: {
          textBaseline: 'bottom',
        },
      },
      {
        type: 'line',
        start: ['min', '110'],
        end: ['max', '110'],
        style: {
          stroke: '#F4664A',
          lineDash: [2, 2],
        },
      },
    ],
  };
  return (
    <React.Fragment>
      <div style={{ display: 'flex' }}>
        <div style={{ height: '300px', width: '600px' }}>
          <Line
            {...config}
            // chartRef={(ref) => ref.chart.coordinate('rect').reflect('y')}
            chartRef={(chartRef) => {
              chart = chartRef;
              charts.push(chartRef);
              chartData.push(defaultData);
            }}
          />
        </div>

        <div style={{ height: '300px', width: '600px', marginLeft: '30px' }}>
          <Line
            {...config2}
            chartRef={(chartRef) => {
              charts.push(chartRef);
              chartData.push(defaultData2);
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
