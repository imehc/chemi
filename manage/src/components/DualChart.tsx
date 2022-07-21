import { Line } from '@ant-design/plots';
import type { LineConfig } from '@ant-design/plots';
import type { Datum } from '@antv/g2plot';

type DataType = {
  time: string;
  value: number;
  type: string;
};
interface Props {
  config: {
    color: string | string[];
    name: string;
    min: number;
    max: number;
    tickCount: number;
  };
  data: DataType[];
}
export const DualChart: React.FC<Props> = ({ data, config }) => {
  const configuration: LineConfig = {
    padding: [25, 25, 25, 30],
    data,
    xField: 'time',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
    color: config.color,
    legend: {
      position: 'top-right',
      offsetX: -10,
      offsetY: 0,
      itemSpacing: -10,
      itemName: {
        formatter(text) {
          if (text === 'angleX') {
            return '倾角X';
          }
          if (text === 'angleY') {
            return '倾角Y';
          }
          if (text === 'angleZ') {
            return '倾角Z';
          }
        },
      },
      marker: {
        symbol: 'circle',
        spacing: -2,
      },
    },
    tooltip: {
      showTitle: false,
      formatter: (datum: Datum) => {
        const filterType = () => {
          if (datum.type === 'angleX') {
            return '倾角X';
          }
          if (datum.type === 'angleY') {
            return '倾角Y';
          }
          if (datum.type === 'angleZ') {
            return '倾角Z';
          }
          return '';
        };

        return {
          name: filterType(),
          value: datum.value,
        };
      },
    },
    yAxis: {
      min: config.min,
      max: config.max,
      tickInterval: config.tickCount,
    },
  };
  return (
    <div className="h-[170px] w-full rouned-[8px] bg-[#f4f6fc] rounded-[8px]">
      <Line {...configuration} />
    </div>
  );
};
