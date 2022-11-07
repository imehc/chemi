import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useMemo } from 'react';
import data, { MockData } from './data';

// https://d3-graph-gallery.com/graph/interactivity_tooltip.html

// https://wattenberger.com/blog/d3
// https://www.d3indepth.com/introduction/
// https://www.bilibili.com/video/BV1HK411L72d/
// https://d3-graph-gallery.com/

// https://github.com/d3/d3/blob/main/API.md

interface Props {
  width?: number;
  height?: number;
}

const textColor = '#999999';
const axisColor = '#c3c3c3';
const pointColor = '#f5a209';
const textPointColor = '#f54d33';
const lineColor = '#26fd00';
const padding = { top: 30, right: 30, bottom: 30, left: 30 };

const legendLabel = ['分类一', '分类二'];

export const D3_2: FC<Props> = ({ width = 500, height = 300 }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { top, right, bottom, left } = useMemo(() => padding, []);

  const format = useMemo(() => d3.timeFormat('%H:%M'), []);

  useEffect(() => {
    const { current: dom } = ref;
    if (!dom) {
      return;
    }
    dom.setAttribute('id', 'line-chart');
    const id = dom.getAttribute('id')!;
    dom.style.background = '#c7c7f2';
    // init selection
    const selection = d3.select(`#${id}`);
    // 绘制svg
    const svg = selection
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    // 这里代码没用 只是为了显示外框
    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#fff')
      .attr('stroke', 'red');
    // 实际绘制的宽高
    const g = svg.append('g').attr('transform', `translate(${left},${top})`);
    const gw = width - left - right;
    const gH = height - top - bottom;

    // 定义坐标轴的比例尺，gW为x轴的宽度
    const xScale = d3
      .scaleBand()
      .range([0, gw])
      .domain(data.map((d) => format(d.time)));
    // 同理 gH为y轴的高度
    const yScale = d3
      .scaleLinear()
      .range([gH, 0])
      .domain([0, d3.max(data, (d) => d.value)!]);
    // 定义好x轴d定义域，画出x轴axisBottom，底部
    g.append('g')
      .attr('transform', `translate(0, ${gH})`)
      .call(d3.axisBottom(xScale))
      .attr('stroke', textColor);
    // 同理 左边
    g.append('g').call(d3.axisLeft(yScale)).attr('stroke', textColor);

    // 修改轴的颜色
    g.selectAll('path').attr('stroke', axisColor);
    g.selectAll('g').selectAll('line').attr('stroke', axisColor);

    // 创建一个line的生成器 用d3.line,把所有点连起来
    const line = d3
      .line<MockData>()
      .x((d) => {
        // 这里是d3.scaleBand自带比例尺
        const length = xScale(format(d.time))! + xScale.bandwidth() / 2;
        return length;
      })
      .y((d) => {
        return yScale(d.value);
      });
    // .curve(d3.curveCatmullRom);

    const path = g
      .append('path')
      .datum(data)
      .attr('stroke', lineColor)
      .attr('fill', 'none')
      .attr('d', line)
      // 线的宽度
      .attr('stroke-width', 2);

    // 动画
    path
      .attr('stroke-dasharray', () => {
        // 返回路径总长度
        return path.node()?.getTotalLength() ?? 0;
      })
      .attr('stroke-dashoffset', () => path.node()?.getTotalLength() ?? 0)
      .style('fill', 'none')
      .style('stroke', lineColor)
      .transition()
      .duration(3000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

    // tooltip
  }, []);

  return <div ref={ref} />;
};
