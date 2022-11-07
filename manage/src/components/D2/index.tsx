import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const D2: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGSVGElement>(null);
  // 矩形
  useEffect(() => {
    const { current: dom } = ref;
    if (!dom) {
      return;
    }
    dom.setAttribute('id', 'rec');
    dom.style.height = '20px';
    dom.style.width = '20px';
    dom.style.background = '#2394F5';
    dom.style.margin = '15px';
    const id = dom.getAttribute('id');
    d3.interval(function () {
      d3.select(id!)
        .transition()
        .duration(1000)
        .attrTween('width', () => {
          var i = d3.interpolate(20, 400);
          var ci = d3.interpolate('#2394F5', '#BDF436');
          return (t: number) => {
            dom.style.width = i(t) + 'px';
            dom.style.background = ci(t);
            return '';
          };
        });
    }, 1500);
  }, []);

  // 圆弧
  useEffect(() => {
    const { current: svg } = circleRef;
    if (!svg) {
      return;
    }
    svg.setAttribute('id', 'circle');
    const id = svg.getAttribute('id');
    const { width, height } = svg.getBoundingClientRect();
    const arcGenerator = d3
      .arc()
      // .innerRadius(80)
      // .outerRadius(100)
      .innerRadius(40)
      .outerRadius(60)
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

    // d3.interval(() => {
    //   upperGround
    //     .transition()
    //     .duration(750)
    //     .attrTween('d', (d) => {
    //       // 插值api
    //       var compute = d3.interpolate(d.endAngle, Math.random() * Math.PI * 2);
    //       return (t) => {
    //         d.endAngle = compute(t);
    //         return arcGenerator(d);
    //       };
    //     });
    // }, 1000);

    const colorLinear = d3
      .scaleLinear()
      .domain([0, 100])
      .range(['#EEE685', '#EE3B3B'] as any);
    const color = colorLinear(80);
    //color即为"80%"对应的色值

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
    }, 2000);
  }, []);

  return (
    <React.Fragment>
      <svg width={200} height={200} ref={circleRef} stroke="#f4b1f4" />
      <div ref={ref} />
    </React.Fragment>
  );
};
