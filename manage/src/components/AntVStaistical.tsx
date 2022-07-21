import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pie, measureTextWidth } from '@ant-design/plots';
import type { PieConfig } from '@ant-design/plots';
import type { Datum, Pie as Pied } from '@antv/g2plot';

interface Props {
  data: {
    name: string;
    count: number;
  }[];
}
export const DeviceCategoryStatistical: React.FC<Props> = ({ data }) => {
  const ref = useRef(void 0);
  const [legendData, setLegendData] = useState<Datum>([]);
  useEffect(() => {
    if (ref.current) {
      // 设置图例数据
      const pieChart = (ref.current as Pied).chart;
      const legendData = pieChart.geometries[0].dataArray.map((item) => {
        const origin = item[0]._origin;
        origin.color = item[0].color;
        origin.checked = true;
        return origin;
      });
      setLegendData(legendData);
    }
  }, []);
  const renderStatistic = useCallback(
    (containerWidth: number, text: string, style: { fontSize: number }) => {
      const { width: textWidth, height: textHeight } = measureTextWidth(
        text,
        style
      );
      const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

      let scale = 1;

      if (containerWidth < textWidth) {
        scale = Math.min(
          Math.sqrt(
            Math.abs(
              Math.pow(R, 2) /
                (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
            )
          ),
          1
        );
      }
      const textStyleStr = `width:${containerWidth}px;`;
      return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
        scale < 1 ? 1 : 'inherit'
      };">${text}</div>`;
    },
    []
  );
  const config: PieConfig = {
    appendPadding: 10,
    data,
    angleField: 'count',
    colorField: 'name',
    radius: 1,
    innerRadius: 0.8,

    autoFit: true,
    meta: {
      value: {
        formatter: (v: any) => `${v}`,
      },
    },
    pieStyle: {
      lineCap: "round",
      lineWidth: 6,
    },
    // legend: false,
    label: {
      type: 'inner',
      content: '',
    },
    statistic: {
      title: {
        offsetY: 30,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.name : '总计';
          return renderStatistic(d, text, {
            fontSize: 20,
          });
        },
      },
      content: {
        offsetY: -30,
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum
            ? `${(
                (datum.count / (data?.reduce((r, d) => r + d.count, 0) ?? 0)) *
                100
              ).toFixed(2)}%`
            : '100%';
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };
  const handleLegendClick = useCallback((item: Datum, i: number) => {
    const newItem = item;
    newItem.checked = !newItem.checked;
    legendData[i] = newItem;
    const filteredLegendData = legendData
      .filter((l: Datum) => l.checked)
      .map((l: Datum) => l.name);
    if (ref.current) {
      const pieChart = (ref.current as Pied).chart;
      pieChart.filter('name', (val) => {
        return filteredLegendData.indexOf(val) > -1;
      });
      pieChart.render();
    }
    setLegendData(legendData);
  }, []);
  console.log(legendData, 'legendData');
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Pie {...config} chartRef={ref} />
      {/* <div style={{ position: 'absolute', right: '5%', top: '10%' }}>
        {legendData?.map((d: Datum, i: number) => (
          <div key={i} onClick={() => handleLegendClick(d, i)}>
            {d.name}
            {d.count}
          </div>
        ))}
      </div> */}
    </div>
  );
};
