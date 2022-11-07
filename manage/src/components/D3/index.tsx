import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useMemo } from 'react';
import { PADDING } from './default_config';
import data from './data';

interface Props {
  width?: number;
  height?: number;
}

export const D3: FC<Props> = ({ width = 500, height = 300 }) => {
  const ref = useRef<SVGSVGElement>(null);

  const min = useMemo(() => d3.min(data, (d) => d.time), [])!;
  const max = useMemo(() => d3.max(data, (d) => d.value), [])!;

  const xScale = useMemo(
    () => d3.scaleTime().domain([1, min]).range([PADDING.LEFT, PADDING.RIGHT]),
    []
  );
  const yScale = useMemo(
    () =>
      d3.scaleLinear().domain([0, max]).range([PADDING.TOP, PADDING.BOTTOM]),
    []
  );

  const xAxis = d3.axisBottom(xScale).scale(xScale);
  const yAxis = d3.axisLeft(yScale).scale(yScale);

  console.log(
    d3
      .line()
      .x((d) => {
        console.log(d, '0');
        return xScale(d[0]);
      })
      .y((d) => {
        console.log(d, '1');
        return yScale(d[1]);
      })
  );

  useEffect(() => {
    const { current: svg } = ref;
    if (!svg) {
      return;
    }
    svg.setAttribute('id', 'line-chart');
    const id = svg.getAttribute('id')!;
    svg.style.background = '#c7c7f2';
    // init selection
    const selection = d3.select(`#${id}`);
    // TODO: 绘制
    selection
      .append('g')
      .attr('class', 'axis')
      .attr(
        'transform',
        `translate(${PADDING.LEFT},${height - PADDING.BOTTOM})`
      )
      .call(xAxis);
    selection
      .append('g')
      .attr('transform', `translate(${PADDING.LEFT},${PADDING.TOP})`)
      .call(yAxis);
    selection
      .append('g')
      .append('path')
      .attr('class', 'line-path')
      .attr('transform', `translate(${PADDING.LEFT},${PADDING.TOP})`)
      // .attr('d', linePath(data))
      .attr('fill', 'none')
      .attr('stroke-width', 3)
      .attr('stroke', '#d77052');
    selection
      .append('g')
      .selectAll('circle')
      // .data(dataset)
      .enter()
      .append('circle')
      .attr('r', 5)
      // .attr('transform', (d) => {
      //   return (
      //     'translate(' +
      //     (xScale(d[0]) + padding.left) +
      //     ',' +
      //     (yScale(d[1]) + padding.top) +
      //     ')'
      //   );
      // })
      .attr('fill', '#e66868');
  }, []);

  return <svg width={width} height={height} ref={ref} />;
};
