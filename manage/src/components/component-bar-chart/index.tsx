import styled from '@emotion/styled';
import {
  axisBottom,
  axisLeft,
  axisTop,
  extent,
  group,
  scaleLinear,
  select,
  scaleBand,
  max,
} from 'd3';
import { format, getUnixTime } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLatest } from '~/hooks';

interface Props<T> {
  data: T[];
  getX: (d: T) => Date;
  getValue: (d: T) => number;
  getCategary: (d: T) => number;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

const minWidth = 280;
const minHeight = 200;
const headerHeight = 40;
const defaultMargin = { top: 10, right: 30, bottom: 30, left: 50 };
const padding = {
  x: 8,
  y: 8,
};

const colors = [
  { level: 1, s_color: '#FF9E9E', e_color: '#DF1B1B', label: '红色预警' },
  { level: 2, s_color: '#FFA268', e_color: '#DF6100', label: '橙色预警' },
  { level: 3, s_color: '#FFF062', e_color: '#E6BF08', label: '黄色预警' },
  { level: 4, s_color: '#6F88FF', e_color: '#4C4DE2', label: '蓝色预警' },
];

export const BarChart = <T,>({
  data,
  getX,
  getValue,
  getCategary,
  margin,
}: Props<T>): JSX.Element => {
  const [svgContainer, setSvgContainer] = useState<HTMLDivElement | null>();

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState(minHeight);

  const tooNarrow = useMemo(() => width < minWidth, [width]);
  const tooShort = useMemo(
    () => height + headerHeight + padding.y * 2 < minHeight,
    [height]
  );

  const getXRef = useLatest(getX);
  const getValueRef = useLatest(getValue);
  const getCategaryRef = useLatest(getCategary);

  const [tooltip, setTooltip] = useState<{
    tooltipDatum: T | null;
    clientX: number;
    clientY: number;
  }>();
  const curColor = useMemo(() => {
    const tooltipDatum = tooltip?.tooltipDatum;
    if (tooltipDatum) {
      return colors.find(
        (item) => item.level === getCategaryRef.current(tooltipDatum)
      );
    }
  }, [getCategaryRef, tooltip?.tooltipDatum]);

  const stat = useMemo(() => {
    return group(data, getCategaryRef.current);
  }, [data, getCategaryRef]);

  const { top, right, bottom, left } = useMemo(() => {
    return { ...defaultMargin, ...margin };
  }, [margin]);

  const getTextWidth = useCallback((text: string): number => {
    return Array.from(text).reduce((prev, cur) => {
      if (cur.charCodeAt(0) > 255) {
        return (prev += 4);
      } else {
        return (prev += 2);
      }
    }, 0);
  }, []);

  const categoryLen = useMemo<number>(() => {
    return Array.from(stat.keys()).length;
  }, [stat]);

  const statValues = useMemo<T[][]>(() => {
    return Array.from(stat.values()).map((cfg, i) => {
      return cfg.sort(
        (a, b) =>
          getUnixTime(getXRef.current(a)) - getUnixTime(getXRef.current(b))
      );
    });
  }, [getXRef, stat]);

  const xDomain = useMemo<Date[]>(() => {
    if (!statValues.length) {
      return [];
    }
    return statValues
      .sort((a, b) => b.length - a.length)[0]
      .map((d) => getXRef.current(d));
  }, [getXRef, statValues]);

  useEffect(() => {
    if (!svgContainer || tooNarrow || tooShort || !data.length) {
      return;
    }
    const [minX, maxX] = extent(data.map(getXRef.current));
    const maxY = max(data.map(getValueRef.current));

    if (minX == null || maxX == null || maxY == null) {
      return;
    }

    const nLeft = left + getTextWidth(maxY.toString());

    const xRange = [nLeft, width - right];
    const xScale = scaleBand(xDomain, xRange).padding(0.5);
    const yRange = [height - bottom, top];
    const yScale = scaleLinear([0, maxY], yRange).nice(5);

    const xDuration = maxX.valueOf() - minX.valueOf();
    const threeYears = 1000 * 60 * 60 * 24 * 365 * 3;
    const threeMonthes = 1000 * 60 * 60 * 24 * 30 * 3;
    const threeDays = 1000 * 60 * 60 * 24 * 3;
    const threeHours = 1000 * 60 * 60 * 3;
    const xAxis = axisBottom<Date>(xScale)
      .tickFormat((d, i) => {
        if (xDomain.length > 8 && i % 2 !== 0) {
          return '';
        }
        return xDuration > threeYears
          ? format(d, 'yyyy')
          : xDuration > threeMonthes
          ? format(d, 'MM 月')
          : xDuration > threeDays
          ? format(d, 'MM-dd')
          : xDuration > threeHours
          ? format(d, 'HH:mm')
          : format(d, 'mm:ss');
      })
      .ticks(5)
      .tickPadding(8);
    const yAxis = axisLeft(yScale)
      .tickFormat((d) => d.toString())
      .ticks(4);

    const sBandW = xScale.bandwidth();
    const colW = sBandW / categoryLen;

    const svg = select(svgContainer)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('width', width + 'px')
      .style('height', height + 'px')
      .attr('transform', `translate(0, ${headerHeight + top})`);

    // 显示背景色
    svg
      .append('rect')
      .attr('width', width + 'px')
      .attr('height', height + 'px')
      .attr('fill', 'transparent');

    // 显示 Grid
    const yGrid = svg
      .append('g')
      .attr('transform', `translate(${nLeft}, 0)`)
      .call(
        axisLeft(yScale)
          .tickFormat(() => '')
          .tickSize(-(width - nLeft - right))
          .ticks(4)
      );
    yGrid.selectAll('path').attr('stroke', '#D8D8D8');
    yGrid.selectAll('line').attr('stroke', '#D8D8D8');
    const xGrid = svg
      .append('g')
      .attr('transform', `translate(0,${top})`)
      .call(
        axisTop(xScale)
          .tickFormat(() => '')
          .tickSize(-(height - top - bottom))
          .ticks(4)
      );
    xGrid.selectAll('path').attr('stroke', '#D8D8D8');
    xGrid.selectAll('line').attr('stroke', '#D8D8D8');

    // 显示 x 轴
    const x = svg
      .append('g')
      .attr('transform', `translate(0, ${height - bottom})`);
    const xAxisGroup = x.call(xAxis);
    xAxisGroup.selectAll('path').attr('stroke', '#DCDEEA');
    xAxisGroup.selectAll('line').attr('stroke', 'transparent');
    xAxisGroup
      .selectAll('text')
      .attr('fill', '#9A9FA5')
      .attr('font-size', '14px');
    // 显示 y 轴
    const y = svg.append('g').attr('transform', `translate(${nLeft}, 0)`);
    const yAxisGroup = y.call(yAxis);
    yAxisGroup.selectAll('path').attr('stroke', '#DCDEEA');
    yAxisGroup.selectAll('line').attr('stroke', 'transparent');
    yAxisGroup
      .selectAll('text')
      .attr('fill', '#9A9FA5')
      .attr('font-size', '14px');

    // 绘制
    const series = svg
      .append('g')
      .selectAll('g.bar-chart')
      .data(statValues)
      .join('g')
      .attr('class', 'bar-chart')
      .attr('transform', (_, i) => {
        const seriesX = i * colW;
        return `translate(${seriesX} 0)`;
      })
      .attr('fill', (d) => {
        const conf = colors.find((item) =>
          d.some((d) => getCategaryRef.current(d) === item.level)
        );
        // const cur = d.find((d) =>
        //   colors.some((item) => item.level === getCategaryRef.current(d))
        // );
        if (conf) {
          // if (conf && cur) {
          // const defs = create('defs')
          //   .append('linearGradient')
          //   .attr('id', 'linearGrad')
          //   .attr('x1', '0')
          //   .attr('y1', '0')
          //   .attr('x2', '0')
          //   .attr('y2', '100%');
          // defs
          //   .append('stop')
          //   .attr('offset', '0%')
          //   .style('stop-color', conf.s_color);
          //   defs
          //   .append('stop')
          //   .attr('offset', '100%')
          //   .style('stop-color', conf.e_color);
          // const normalize = scaleLinear().domain([0, maxY]).range([0, 1]);
          // return interpolateRgb(
          //   conf.s_color,
          //   conf.e_color
          // )(normalize(getValueRef.current(cur)));
          return conf.s_color;
          // return `url(#linearGrad)`
        }
        // return colors[i % colors.length].s_color;
        return 'none';
      });
    const rects = series
      .selectAll('g.bar-chart')
      .data((d) => d)
      .join('rect')
      .classed('item', true);
    rects
      .attr('x', (d) => {
        const x = xScale(getXRef.current(d));
        if (x) {
          return x;
        }
        return '';
      })
      .attr('width', colW)
      .attr('y', (d) => yScale(getValueRef.current(d)))
      .attr('height', (d) => {
        return yScale(0) - yScale(getValueRef.current(d));
      });

    // const tip = select(svgContainer)
    //   .append('div')
    //   .attr('id', 'tip')
    //   .attr('width', '100px')
    //   .style('background-color', 'rgba(0,0,0,.3)')
    //   .style('position','absolute')
    //   .style('color','white')
    //   .style('text-align','center')
    //   .style('margin','5px')
    //   .style('box-sizing','border-box')

    // tooltip
    rects.on('mouseover', ({ offsetX, offsetY }, d) => {
      setTooltip({ tooltipDatum: d, clientX: offsetX, clientY: offsetY });
      // tip.style('display', 'block')
      //   .style('left', clientX + 'px')
      //   .style('top', clientY + 'px')
      //   .html(`
      //         <div>${getValueRef.current(d)}</div>
      //     `)
    });
    rects.on('mousemove', ({ offsetX, offsetY }, d) => {
      setTooltip({ tooltipDatum: d, clientX: offsetX, clientY: offsetY });

      // tip.style('left', clientX + 'px')
      //   .style('top', clientY + 'px')
    });
    /*隐藏提示*/
    rects.on('mouseout', () => {
      setTooltip(undefined);
      // tip.style('display', 'none')
    });

    return () => {
      svg.remove();
    };
  }, [
    svgContainer,
    data,
    getValueRef,
    getXRef,
    left,
    width,
    right,
    height,
    bottom,
    top,
    tooNarrow,
    tooShort,
    getTextWidth,
    xDomain,
    categoryLen,
    statValues,
    getCategaryRef,
  ]);

  useEffect(() => {
    if (!svgContainer) {
      return;
    }
    const handler = () => {
      setWidth(svgContainer.clientWidth);
      setHeight(
        Math.max(minHeight, svgContainer.clientHeight) -
          headerHeight -
          padding.y * 2
      );
    };
    handler();
    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [svgContainer]);

  return (
    <div
      ref={setSvgContainer}
      className="w-full h-full bg-white rounded relative"
    >
      {tooNarrow && (
        <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 text-center">
          窗口过窄
        </span>
      )}
      {!tooNarrow && data.length === 0 && (
        <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 text-center">
          暂无数据
        </span>
      )}
      <div
        className="w-full absolute left-0 top-0 z-20 flex justify-start items-center px-4 box-border"
        style={{ height: headerHeight }}
      >
        <div className="font-bold text-sm text-[#040F1F] whitespace-nowrap">
          告警统计
        </div>
        <ul className="flex-1 ml-5 flex justify-between items-center">
          <li className="flex justify-start flex-row-reverse items-center h-full ml-4 flex-1 whitespace-nowrap">
            {colors.map((d) => (
              <p
                key={d.level}
                className="text-[12px] text-[#9A9FA5] mr-7 first:mr-0 relative"
              >
                <span
                  className="absolute top-1/2 left-[-12px] w-[10px] h-[10px] rounded-[50%] translate-y-[-50%]"
                  style={{ backgroundColor: d.s_color }}
                ></span>
                <span className="ml-1">{d.label}</span>
              </p>
            ))}
          </li>
        </ul>
      </div>
      <TooltipContainer
        className="absolute transition-all pointer-events-none p-2 rounded-lg z-10"
        style={{
          left: tooltip?.clientX + 'px',
          top: tooltip?.clientY + 'px',
          display: !!tooltip ? 'block' : 'none',
        }}
      >
        {tooltip?.tooltipDatum && (
          <React.Fragment>
            <div className="text-xs text-[#040F1F] pointer-events-none">
              {format(
                getXRef.current(tooltip?.tooltipDatum),
                'yyyy-MM-dd HH:mm'
              )}
            </div>
            {curColor && (
              <TooltipContent
                color={curColor.s_color}
                value={getValueRef.current(tooltip?.tooltipDatum)}
              />
            )}
          </React.Fragment>
        )}
      </TooltipContainer>
    </div>
  );
};

const TooltipContainer = styled.div`
  background: rgba(255, 255, 255, 0.7);
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
`;

const TooltipContent: React.FC<{ color: string; value?: string | number }> = ({
  color,
  value,
}) => {
  return (
    <div className="pointer-events-none text-sm text-[#040F1F] font-semibold ml-5 first:ml-0 relative whitespace-nowrap">
      <span
        className="absolute top-1/2 left-[-12px] w-[10px] h-[10px] rounded-[50%] translate-y-[-50%]"
        style={{ backgroundColor: color }}
      ></span>
      ：<span className="ml-2 whitespace-nowrap">{value ?? '-'}</span>
    </div>
  );
};
