import clsx from 'clsx';
import {
  select,
  scaleTime,
  scaleLinear,
  line,
  axisBottom,
  axisLeft,
  extent,
  bisector,
  pointer,
  group,
  easeLinear,
  selectAll,
  curveCatmullRom,
} from 'd3';
import { format } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  catchError,
  delay,
  EMPTY,
  fromEventPattern,
  last,
  switchMap,
  tap,
  windowToggle,
} from 'rxjs';
import { useLatest } from '~/hooks/useLatest';

interface Props<T> {
  data: T[];
  getX: (d: T) => Date ;
  getY: (d: T) => number ;
  yLabel?: string;
  yUnitLabel?: string;
  multiKey?: (d: T) => string;
  themeColor?: string[];
}

// 以 Material UI 的 break point 作为标准
// sm 为 600px, 一个图标占 6/12 位置即 300px 宽，留 20px 空间的空白，即 300 - 20 = 280px
//  https://mui.com/material-ui/customization/breakpoints/#default-breakpoints
const minWidth = 280;
const minHeight = 200;

export const LineChart = <T,>({
  data,
  getX,
  getY,
  yLabel,
  yUnitLabel,
  multiKey,
  themeColor = [
    '#F9975B',
    '#AA5BF9',
    '#5B8EF9',
    '#63CF65',
    '#23C1CE',
    '#E1D721',
  ],
}: Props<T>) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState(minHeight);

  const tooNarrow = useMemo(() => width < minWidth, [width]);
  const tooShort = useMemo(() => height < minHeight, [height]);

  const stat = useMemo(() => multiKey && group(data, multiKey), []);

  const margin = { top: 20, right: 30, bottom: 40, left: 40 };

  const [container, setContainer] = useState<HTMLDivElement | null>();
  const [tipContainer, setTipContainer] = useState<HTMLDivElement | null>();
  const getXRef = useLatest(getX);
  const getYRef = useLatest(getY);

  const [{ tooltipDatum, tooltipTop, tooltipLeft }, setTooltip] = useState<{
    tooltipDatum: T | null;
    tooltipTop: number;
    tooltipLeft: number;
  }>({ tooltipDatum: null, tooltipTop: 0, tooltipLeft: 0 });

  // 匹配颜色
  const handleColor = useCallback((i: string): string => {
    switch (i) {
      case 'x':
        return themeColor[0];
      case 'y':
        return themeColor[1];
      case 'z':
        return themeColor[2];
      default:
        return themeColor[0];
    }
  }, []);

  useEffect(() => {
    if (!container || tooNarrow || tooShort) {
      return;
    }

    const [minX, maxX] = extent(data.map(getXRef.current));
    const [minY, maxY] = extent(data.map(getYRef.current));
    if (minX == null || maxX == null || minY == null || maxY == null) {
      return;
    }

    const xRange = [margin.left, width - margin.right];
    const xScale = scaleTime([minX, maxX], xRange).nice(6);

    const yRange = [height - margin.bottom, margin.top];
    const yScale = scaleLinear([minY, maxY], yRange).nice(5);

    const xDuration = maxX.valueOf() - minX.valueOf();
    const threeYears = 1000 * 60 * 60 * 24 * 365 * 3;
    const threeMonthes = 1000 * 60 * 60 * 24 * 30 * 3;
    const threeDays = 1000 * 60 * 60 * 24 * 3;
    const threeHours = 1000 * 60 * 60 * 3;
    const xAxis = axisBottom<Date>(xScale)
      .tickFormat((d) =>
        xDuration > threeYears
          ? format(d, 'yyyy')
          : xDuration > threeMonthes
          ? format(d, 'MM 月')
          : xDuration > threeDays
          ? format(d, 'MM-dd')
          : xDuration > threeHours
          ? format(d, 'HH:mm')
          : format(d, 'mm:ss')
      )
      .ticks(4)
      .tickPadding(8);
    const yAxis = axisLeft(yScale)
      .tickFormat((d) => d.toString())
      .ticks(4);

    const svg = select(container)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('width', '100%')
      .style('height', height + 'px');

    // 显示背景色
    const tooltipTarget = svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'transparent');

    // 显示 Grid
    const yGrid = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(
        axisLeft(yScale)
          .tickFormat(() => '')
          .tickSize(-(width - margin.left - margin.right))
          .ticks(4)
      );
    yGrid.selectAll('path').attr('stroke', '#DCDEEA');
    yGrid.selectAll('line').attr('stroke', '#DCDEEA');

    // 显示 数据
    const l = line<T>()
      .x((d) => xScale(getXRef.current(d)))
      .y((d) => yScale(getYRef.current(d)))
      .curve(curveCatmullRom)

    const drawPath = (d: T[], i?: string) => {
      const path = svg
        .append('g')
        .append('path')
        .datum(d.filter((d) => getYRef.current(d) != null))
        .attr('d', l)
        .attr('stroke', i ? handleColor(i) : themeColor)
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
        .style('stroke', i ? handleColor(i) : themeColor[0])
        .transition()
        .duration(1500)
        .ease(easeLinear)
        .attr('stroke-dashoffset', 0);
    };
    if (stat) {
      stat.forEach((d, i) => drawPath(d, i));
    } else {
      drawPath(data);
    }

    // 显示 x 轴
    const x = svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`);
    const xAxisGroup = x.call(xAxis);
    xAxisGroup.selectAll('path').attr('stroke', '#DCDEEA');
    xAxisGroup.selectAll('line').attr('stroke', '#DCDEEA');
    xAxisGroup
      .selectAll('text')
      .attr('fill', '#9A9FA5')
      .attr('font-size', '14px');

    // 显示 y 轴
    const y = svg.append('g').attr('transform', `translate(${margin.left}, 0)`);
    const yAxisGroup = y.call(yAxis);
    yAxisGroup.selectAll('path').attr('stroke', '#DCDEEA');
    yAxisGroup.selectAll('line').attr('stroke', '#DCDEEA');
    yAxisGroup
      .selectAll('text')
      .attr('fill', '#9A9FA5')
      .attr('font-size', '14px');

    // 因为 tooltip 元素会出现在鼠标当前位置导致触发 mouseleave，务必设置 tooltip 元素的 point-event 样式为 none
    const mouseenter$ = fromEventPattern<MouseEvent>((addHandler) => {
      tooltipTarget.on('mouseenter', addHandler);
    });
    const mousemove$ = fromEventPattern<MouseEvent>(
      (addHandler) => {
        tooltipTarget.on('mousemove', addHandler);
      },
      undefined,
      (evt) => evt
    );
    const mouseout$ = fromEventPattern<MouseEvent>((addHandler) => {
      tooltipTarget.on('mouseleave', addHandler);
    });

    const bisectDate = bisector<T, ReturnType<typeof getX>>((d, t) => {
      const r = getXRef.current(d);
      return r.valueOf() - t.valueOf();
    }).left;

    const removeTooltip = () => {
      select('.line-chart-tip').remove();
      selectAll('.line-chart-tip-circle').remove();
    };

    const tooltipTask = mousemove$
      .pipe(
        windowToggle(mouseenter$, () => mouseout$),
        switchMap((move$) => {
          return move$.pipe(
            tap((evt) => {
              const [offsetX, offsetY] = pointer(evt);
              if (offsetX < margin.left || offsetX > width - margin.right) {
                return mouseout$;
              }
              if (offsetY < margin.top || offsetY > height - margin.bottom) {
                return mouseout$;
              }
              const index = bisectDate(data, xScale.invert(offsetX));
              const datum = data[index];
              if (!datum) {
                return;
              }

              removeTooltip();
              svg
                .append('line')
                .attr('class', 'line-chart-tip')
                .attr('stroke', themeColor[0])
                .attr('stroke-dasharray', '3 2')
                .attr('x1', xScale(getXRef.current(datum)))
                .attr('x2', xScale(getXRef.current(datum)))
                .attr('y1', margin.top)
                .attr('y2', height - margin.bottom)
                .style('pointer-events', 'none');

              const drawTipCircle = (d: T[], i?: string) => {
                svg
                  .append('circle')
                  .datum(d)
                  .attr('class', 'line-chart-tip-circle')
                  .attr('cx', xScale(getXRef.current(datum)))
                  .attr('cy', (data) => {
                    const r = data.find((d) => {
                      return +getXRef.current(d) === +getXRef.current(datum);
                    });
                    if (!r) {
                      return 0;
                    }
                    return yScale(getYRef.current(r));
                  })
                  .style('pointer-events', 'none')
                  .style('fill', i ? handleColor(i) : themeColor[0])
                  .attr('stroke', 'white')
                  .attr('stroke-width', 2)
                  .attr('r', 4);
              };
              if (stat) {
                stat.forEach((d, i) => drawTipCircle(d, i));
              } else {
                drawTipCircle(data);
              }

              const datumX = xScale(+getXRef.current(datum) - 20);
              const datumY = yScale(getYRef.current(datum) + 20);
              setTooltip({
                tooltipDatum: datum,
                tooltipTop: datumY,
                tooltipLeft: datumX,
              });
            }),
            last(),
            catchError((err) => {
              console.error(err);
              return EMPTY;
            }),
            delay(300),
            tap(() => {
              setTooltip({ tooltipDatum: null, tooltipTop: 0, tooltipLeft: 0 });
              removeTooltip();
            })
          );
        })
      )
      .subscribe({
        error: (err) => {
          mouseout$;
          console.error(err);
        },
      });

    return () => {
      tooltipTask.unsubscribe();
      svg.remove();
    };
  }, [
    container,
    data,
    getXRef,
    getYRef,
    height,
    margin.bottom,
    margin.left,
    margin.right,
    margin.top,
    tooNarrow,
    tooShort,
    width,
  ]);

  useEffect(() => {
    if (!container) {
      return;
    }

    const handler = () => {
      setWidth(container.clientWidth);
      setHeight(Math.max(minHeight, container.clientHeight));
    };
    handler();
    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [container]);

  useEffect(() => {
    if (!tipContainer) {
      return;
    }
    const { clientWidth } = tipContainer;
    if (tooltipLeft + clientWidth + 20 > width - margin.right) {
      const left = tooltipLeft - clientWidth - 30;
      setTooltip({ tooltipDatum, tooltipTop, tooltipLeft: left });
    }
  }, [tooltipLeft]);

  return (
    <div className="w-full relative bg-[#F4F6FB] rounded-[15px] p-4">
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
        className={clsx(
          'flex flex-row justify-between',
          tooNarrow && 'invisible'
        )}
      >
        <div>
          <h3 className="whitespace-nowrap">{yLabel}</h3>
          <p className="text-gray-400 whitespace-nowrap">{yUnitLabel ?? ''}</p>
        </div>

        <div className="flex flex-row items-center">
          {stat ? (
            <div></div>
          ) : (
            <div className="mr-4 flex flex-row items-center">
              <div className="w-[12px] h-[12px] rounded-full bg-[#34cc34]"></div>
              <span className="ml-1 text-[#9a9fa5] text-xs">{yLabel}</span>
            </div>
          )}
          <button className="border border-solid px-2 py-1 text-xs rounded-lg">
            对比
          </button>
        </div>
      </div>
      <div className={clsx('flex flex-row h-full', tooNarrow && 'invisible')}>
        <div
          ref={setContainer}
          className="flex-1 h-full relative"
          style={{
            minHeight: minHeight + 'px',
          }}
        >
          {tooltipDatum && (
            <div
              ref={setTipContainer}
              className="absolute flex flex-col pointer-events-none ml-2 bg-white rounded-lg p-4 transition-all"
              style={{
                top: tooltipTop + 'px',
                left: tooltipLeft + 'px',
              }}
            >
              <div className="whitespace-nowrap">
                {format(getX(tooltipDatum), 'yyyy-MM-dd HH:mm')}
              </div>
              <div className="mt-1 flex flex-row items-center">
                <div className="w-[12px] h-[12px] bg-[#34cc34] rounded-full"></div>
                <div className="flex-1 ml-1 whitespace-nowrap">
                  <span>{yLabel}:</span>
                  <span className="ml-2">{getY(tooltipDatum)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
