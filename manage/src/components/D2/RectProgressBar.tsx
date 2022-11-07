import React, { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { Bubble } from './Bubble';

interface Props {
  width?: number;
  height?: number;
}

export const RectProgressBar: React.FC<Props> = ({
  width = 200,
  height = 20,
}) => {
  const ref = useRef<SVGSVGElement>(null);
  const percentage = useMemo(() => {
    // TODO: 处理当前进度
    return 33;
  }, []);
  // 矩形
  useEffect(() => {
    const { current: svg } = ref;
    if (!svg) {
      return;
    }
    const { width, height } = svg.getBoundingClientRect();
    const curWidth = (width * percentage) / 100;

    svg.setAttribute('id', 'rec');
    const id = svg.getAttribute('id');

    const g = d3.select(`#${id!}`).append('g');
    g.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height)
      .attr('rx', height / 2)
      .style('fill', '#f3aeae');
    const upperGround = g
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', curWidth ?? 0)
      .attr('height', height)
      .attr('rx', height / 2)
      .style('fill', '#f05555');

    upperGround
      .transition()
      .delay(0)
      .duration(500)
      .attrTween('width', () => {
        var i = d3.interpolate(0, curWidth);
        return (t: number) => i(t) + 'px';
      });
  }, []);

  return <svg ref={ref} width={width} height={height} />;
  // return <Bubble />;
};
