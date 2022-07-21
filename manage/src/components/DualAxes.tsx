import { DualAxes } from '@ant-design/plots';
import type { DualAxesConfig } from '@ant-design/plots';
import type { Datum } from '@antv/g2plot';

export const SignalOrVoltage: React.FC = () => {
  const mockData = [
    {
      signal: 3.0,
      voltage: 40,
      time: '0',
    },
    {
      signal: 3.0,
      voltage: 20,
      time: '2',
    },
    {
      signal: 3.2,
      voltage: 40,
      time: '4',
    },
    {
      signal: 3.0,
      voltage: 50,
      time: '6',
    },
    {
      signal: 3.2,
      voltage: 40,
      time: '8',
    },
    {
      signal: 3.2,
      voltage: 60,
      time: '10',
    },
    {
      signal: 2.2,
      voltage: 40,
      time: '12',
    },
    {
      signal: 2.5,
      voltage: 80,
      time: '14',
    },
    {
      signal: 2.8,
      voltage: 80,
      time: '16',
    },
    {
      signal: 3.0,
      voltage: 100,
      time: '18',
    },
    {
      signal: 3.2,
      voltage: 120,
      time: '20',
    },
    {
      signal: 3.0,
      voltage: 120,
      time: '22',
    },
    {
      signal: 3.2,
      voltage: 120,
      time: '24',
    },
  ];

  const config: DualAxesConfig = {
    padding: [20, 25, 15, 25],
    data: [mockData, mockData],
    xField: 'time',
    yField: ['voltage', 'signal'],
    yAxis: {
      signal: {
        min: 0,
        max: 3.8,
        tickInterval: 0.3,
        title: {
          text: '电压值',
          position: 'end',
          offset: 40,
          autoRotate:true,
          style: {
            fill: '#9A9FA5',
          }
        },
        line: {
          style: {
            stroke: '#d9d9d9',
          },
        }
      },
      voltage: {
        min: 0,
        max: 140,
        tickInterval: 20,
        title: {
          text: '信号值',
          position: 'end',
          offset: 40,
          autoRotate:true,
          style: {
            fill: '#9A9FA5',
          }
        },
        line: {
          style: {
            stroke: '#d9d9d9',
          },
        }
      },
    },
    legend: {
      layout: 'horizontal',
      position: 'right-top',
      offsetX: -40,
      offsetY: 10,
      itemGap: 20,
      itemName: {
        formatter(text) {
          return text === 'signal' ? '电压值' : '信号值';
        },
      },
      marker: {
        symbol: 'circle',
      },
    },
    tooltip: {
      showTitle: false,
      formatter: (datum: Datum) => {
        return {
          name: datum.signal ? '电压值' : '信号值',
          value: datum.voltage || datum.signal,
        };
      },
    },
    geometryOptions: [
      {
        geometry: 'line',
        color: '#4a8fff',
        smooth: true,
      },
      {
        geometry: 'line',
        color: '#ffca00',
        smooth: true,
      },
    ],
  };
  return (
    <div className="w-full h-full rouned-[8px] bg-[#f4f6fc] rounded-[8px]">
      <DualAxes {...config} />
    </div>
  );
};
