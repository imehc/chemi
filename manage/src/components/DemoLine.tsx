import React, { useState, useEffect } from 'react';
import {
  Line,
  Area,
  Column,
  LineConfig,
  AreaConfig,
  ColumnConfig,
  Plot,
  PlotEvent,
} from '@ant-design/plots';

type Base = LineConfig | AreaConfig | ColumnConfig;

const PlotMaps: Record<string, Plot<Base>> = {};

let PreTooltipData: { date: string; value: number };

const DemoLine: React.FC = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/sp500.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    xField: 'date',
    yField: 'price',
    height: 200,
  };

   const showTooltip = (date: string) => {
    Object.keys(PlotMaps).forEach((plot) => {
      const chartData = PlotMaps[plot].chart.getData();
      for (let i = 0; i < chartData?.length; i++) {
        if (chartData[i].date === date) {
          const { x, y } = PlotMaps[plot].chart.getXY(chartData[i]);
          PlotMaps[plot].chart.showTooltip({ x, y });
          break;
        }
      }
    });
  };

  const setTooltipPosition = (evt: PlotEvent, plot: Plot<Base>) => {
    const { x, y } = evt.gEvent;
    const currentData = plot.chart.getTooltipItems({ x, y });
    if (currentData[0]?.data.date === PreTooltipData?.date) {
      return;
    }
    PreTooltipData = currentData[0]?.data;
    showTooltip(PreTooltipData?.date);
  };

  return (
    <div>
      <Line
        style={{ width: '40%' }}
        {...config}
        onReady={(plot) => {
          PlotMaps.line = plot;
          plot.on('mousemove', (evt: PlotEvent) => {
            setTooltipPosition(evt, plot);
          });
        }}
      />
      <Area
        style={{ width: '60%' }}
        {...config}
        onReady={(plot) => {
          PlotMaps.area = plot;
          plot.on('mousemove', (evt: PlotEvent) => {
            setTooltipPosition(evt, plot);
          });
        }}
      />
      <Column
        {...config}
        onReady={(plot) => {
          // @ts-ignore
          PlotMaps.Column = plot;
          plot.on('mousemove', (evt: PlotEvent) => {
            // @ts-ignore
            setTooltipPosition(evt, plot);
          });
        }}
      />
    </div>
  );
};

export default DemoLine;