import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AllBaseConfig, Line } from '@ant-design/plots';
import type { PlotEvent, Plot, LineConfig } from '@ant-design/plots';

type Base = LineConfig;
const PlotMaps: Record<string, Plot<Base>> = {};
let PreTooltipData: { time: string; value: number };

export const PageDeviceData = () => {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [data2, setData2] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    setData(defaultData);
    setData2(defaultData2);
  }, []);

  const showTooltip = useCallback((time: string) => {
    Object.keys(PlotMaps).forEach((plot) => {
      const chartData = PlotMaps[plot].chart.getData();
      for (let i = 0; i < chartData?.length; i++) {
        if (chartData[i].time === time) {
          const { x, y } = PlotMaps[plot].chart.getXY(chartData[i]);
          PlotMaps[plot].chart.showTooltip({ x, y });
          break;
        }
      }
    });
  }, []);

  const setTooltipPosition = useCallback((evt: PlotEvent, plot: Plot<Base>) => {
    const { x, y } = evt.gEvent;
    const currentData = plot.chart.getTooltipItems({ x, y });
    if (currentData[0]?.data.time === PreTooltipData?.time) {
      return;
    }
    PreTooltipData = currentData[0]?.data;
    showTooltip(PreTooltipData?.time);
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
          stroke: '#ff9298',
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
            onReady={(plot) => {
              // key 必须唯一
              PlotMaps.line = plot;
              plot.on('mousemove', (evt: PlotEvent) => {
                setTooltipPosition(evt, plot);
              });
              //移出遍历所有chart，然后隐藏
              plot.on("mouseout", () => {
                Object.values(PlotMaps).map((item) => {
                  return item.chart.hideTooltip();
                });
              });
            }}
          />
        </div>
        <div style={{ height: '300px', width: '600px', marginLeft: '30px' }}>
          <Line
            {...config2}
            onReady={(plot) => {
              // key 必须唯一
              PlotMaps.line2 = plot;
              plot.on('mousemove', (evt: PlotEvent) => {
                setTooltipPosition(evt, plot);
              });
              //移出遍历所有chart，然后隐藏
              plot.on("mouseout", () => {
                Object.values(PlotMaps).map((item) => {
                  return item.chart.hideTooltip();
                });
              });
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
