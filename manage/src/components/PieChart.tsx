import ReactECharts from 'echarts-for-react';
import type { EChartsInstance, EChartsOption } from 'echarts-for-react';
import * as echarts from 'echarts';
import { useCallback, useMemo } from 'react';

interface PieChartProps {
  onChange?: (idx: number) => void;
  data: {
    value: number;
    name: string;
  }[];
}

export const PieChart: React.FC<PieChartProps> = ({ onChange, data }) => {
  const option: EChartsOption = useMemo(
    () => ({
      legend: {
        top: 'middle',
        right: '5%',
        orient: 'vertical',
        icon: 'circle',
        formatter: (name: string) => {
          const value = data.find((d) => d.name === name)?.value;
          let arr = ['{a|' + name + '}{b|' + value + '}'];
          return arr.join('');
        },
        show: true,
        shadowColor: '#000000',
        shadowBlur: 10,
        textStyle: {
          backgroundColor: 'transparent',
          rich: {
            a: {
              width: 70,
              fontSize: 14,
              color: '#787C82',
              ligin: 'left',
            },
            b: {
              fontSize: 18,
              fontWeight: 'bold',
              aligin: 'right',
              color: '#040F1F',
              padding: [0, 0, 0, 10],
            },
          },
        },
      },
      series: [
        {
          name: 'Access From',
          type: 'pie', // 类型设置为饼图
          radius: ['58%', '80%'], // 设置内圈于外圈的半径使其呈现为环形
          center: ['24%', '50%'], // 圆心位置，用于调整整个图的位置
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 60, // 设置每一个子项目的圆角
            borderColor: '#f8fafc', // 设置成背景颜色
            borderWidth: 10, // 子项目间距
          },
          label: {
            show: false,
            position: 'center',
            formatter: (props: Record<string, any>) => {
              const {
                data: { name, value },
              } = props;
              const total = data.reduce((prev, cur) => prev + cur.value, 0);
              let arr = [
                '{a|' +
                  ((value / total) * 100).toFixed(0) +
                  '%}\n{b|' +
                  name +
                  '}',
              ];
              return arr.join('\n');
            },
            rich: {
              a: {
                fontSize: 28,
                fontWeight: 'bold',
                color: '#413D52',
              },
              b: {
                fontSize: 14,
                color: '#413D52',
              },
            },
          },
          emphasis: {
            label: {
              show: true,
            },
          },
          labelLine: {
            show: false,
          },
          data,
          color: [
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#FC6679 ' },
              { offset: 1, color: '#FDC581 ' },
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#AF3ADB' },
              { offset: 1, color: '#4E65DD' },
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#6E87FE ' },
              { offset: 1, color: '#4E50E4 ' },
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#7FC268' },
              { offset: 1, color: '#0BBBB7' },
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#E7B115' },
              { offset: 1, color: '#F5814C' },
            ]),
          ],
        },
      ],
    }),
    []
  );

  const onChartReady = useCallback((rEcharts: EChartsInstance) => {
    let index = 0;
    rEcharts.dispatchAction({
      type: 'highlight',
      seriesIndex: index,
      dataIndex: index,
    });
    rEcharts.on('mouseover', (e: { dataIndex: number }) => {
      console.log('mouseover...');
      if (e.dataIndex != index) {
        rEcharts.dispatchAction({
          type: 'downplay',
          seriesIndex: index,
          dataIndex: index,
        });
      }
      index = e.dataIndex;
      onChange && onChange(e.dataIndex);
      rEcharts.dispatchAction({
        type: 'highlight',
        seriesIndex: e.dataIndex,
        dataIndex: e.dataIndex,
      });
    });
    rEcharts.on('mouseout', (e: { dataIndex: number }) => {
      console.log('mouseout...');
      if (e.dataIndex != index) {
        rEcharts.dispatchAction({
          type: 'downplay',
          seriesIndex: index,
          dataIndex: index,
        });
      }
      index = 0;
      onChange && onChange(0);
      rEcharts.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: 0,
      });
    });
    rEcharts.on('downplay', (e: { name?: string }) => {
      const idx = data.findIndex((d) => d.name === e.name);
      if (idx !== -1) {
        if (idx !== 0) {
          rEcharts.dispatchAction({
            type: 'downplay',
            seriesIndex: idx,
            dataIndex: idx,
          });
        }
        onChange && onChange(0);
        rEcharts.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: 0,
        });
      }
    });
    rEcharts.on('highlight', (e: { name?: string }) => {
      const idx = data.findIndex((d) => d.name === e.name);
      if (idx !== -1) {
        onChange && onChange(idx);
        if (idx !== 0) {
          rEcharts.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: 0,
          });
        }
      }
    });
  }, []);

  return (
    <ReactECharts
      option={option}
      style={{ height: '100%', width: '100%' }}
      onChartReady={onChartReady}
    />
  );
};
