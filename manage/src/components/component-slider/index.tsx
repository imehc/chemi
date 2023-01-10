import styled from '@emotion/styled';
import { format, getUnixTime } from 'date-fns';
import RCSlider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Handle from 'rc-slider/lib/Handles/Handle';
import React, { HTMLAttributes, useCallback, useId, useMemo } from 'react';

interface BaseSliderProps extends HTMLAttributes<HTMLDivElement> {
  startIndex?: number;
  endIndex?: number;
  min?: number;
  max?: number;
  onDragChange: (val: number[]) => void;
  marks?: Date[];
}

export const Slider: React.FC<BaseSliderProps> = (props) => {
  const id = useId();

  const {
    startIndex = 0,
    endIndex = 50,
    min = 0,
    max = 100,
    onDragChange,
    marks,
    ...attr
  } = useMemo(() => props, [props]);

  /**
   * 按升序排序
   */
  const marksSort = useMemo(
    () => marks?.sort((a, b) => getUnixTime(a) - getUnixTime(b)),
    [marks]
  );

  const formatDate = useCallback(
    (date: Date, hasDefault: boolean): string => {
      const duration =
        marksSort![marksSort!.length - 1].valueOf() - marksSort![0].valueOf();
      const threeYears = 1000 * 60 * 60 * 24 * 365 * 3;
      const threeMonthes = 1000 * 60 * 60 * 24 * 30 * 3;
      const threeDays = 1000 * 60 * 60 * 24 * 3;
      const threeHours = 1000 * 60 * 60 * 3;
      try {
        if (duration > threeYears) {
          return format(date, 'yyyy');
        }
        if (duration > threeMonthes) {
          return format(date, 'MM 月');
        }
        if (duration > threeDays) {
          return format(date, 'MM-dd');
        }
        if (duration > threeHours) {
          return format(date, 'HH:mm');
        }
        return format(date, 'mm:ss');
      } catch (e) {
        console.error(e);
        return '';
      }
    },
    [marksSort]
  );

  const convertToMarks: Record<number, React.ReactNode> | undefined =
    useMemo(() => {
      if (!marksSort?.length) return;
      return {
        ...marksSort?.map((m, i) => {
          const f = [startIndex, endIndex, 0, marksSort.length - 1].includes(i);
          const v =
            marksSort.length <= 20 ||
            (marksSort.length > 20 && marksSort.length <= 50 && i % 2 === 0) ||
            (marksSort.length > 50 && marksSort.length <= 100 && i % 5 === 0) ||
            (marksSort.length > 100 && i % 10 === 0);
          return (
            <div
              className="whitespace-nowrap m-2"
              key={id + i}
              style={{
                color: i === startIndex || i === endIndex ? '#0D1827' : '',
                fontWeight:
                  i === startIndex || i === endIndex ? 'bold' : 'normal',
              }}
            >
              {v || i === marksSort.length - 1 ? formatDate(m, f) : ''}
            </div>
          );
        }),
      };
    }, [endIndex, formatDate, id, marksSort, startIndex]);

  const date = useMemo(() => {
    let start = '';
    let end = '';
    try {
      if (!marksSort?.[startIndex] || !marksSort?.[endIndex]) return;
      start = format(marksSort?.[startIndex], 'yy-MM-dd hh:mm:ss');
      end = format(marksSort?.[endIndex], 'yy-MM-dd hh:mm:ss');
    } catch (e) {
      console.error(e);
    }
    return { start, end };
  }, [endIndex, marksSort, startIndex]);

  return (
    <SliderWrap className="w-full h-16 pl-2 pr-3 overflow-x-hidden mt-3 select-none">
      <RCSlider
        {...attr}
        range
        allowCross={false}
        defaultValue={[startIndex, endIndex]}
        min={min}
        max={max - 1}
        draggableTrack
        marks={convertToMarks}
        railStyle={{
          backgroundColor: '#F4F6FB',
          height: 15,
          borderRadius: 15,
        }}
        trackStyle={{
          backgroundColor: '#60a5f3',
          height: 15,
          boxShadow: '3px 3px 3px 3px rgba(216, 216, 216,0.5)',
        }}
        handleStyle={{
          opacity: 1,
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          height: 36,
          width: 36,
          transform: 'translate(-15px, -5px)',
        }}
        handleRender={(state, i) => (
          <Handle {...state.props}>
            {/* TODO: icon或者img  */}
            <img src="" alt="" />
            <p
              className="absolute top-[50%] translate-y-[-50%] text-[12px] whitespace-nowrap"
              style={{
                color: '#666666',
                right: i.index === 0 ? '30px' : '',
                left: i.index === 1 ? '30px' : '',
              }}
            >
              {i.index === 0 ? date?.start : i.index === 1 ? date?.end : ''}
            </p>
          </Handle>
        )}
        onChange={(val) => onDragChange(val as number[])}
      />
    </SliderWrap>
  );
};

const SliderWrap = styled.div`
  & .rc-slider {
    height: 100%;
  }
  &
    .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color: transparent;
    box-shadow: none;
  }
  & .rc-slider-handle:focus-visible {
    box-shadow: none;
  }
  & .rc-slider-dot-active {
    border-color: transparent;
  }
  & .rc-slider-dot {
    background-color: transparent;
    border: none;
  }
  & .rc-slider-step {
    opacity: 0;
  }
  & .rc-slider-handle-1 .rc-slider-handle-2 {
    position: relative;
  }
  & .rc-slider-mark-text:first-of-type {
    left: 0.8% !important;
  }
  & .rc-slider-mark-text:last-child {
    left: 99.2% !important;
  }
`;
