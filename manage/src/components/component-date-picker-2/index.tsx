import { addYears, getYear } from "date-fns";
import { range as rangeDate } from "ramda";
import React, {
  type CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useStatic } from "../../hooks";
import pic下拉箭头 from "./assets/下拉箭头.svg";
import pic日期 from "./assets/日期.svg";
import { DatePick, type ReactDatePickerProps } from "./DatePick";
import clsx from "clsx";
type DateRange = {
  startDate: Date;
  endDate?: Date;
};

/**
 * 标记日期
 */
export type DateMark = {
  date: Date;
  /**
   * @description 告警颜色
   * @param red 红色 #EB6767
   * @param orange 橙色 #FF9A16
   * @param yellow 黄色 #FFE042
   * @param blue 蓝色 #5B8EF9
   */
  color: "red" | "orange" | "yellow" | "blue";
};

interface DatePickerProps {
  defaultValue?: DateRange | Date;
  /**
   * 是否允许清除
   */
  allowClear?: boolean;
  /**
   * 是否是区间选择
   */
  range?: boolean;
  onChange?: (date: DateRange) => void;
  /**
   * 是否允许选择起始日期和结束日期后才会返回，需range为true
   */
  allResults?: boolean;
  placeholderText?: string;
  placeholderText2?: string;
  maxDate?: Date;
  disabled?: boolean;
  /**
   * @default "middle"
   */
  size?: ReactDatePickerProps["size"];
  hasBorder?: boolean;
  /**
   * @default "day"
   */
  type?: "year" | "month" | "day" | "minute";
  /**图标 */
  icon?: boolean;
  /**末尾下箭头 */
  arrow?: boolean;
  style?: CSSProperties;
  /**
   * 固定宽度
   * @augments - standard 26.0625rem 436px
   * @augments - full 100%
   * @augments - 450px
   */
  fixedWidthOption?: "standard" | "full" | "wider";
  /**
   * 日期标记
   */
  marks?: ReactDatePickerProps["marks"];
  /**
   * 是否显示年份下拉框
   * @default true
   */
  showYearSelectPicker?: boolean;
  /**
   * 文字加粗
   * @default false
   */
  bold?: boolean;
}

export const DatePicker2: React.FC<DatePickerProps> = ({
  defaultValue,
  allowClear = true,
  range = false,
  onChange,
  allResults = false,
  placeholderText = "请选择日期",
  placeholderText2 = "请选择日期",
  maxDate,
  disabled = false,
  size = "middle",
  type = "day",
  hasBorder = false,
  icon = true,
  arrow = false,
  style,
  fixedWidthOption,
  marks,
  showYearSelectPicker = true,
}) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleStartDate = useCallback((date: Date) => setStartDate(date), []);
  const handleEndDate = useCallback((date: Date) => setEndDate(date), []);
  const handleResetDate = useCallback(() => {
    setStartDate(undefined);
    setEndDate(undefined);
  }, []);

  useMemo(() => {
    if (defaultValue) {
      setStartDate(
        defaultValue instanceof Date ? defaultValue : defaultValue?.startDate
      );
      setEndDate(
        defaultValue instanceof Date ? defaultValue : defaultValue?.endDate
      );
    } else {
      handleResetDate();
    }
  }, [defaultValue, handleResetDate]);

  const changeRef = useStatic(onChange);
  useEffect(() => {
    if (!changeRef.current) return;
    if (!startDate) return;
    if (!range) {
      changeRef.current({ startDate: startDate });
      return;
    }
    if (allResults) {
      endDate && changeRef.current({ startDate, endDate });
      return;
    }
    changeRef.current({ startDate, endDate });
  }, [startDate, endDate, changeRef, range, allResults]);

  useEffect(() => {
    if (!startDate || !endDate) return;
    if (startDate > endDate) {
      setStartDate(endDate);
      setEndDate(startDate);
    }
  }, [endDate, startDate]);

  const months = useMemo(
    () => [...new Array(12)].map((_, i) => ( i + 1 + "月" )),
    []
  );
  const years = useMemo(
    () =>
      rangeDate(1990)(getYear(addYears(new Date(), 30))),
    []
  );

  return (
    <div
      className={clsx(
        "flex justify-center items-center w-full h-8 bg-[#F4F6FB] shadow-sm rounded-lg relative px-[10px]",
        {
          "max-w-xs": !fixedWidthOption,
        }
      )}
      style={{
        height:
          size === "large"
            ? "2.75rem"
            : size === "middle"
            ? "2.5rem"
            : "1.875rem",
        border: hasBorder ? "1px solid #E6E6E6" : "none",
        width:
          fixedWidthOption === "standard"
            ? "436px"
            : fixedWidthOption === "full"
            ? "100%"
            : fixedWidthOption === "wider"
            ? "450px"
            : "auto",
        ...style,
      }}
    >
      {icon && <img src={pic日期} alt="" className="h-4" />}

      <DatePick
        disabled={disabled}
        years={years}
        months={months}
        selected={startDate}
        selectsEnd={false}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        setDate={handleStartDate}
        maxDate={maxDate}
        placeholderText={placeholderText || "起始日期"}
        showTimeInput={type === "minute"}
        showMonthYearPicker={type === "month"}
        showYearPicker={type === "year"}
        marks={marks}
        showYearSelectPicker={showYearSelectPicker}
        bold={!!startDate}
        size={size}
      />
      {range && (
        <React.Fragment>
          <div
            className={clsx("text-[#040F1F] font-bold", {
              "text-lg": size === "large",
              "text-base": size === "middle",
              "text-sm": size === "small",
            })}
          >
            至
          </div>
          {icon && <img src={pic日期} alt="" className="h-4 ml-[10px]" />}
          <DatePick
            disabled={!allResults ? (startDate ? disabled : true) : undefined}
            years={years}
            months={months}
            selected={endDate}
            selectsStart={false}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            setDate={handleEndDate}
            maxDate={maxDate}
            placeholderText={placeholderText2 || "结束日期"}
            showTimeInput={type === "minute"}
            marks={marks}
            showYearSelectPicker={showYearSelectPicker}
            bold={!!endDate}
            size={size}
          />
        </React.Fragment>
      )}
      {allowClear && (startDate || endDate) && !disabled && (
        <div
          className="absolute right-2 top-[50%] translate-y-[-50%] w-5 h-5 rounded-[50%] border-[1px] border-solid border-gray-10 after:content-[''] after:absolute after:w-3 after:h-[2px] after:rounded after:bg-gray-200  after:top-[50%] after:left-[50%] after:rotate-45 after:translate-x-[-50%] after:translate-y-[-50%] before:content-[''] before:absolute before:w-3 before:h-[2px] before:rounded before:bg-gray-200 before:top-[50%] before:left-[50%] before:rotate-[-45deg] before:translate-x-[-50%] before:translate-y-[-50%] cursor-pointer hover:bg-gray-100"
          onClick={() => handleResetDate()}
        ></div>
      )}

      {!startDate && arrow && (
        <img
          className="absolute right-[0.8rem] top-[50%] translate-y-[-50%]"
          src={pic下拉箭头}
          alt="下箭头"
        />
      )}
    </div>
  );
};
