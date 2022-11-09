import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useMemo } from 'react';
import data, { MockData } from './data';

interface Props {
  width?: number;
  height?: number;
}

type SVGSelection = d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
type SVGScaleTime = d3.ScaleTime<number, number, never>;
type SVGScaleLinear = d3.ScaleLinear<number, number, never>;

type DrawLinePathProps = {
  // g: GSelection;
  svg: SVGSelection;
  xScale: SVGScaleTime;
  yScale: SVGScaleLinear;
};

const textColor = '#999999';
const axisColor = '#d0d3cb';
const pointColor = '#f5a209';
const textPointColor = '#f54d33';
const lineColor = ['#caf9c2', '#aee4ec', '#e9b6f0'];
const padding = { top: 50, right: 30, bottom: 30, left: 30 };
const lineChartId = 'line-chart';
const tooltipId = 'line-chart-tip';
const tooltipLine = 'line-chart-tip-line';
const tooltipCircle = 'line-chart-tip-circle';
const tooltipText = 'line-chart-tip-text';

export const D3_3: FC<Props> = ({ width = 500, height = 200 }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const { top, right, bottom, left } = useMemo(() => padding, []);
  console.log(data);
  const format = useMemo(() => d3.timeFormat('%H:%M'), []);
  console.log(d3.timeFormat('%H:%M')(new Date()), 'format...');
  // console.log(d3.timeFormat('%Y-%m-%d')(new Date(+time + 12 * 3600 * 1000)))
  // ======================================================================
  const [distance, setDistance] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });
  const chartWidthAndHeight = useMemo(() => {
    const w = width - left - right;
    const h = height - top - bottom;
    return { w, h };
  }, [width, height, top, right, bottom, left]);

  const sumstat = useMemo(() => d3.group(data, (d) => d.key), []);

  // 匹配最近的Xaxis
  const matchTheRecentDate = useCallback((mDate: Date): Date => {
    const m = data.reduce((prev, cur) => {
      const a = Math.abs(+prev - +mDate);
      const b = Math.abs(+cur.time - +mDate);
      return a <= b ? prev : +cur.time;
    }, 0);
    const match = data.find((d) => +d.time === m)!.time;
    return match;
  }, []);

  // 匹配颜色
  const handleColor = useCallback((i: 'x' | 'y' | 'z'): string => {
    return i === 'x' ? lineColor[0] : i === 'y' ? lineColor[1] : lineColor[2];
  }, []);

  // 绘制图例和标题
  const drawLegend = useCallback((svg: SVGSelection): void => {
    const legend = svg
      .selectAll('.legend')
      .data(lineColor)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (_, i) => {
        return `translate(${-i * 70 - 30},5)`;
      });

    legend
      .append('circle')
      .attr('cx', width - 40)
      .attr('cy', 13)
      .attr('r', 5)
      // .attr('stroke', '#000')
      // .attr('stroke-width', 2)
      .style('fill', (d) => d);

    legend
      .append('text')
      .attr('x', width - 30)
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('text-anchor', 'start') //样式对齐
      .attr('font-size', 14)
      .text((d, i) => `分类${i}`);
    // other
    svg
      .append('g')
      .attr('transform', 'translate(20,5)')
      .append('text')
      .attr('x', 10)
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', 14)
      .attr('font-weight', 'bolder')
      .text('-');
    const uint = svg.append('g').attr('transform', 'translate(12,22)');
    uint
      .append('text')
      .attr('x', 10)
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', 12)
      .attr('font-weight', '100')
      .style('stroke', '#9A9FA5')
      .text('ms/s');
    uint
      .append('text')
      .attr('x', width - 42)
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', 12)
      .attr('font-weight', '100')
      .style('stroke', '#9A9FA5')
      .text('hs/d');
  }, []);

  // 绘制比例尺
  const drawAxis = useCallback((svg: SVGSelection): DrawLinePathProps => {
    const t_max_min = d3.extent(data, (d) => d.time) as [Date, Date];
    // 格式化时间
    const formatTime = d3.timeFormat('%H:%M');
    // 定义坐标轴的比例尺，gW为x轴的宽度
    const xScale = d3
      .scaleTime()
      .range([left, chartWidthAndHeight.w + left])
      .domain(t_max_min);
    // .nice();
    // 同理 gH为y轴的高度
    const yScale = d3
      .scaleLinear()
      .range([chartWidthAndHeight.h + top, top])
      .domain([0, d3.max(data, (d) => d.value)!]);
    // 绘制网格
    const yInner = d3
      .axisLeft(yScale)
      .scale(yScale)
      .tickSize(chartWidthAndHeight.w)
      .tickFormat(() => '')
      .ticks(10);
    const yInnerBar = svg
      .append('g')
      .attr('class', 'inner_line inner_line_y')
      .attr('transform', `translate(${width - left},0)`)
      .call(yInner);
    yInnerBar
      .selectAll('path')
      .style('fill', 'none')
      // .style('stroke', 'transparent')
      .style('stroke', '#cac0d3')
      .style('shape-rendering', 'crispEdges');
    yInnerBar
      .selectAll('line')
      .style('fill', 'none')
      .style('stroke', '#cac0d3')
      .style('shape-rendering', 'crispEdges');
    // 绘制纵坐标
    // 实际绘制的宽高,注意svg层级关系
    const yAxis = d3.axisLeft(yScale);
    svg
      .append('g')
      .attr('transform', `translate(${left},${0})`)
      .append('g')
      .call(yAxis)
      // 文字颜色
      .attr('stroke', textColor);
    // 绘制横坐标 定义好x轴d定义域，画出x轴axisBottom，底部
    const xAxis = d3
      .axisBottom(xScale)
      .scale(xScale)
      .tickFormat((d) => formatTime(d as Date));
    svg
      .append('g')
      // .attr('transform', `translate(${left},${top})`)
      // .append('g')
      .attr('transform', `translate(0, ${chartWidthAndHeight.h + top})`)
      .call(xAxis)
      .attr('stroke', textColor);
    // 修改轴的颜色
    svg
      .append('g')
      .attr('transform', `translate(${left},${top})`)
      .selectAll('path')
      .attr('stroke', axisColor);
    svg
      .append('g')
      .attr('transform', `translate(${left},${top})`)
      .selectAll('g')
      .selectAll('line')
      .attr('stroke', axisColor);
    // g.selectAll('g').selectAll('text').attr('stroke', axisColor);
    return {
      svg,
      xScale,
      yScale,
    };
  }, []);

  // 绘制线段 及线段动画
  const drawLinePath = useCallback(
    ({ svg, xScale, yScale }: DrawLinePathProps): void => {
      // group the data: I want to draw one line per group
      const sumstat = d3.group(data, (d) => d.key);
      // console.log(sumstat, 'sumstat...');

      sumstat.forEach((d, i) => {
        // 创建一个line的生成器 用d3.line,把所有点连起来
        const line = d3
          .line<MockData>()
          .x((d) => xScale(d.time))
          .y((d) => yScale(d.value));
        // .curve(d3.curveCatmullRom);
        const path = svg
          .append('g')
          .append('path')
          .datum(d)
          .attr('d', line)
          .attr('stroke', handleColor(i))
          // .attr('stroke', () => {
          //   return 'hsl(' + Math.random() * 360 + ',100%,50%)';
          // })
          .attr('stroke-width', 2)
          .attr('fill', 'none');

        // 动画
        path
          .attr('stroke-dasharray', () => {
            // 返回路径总长度
            return path.node()?.getTotalLength() ?? 0;
          })
          .attr('stroke-dashoffset', () => path.node()?.getTotalLength() ?? 0)
          .style('fill', 'none')
          .style('stroke', handleColor(i))
          // .attr('stroke', () => {
          //   return 'hsl(' + Math.random() * 360 + ',100%,50%)';
          // })
          .transition()
          .duration(1500)
          .ease(d3.easeLinear)
          .attr('stroke-dashoffset', 0);
      });
    },
    []
  );

  // 移动
  const mousemove = useCallback(
    (
      event: React.MouseEvent<SVGSVGElement>,
      svg: SVGSelection,
      xScale: SVGScaleTime,
      yScale: SVGScaleLinear
    ) => {
      const tooltip = d3.select(`.${tooltipId}`);

      const x = d3.pointer(event)[0];
      const y = d3.pointer(event)[1];
      if (x < padding.left || x > width - right) {
        mouseout();
        return;
      }
      if (y < padding.top || y > height - bottom) {
        mouseout();
        return;
      }
      const time = matchTheRecentDate(xScale.invert(d3.pointer(event)[0]));

      const computedPageX = (): number => {
        const tooltipNode = tooltip.node() as HTMLDivElement;
        const { width: w } = tooltipNode.getBoundingClientRect();
        if (event.pageX + w + 20 > width - right) {
          const pageX = event.pageX - w - 30;
          return pageX;
        }
        return event.pageX;
      };
      // line
      d3.select(`.${tooltipLine}`).remove();
      svg
        .append('line')
        .attr('class', tooltipLine)
        .attr('stroke', '#ff4d00')
        .attr('x1', xScale(time))
        .attr('x2', xScale(time))
        .attr('y1', top)
        .attr('y2', height - bottom)
        .style('pointer-events', 'none');

      d3.selectAll(`.${tooltipCircle}`).remove();
      sumstat.forEach((d, i) => {
        svg
          .append('circle')
          .datum(d)
          .attr('class', tooltipCircle)
          .attr('cx', xScale(time))
          .attr('cy', (data) => {
            console.log(data,'data...')
            const r = data.find((d) => +d.time === +time)?.value ?? 0;
            return yScale(r);
          })
          .style('fill', handleColor(i))
          .attr('stroke', 'white')
          .attr('stroke-width', 2)
          .attr('r', 4)
          .style('pointer-events', 'none');
      });

      tooltip
        .style('opacity', 1)
        .style('transition', '.3s')
        .style('left', () => {
          const left = computedPageX() + 20;
          setDistance({ ...distance, left });
          return left + 'px';
        })
        .style('top', () => {
          const top = event.pageY - 20;
          setDistance({ ...distance, top });
          return top + 'px';
        })
        .html(d3.timeFormat('%Y-%m-%d')(time))
        // .html(d3.timeFormat('%Y-%m-%d %H:%M:%S')(time))
        .selectAll()
        .data(data)
        .enter()
        .append('div')
        .attr('class', tooltipText)
        .html((d, i) => {
          // console.log(i, 'i....');
          // console.log(d.time, time);
          // console.log(d,'d')
          // console.log(+formatTime, +d.time, 'formatTime...');
          if (+d.time === +time) {
            // return `${lineColor[i]}:${d.value}`;
            // console.log(d.value, '232323232');
            return `:${d.value}`;
          }
          return ``;
        });
    },
    []
  );
  // 移出
  const mouseout = useCallback(() => {
    d3.selectAll(`.${tooltipId}`).style('opacity', 0);
    d3.selectAll(`.${tooltipCircle}`).remove();
    d3.selectAll(`.${tooltipLine}`).remove();
  }, []);

  useEffect(() => {
    const { current: dom } = chartRef;
    if (!dom) {
      return;
    }
    dom.setAttribute('id', lineChartId);
    dom.style.background = '#c7c7f2';
    dom.style.position = 'relative';
    // init selection
    const selection = d3.select(`#${lineChartId}`);

    d3.select(`.${tooltipId}`).remove();
    d3.select(`#${lineChartId}`)
      .append('div')
      .attr('class', tooltipId)
      .style('position', 'absolute')
      .style('opacity', 0)
      .style('left', 0)
      .style('top', 0)
      .style('pointer-events', 'none')
      .style('border-radius', '0.5rem')
      .style('background-color', '#9696f2');

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
      .attr('rx', 14)
      .attr('stroke', 'red');

    // legend
    drawLegend(svg);
    // axis
    const { xScale, yScale } = drawAxis(svg);
    // linePath
    drawLinePath({ svg, xScale, yScale });

    svg
      .on('mousemove', (e) => mousemove(e, svg, xScale, yScale))
      .on('mouseout', mouseout);
  }, []);

  return <div ref={chartRef} />;
};
