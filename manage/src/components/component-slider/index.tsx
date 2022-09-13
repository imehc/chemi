import { format } from "date-fns";
import RSlider from "rc-slider";
import "rc-slider/assets/index.css";
import Handle from "rc-slider/lib/Handles/Handle";
import React, { HTMLAttributes, useCallback, useMemo } from "react";

interface BaseSliderProps extends HTMLAttributes<HTMLDivElement> {
  startIndex?: number;
  endIndex?: number;
  min?: number;
  max?: number;
  handleUpdate: (val: number[]) => void;
  marks?: Date[];
  /**
   * 日期格式化
   * @example ["MM-dd","dd"]
   */
  marksType?: string[];
}

const css = `
  .rc-slider {
    height: 100%;
  }
  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color : transparent;
    box-shadow : none;
  }
  .rc-slider-handle:focus-visible {
    box-shadow: none;
  }
  .rc-slider-dot-active {
    border-color: transparent;
  }
  .rc-slider-dot {
    background-color: transparent;
    border: none;
  }
  .rc-slider-step {
    opacity: 0;
  }
  .rc-slider-handle-1 .rc-slider-handle-2 {
    position: relative;
  }
  .rc-slider-mark-text:first-child{
    left:0.8% !important;
  }
  .rc-slider-mark-text:last-child{
    left:99.2% !important;
  }
`;

export const Slider: React.FC<BaseSliderProps> = (props) => {
  const {
    startIndex = 0,
    endIndex = 50,
    min = 0,
    max = 100,
    handleUpdate,
    marks,
    marksType = ["hh:mm", "hh"],
    ...attr
  } = props;

  const formatDate = useCallback(
    (date: Date, marksType: string[], b: boolean): string => {
      let d: string = "";
      try {
        const formatDate = b ? marksType[0] : marksType[1];
        d = format(date, formatDate);
      } catch (e) {
        console.error(e);
      }
      return d;
    },
    []
  );

  const convertToMarks: Record<number, React.ReactNode> | undefined =
    useMemo(() => {
      if (!marks?.length) return;
      return {
        ...marks?.map((m, i) => {
          const f = [startIndex, endIndex, 0, marks.length - 1].includes(i);
          const v =
            marks.length <= 20 ||
            (marks.length > 20 && marks.length <= 50 && i % 2 === 0) ||
            (marks.length > 50 && i % 5 === 0);
          return (
            <div
              className="whitespace-nowrap m-2"
              key={`mark-${i}`}
              style={{
                color: i === startIndex || i === endIndex ? "#0D1827" : "",
                fontWeight:
                  i === startIndex || i === endIndex ? "bold" : "normal",
              }}
            >
              {v || i === marks.length - 1 ? formatDate(m, marksType, f) : ""}
            </div>
          );
        }),
      };
    }, [endIndex, formatDate, marks, marksType, startIndex]);
  const date = useMemo(() => {
    let start = "";
    let end = "";
    try {
      if (!marks?.[startIndex] || !marks?.[endIndex]) return;
      start = format(marks?.[startIndex], "yy-MM-dd hh:mm:ss");
      end = format(marks?.[endIndex], "yy-MM-dd hh:mm:ss");
    } catch (e) {
      console.error(e);
    }
    return { start, end };
  }, [endIndex, marks, startIndex]);
  return (
    <div className="w-full h-16 pl-2 pr-3 overflow-x-hidden mt-3">
      <style>{css}</style>
      <RSlider
        {...attr}
        range
        allowCross={false}
        defaultValue={[startIndex, endIndex]}
        min={min}
        max={max - 1}
        draggableTrack
        marks={convertToMarks}
        railStyle={{
          backgroundColor: "#F4F6FB",
          height: 15,
          borderRadius: 15,
        }}
        trackStyle={{
          backgroundColor: "#a0daed",
          height: 15,
          boxShadow: "3px 3px 3px 3px rgba(216, 216, 216,0.5)",
        }}
        handleStyle={{
          opacity: 1,
          borderColor: "transparent",
          backgroundColor: "transparent",
          height: 36,
          width: 36,
          transform: "translate(-15px, -5px)",
        }}
        handleRender={(state, i) => {
          return (
            <Handle {...state.props}>
              <img src="" alt="img" />
              <p
                className="absolute top-[50%] translate-y-[-50%] text-[12px] whitespace-nowrap"
                style={{
                  color: "#666666",
                  right: i.index === 0 ? "30px" : "",
                  left: i.index === 1 ? "30px" : "",
                }}
              >
                {i.index === 0 ? date?.start : i.index === 1 ? date?.end : ""}
              </p>
            </Handle>
          );
        }}
        onChange={(val) => handleUpdate(val as number[])}
      />
    </div>
  );
};
