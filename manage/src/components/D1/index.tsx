import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { dataset } from './data';

export const D1: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);

  const min = d3.min(dataset, (d) => d[1]);
  const max = d3.max(dataset, (d) => d[1]);
  // 图表的宽度和高度
  const width = 600;
  const height = 600;
  // 预留给轴线的距离
  const padding = { top: 50, right: 50, bottom: 50, left: 50 };

  // 设置比例尺
  const xScale = d3
    // 设置线性比例尺
    .scaleLinear()
    // 取得或设置比例尺的定义域
    .domain([1, min ?? 12])
    // 取得或设置比例尺的值域
    .range([0, width - padding.left - padding.right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, max ?? 1000])
    .range([height - padding.top - padding.bottom, 0]);

  const xAxis = d3.axisBottom(xScale).scale(xScale);
  const yAxis = d3.axisLeft(yScale).scale(yScale);

  useEffect(() => {
    const { current: line } = lineRef;
    if (!line) {
      return;
    }
    let id = line.getAttribute('id');
    if (!id) {
      line.setAttribute('id', 'line');
    }
    // 绘制轴线
    const svg = d3
      .select(`#${id!}`)
      .append('svg')
      .attr('width', width + 'px')
      .attr('height', height + 'px');

    svg
      .append('g')
      .attr('class', 'axis')
      .attr(
        'transform',
        'translate(' + padding.left + ',' + (height - padding.bottom) + ')'
      )
      .call(xAxis);

    svg
      .append('g')
      .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
      .call(yAxis);
    svg
      .append('g')
      .append('path')
      .attr('class', 'line-path')
      .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
      .attr('d', linePath(dataset as [number, number][]))
      .attr('fill', 'none')
      .attr('stroke-width', 3)
      .attr('stroke', '#d77052');
    svg
      .append('g')
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('transform', (d) => {
        return (
          'translate(' +
          (xScale(d[0]) + padding.left) +
          ',' +
          (yScale(d[1]) + padding.top) +
          ')'
        );
      })
      .attr('fill', '#e66868');
  }, []);

  // 绘制曲线
  var linePath = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));

  return <div ref={lineRef}></div>;
};
