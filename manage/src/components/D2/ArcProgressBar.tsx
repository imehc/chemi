import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Props {
  width?: number | string;
  height?: number | string;
  innerRadius?: number;
  outerRadius?: number;
  background?: string;
}

export const ArcProgressBar: React.FC<Props> = ({
  width = 200,
  height = 200,
  innerRadius = 60,
  outerRadius = 80,
  // background = 'transparent',
  background = '#f3afaf',
}) => {
  const circleRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const { current: svg } = circleRef;
    if (!svg) {
      return;
    }
    svg.setAttribute('id', 'circle');
    const id = svg.getAttribute('id');
    svg.style.backgroundColor = background;
    const { width, height } = svg.getBoundingClientRect();
    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(0) as any;
    const picture = d3
      .select(`#${id!}`)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);
    const backGround = picture
      .append('path')
      .datum({ endAngle: 2 * Math.PI })
      .style('fill', '#FDF5E6')
      .attr('d', arcGenerator);
    const upperGround = picture
      .append('path')
      .datum({ endAngle: Math.PI / 2 })
      .style('fill', '#FFC125')
      .attr('d', arcGenerator);
    const dataText = d3
      .select('g')
      .append('text')
      .text('12%')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '38px');

    const colorLinear = d3
      .scaleLinear()
      .domain([0, 100])
      .range(['#EEE685', '#EE3B3B'] as any);

    d3.interval(() => {
      upperGround
        .transition()
        .duration(750)
        .attrTween('d', (d) => {
          const compute = d3.interpolate(
            d.endAngle,
            Math.random() * Math.PI * 2
          );
          return (t) => {
            d.endAngle = compute(t);
            var data = (d.endAngle / Math.PI / 2) * 100;
            //设置数值
            d3.select('text').text(data.toFixed(0) + '%');
            // 将新参数传入，生成新的圆弧构造器
            return arcGenerator(d);
          };
        })
        .styleTween('fill', (d) => {
          return () => {
            var data = (d.endAngle / Math.PI / 2) * 100;
            //返回数值对应的色值
            return colorLinear(data).toString();
          };
        });
    }, 1000);
  }, []);

  return <svg width={width} height={height} ref={circleRef} />;
};
