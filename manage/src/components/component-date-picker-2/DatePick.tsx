import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDatePicker from "react-datepicker";
import zhCN from "date-fns/locale/zh-CN";
import {
  addMinutes,
  getHours,
  getMinutes,
  getMonth,
  getYear,
  isAfter,
  setHours,
  setMinutes,
} from "date-fns";
import "./index.css";
import { SelectV1 } from "..";
import leftArrowCheckedIcon from "./assets/left_arrow.svg";
import leftArrowIcon from "./assets/left_arrow_grey.svg";
import rightArrowCheckedIcon from "./assets/right_arrow.svg";
import rightArrowIcon from "./assets/right_arrow_grey.svg";
import styled from "@emotion/styled";
import { groupBy } from "ramda";
import clsx from "clsx";

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

// docs https://reactdatepicker.com/#example-year-select-dropdown

export interface ReactDatePickerProps {
  years: number[];
  months: string[];
  selectsStart: boolean;
  selectsEnd: boolean;
  setDate?: (date: Date) => void;
  placeholderText?: string;
  selected?: Date;
  startDate?: Date;
  endDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  showTimeInput?: boolean;
  showMonthYearPicker?: boolean;
  showYearPicker?: boolean;
  marks?: DateMark[];
  showYearSelectPicker?: boolean;
  bold?: boolean;
  size: "large" | "middle" | "small";
}

export const DatePick: React.FC<ReactDatePickerProps> = ({
  years,
  months,
  selectsStart,
  selectsEnd,
  setDate,
  placeholderText = "请选择日期",
  selected,
  startDate,
  endDate,
  maxDate,
  disabled = false,
  showTimeInput = false,
  showMonthYearPicker = false,
  showYearPicker = false,
  marks = [],
  showYearSelectPicker = false,
  bold = false,
  size = "middle",
}) => {
  const ref = useRef<ReactDatePicker<never, undefined>>(null);

  const dateFormat = useMemo(() => {
    if (showYearPicker) {
      return "yyyy";
    }
    if (showMonthYearPicker) {
      return "yyyy-MM";
    }
    if (showTimeInput) {
      return "yyyy-MM-dd HH:mm";
    }
    return "yyyy-MM-dd";
  }, [showYearPicker, showMonthYearPicker, showTimeInput]);

  const handleYearRange = useCallback((date: Date): string => {
    const r = parseInt((getYear(date) / 12).toString());
    return `${r * 12 + 1} - ${r * 12 + 12}`;
  }, []);

  const highlightDates = useMemo(() => {
    return Object.entries(groupBy((d) => d.color, marks)).map((d) => ({
      [`react-datepicker__day--highlighted-custom-${d[0]}`]: d[1].map(
        (d) => d.date
      ),
    }));
  }, [marks]);

  useEffect(() => {
    const container = document.querySelectorAll(
      ".react-datepicker-wrapper"
    ) as NodeListOf<HTMLDivElement>;
    if (!container.length) {
      return;
    }
    const fontSize =
      size === "middle" ? "1rem" : size === "large" ? "1.125rem" : "0.875rem";
    container.forEach((item) => {
      item.style.setProperty("--react-date-picker-font-size", fontSize);
    });
  }, [size]);

  return (
    <ReactDatePicker
      closeOnScroll
      shouldCloseOnSelect
      ref={ref}
      disabled={disabled}
      locale={zhCN}
      selected={selected}
      placeholderText={placeholderText}
      onChange={(date: Date) => setDate?.(date)}
      dateFormat={dateFormat}
      maxDate={maxDate}
      selectsStart={selectsStart}
      selectsEnd={selectsEnd}
      startDate={startDate}
      endDate={endDate}
      className={clsx(
        "w-full h-full outline-none border-none cursor-pointer text-lg bg-transparent text-theme-black placeholder-theme-grey",
        [bold ? "font-bold" : "placeholder:font-normal"]
      )}
      nextMonthButtonLabel=">"
      previousMonthButtonLabel="<"
      popperClassName="react-datepicker-left"
      showMonthYearPicker={showMonthYearPicker}
      showYearPicker={showYearPicker}
      showTimeInput={showTimeInput}
      timeInputLabel=""
      customTimeInput={
        <CustomTimeInput
          callback={ref.current}
          maxDate={maxDate}
          onDateChange={(date: Date) => setDate?.(date)}
        />
      }
      highlightDates={highlightDates}
      dayClassName={(date) => {
        const cls =
          "w-6 h-6 flex items-center justify-center text-xs text-[#040F1F] font-bold cursor-pointer rounded-full border-none";
        if (disabled || (maxDate && isAfter(date, maxDate))) {
          return cls;
        }
        return (
          cls +
          " hover:text-white hover:bg-gradient-to-br hover:from-[#6f88ff] hover:to-[#4c4de2]"
        );
      }}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        changeMonth,
        changeYear,
        decreaseYear,
        increaseYear,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
        prevYearButtonDisabled,
        nextYearButtonDisabled,
      }) =>
        showMonthYearPicker || showYearPicker ? (
          <div className="flex items-center justify-between w-full mb-2">
            <ButtonWrap
              onClick={decreaseYear}
              disabled={prevYearButtonDisabled}
              type="button"
              icon={leftArrowCheckedIcon}
            >
              <img src={leftArrowIcon} alt="" />
            </ButtonWrap>
            <div className="flex items-center justify-center w-20 px-2 h-7 whitespace-nowrap">
              {showMonthYearPicker ? getYear(date) : handleYearRange(date)}
            </div>
            <ButtonWrap
              onClick={increaseYear}
              disabled={nextYearButtonDisabled}
              type="button"
              icon={rightArrowCheckedIcon}
            >
              <img src={rightArrowIcon} alt="" />
            </ButtonWrap>
          </div>
        ) : (
          <div
            className={clsx("flex items-center mb-[15px]", [
              showYearSelectPicker ? "justify-start" : "justify-between",
            ])}
          >
            {showYearSelectPicker && (
              <div className="w-[78px] h-7 mr-[10px]">
                {/* TODO: 自定义Select组件 */}
                <SelectV1
                  fullWidth
                  placeholder=""
                  type="date"
                  value={
                    years.find((item) => item === getYear(date)) ??
                    getYear(new Date(date))
                  }
                  options={years}
                  filterOption={(item) => item}
                  onChange={changeYear}
                />
              </div>
            )}
            <div className="w-[78px] h-7">
              {/* TODO: 自定义Select组件 */}
              <SelectV1
                fullWidth
                placeholder=""
                type="date"
                value={months[getMonth(date)]}
                options={months}
                filterOption={(item) => item}
                onChange={(evt) => changeMonth(months.indexOf(evt))}
              />
            </div>
            {!showYearSelectPicker && (
              <div className="flex items-center justify-start">
                <ButtonWrap
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  type="button"
                  icon={leftArrowCheckedIcon}
                >
                  <img src={leftArrowIcon} alt="" />
                </ButtonWrap>
                <ButtonWrap
                  className="ml-[10px]"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  type="button"
                  icon={rightArrowCheckedIcon}
                >
                  <img src={rightArrowIcon} alt="" />
                </ButtonWrap>
              </div>
            )}
          </div>
        )
      }
    />
  );
};

interface CustomTimeInputProps {
  onDateChange: (e: Date) => void;
  callback: ReactDatePicker | null;
  maxDate?: Date;
}

const CustomTimeInput: React.FC<CustomTimeInputProps> = ({
  onDateChange,
  callback,
  maxDate,
}): JSX.Element => {
  const currDate = useMemo<Date>(() => {
    return (
      (callback?.state as { preSelection?: Date })?.preSelection || new Date()
    );
  }, [callback?.state]);

  const [hour, setHour] = useState<number>(() => {
    return getHours(currDate);
  });
  const [minute, setMinute] = useState<number>(() => {
    return getMinutes(currDate);
  });

  const hours = useMemo(() => {
    return [...new Array(24)].map((_, i) => i.toString().padStart(2, "0"));
  }, []);
  const minutes = useMemo(() => {
    return [...new Array(60)].map((_, i) => i.toString().padStart(2, "0"));
  }, []);

  const computedDate = useMemo(() => {
    return setMinutes(setHours(currDate, hour), minute);
  }, [currDate, hour, minute]);

  const disabled = useMemo(() => {
    return maxDate ? isAfter(computedDate, addMinutes(maxDate, 1)) : false;
  }, [computedDate, maxDate]);

  return (
    <React.Fragment>
      <div className="flex items-center justify-start">
        <div className="w-[55px] h-7">
          {/* TODO: 自定义Select组件 */}
          <SelectV1
            fullWidth
            placeholder=""
            type="date"
            value={getHours(currDate).toString().padStart(2, "0")}
            options={hours}
            filterOption={(item) => item}
            onChange={(evt) => setHour(+evt)}
          />
        </div>
        <span className="text-sm text-[#9A9FA5] mx-[6px]">时</span>
        <div className="w-[55px] h-7">
          {/* TODO: 自定义Select组件 */}
          <SelectV1
            fullWidth
            placeholder=""
            type="date"
            value={getMinutes(currDate).toString().padStart(2, "0")}
            options={minutes}
            filterOption={(item) => item}
            onChange={(evt) => setMinute(+evt)}
          />
        </div>
        <span className="text-sm text-[#9A9FA5] ml-[6px]">分</span>
      </div>
      {/* TODO: 自定义按钮 */}
      <button
      className="px-2 py-1 borer border-solid border-[#ff0]"
        disabled={disabled}
        onClick={() => {
          onDateChange(computedDate);
          callback?.setOpen(false);
        }}
      >
        确定
      </button>
    </React.Fragment>
  );
};

const ButtonWrap = styled.button<{ icon: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  outline: none;
  border: 1px solid #dcdeea;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;

  & > img {
    width: 4.85px;
    height: 7.27px;
  }

  &:hover {
    border: ${({ disabled }) => {
      return disabled ? "1px solid #dcdeea" : "none";
    }};
    background: ${({ disabled }) => {
      return disabled
        ? "transparent"
        : "linear-gradient(to right top, #6f88ff, #4c4de2)";
    }};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }
  &:hover > img {
    ${({ disabled, icon }) => {
      if (!disabled) {
        return {
          content: "url(" + icon + ")",
        };
      }
    }}
  }
`;
