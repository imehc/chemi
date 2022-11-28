import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 日期 from './assets/日期.svg';
import { useStatic } from '~/hooks';
import { DatePick } from './DatePick';

export type DateRange = {
  startDate: Date;
  endDate?: Date;
};

interface DatePickerProps {
  defaultValue?: DateRange | Date;
  allowClear?: boolean;
  range?: boolean;
  onChange?: (date: DateRange | Date) => void;
  allResults?: boolean;
  placeholderText?: string;
  maxDate?: Date;
  disabled?: boolean;
  type?: 'year' | 'month' | 'day' | 'minute';
}

export const DatePicker: React.FC<DatePickerProps> = ({
  defaultValue,
  allowClear = true, // 是否允许清除
  range = false, // 是否是区间选择
  onChange,
  allResults = false, // 是否允许选择起始日期和结束日期后才会返回，需range为true
  placeholderText = '请选择日期',
  maxDate,
  disabled = false,
  type = 'day',
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
        defaultValue instanceof Date ? undefined : defaultValue?.endDate
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
      changeRef.current(startDate);
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
    () => [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
    []
  );
  return (
    <div className="flex justify-center items-center w-full h-8 bg-[#F4F6FB] border border-solid border-[#ecedf0] shadow-sm rounded-lg pr-5 relative">
      <img src={日期} alt="" className="h-4 ml-3" />
      <DatePick
        disabled={disabled}
        months={months}
        selected={startDate}
        selectsStart
        selectsEnd={false}
        startDate={startDate}
        endDate={endDate}
        setDate={handleStartDate}
        maxDate={maxDate}
        placeholderText={!range ? placeholderText : '起始日期'}
        showTimeInput={type === 'minute'}
        showMonthYearPicker={type === 'month'}
        showYearPicker={type === 'year'}
      />
      {range && (
        <React.Fragment>
          <div className="text-sm text-[#040F1F] font-bold">至</div>
          <img src={日期} alt="" className="h-4 ml-3" />
          <DatePick
            disabled={!allResults ? (startDate ? disabled : true) : undefined}
            months={months}
            selected={endDate}
            selectsStart={false}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            setDate={handleEndDate}
            maxDate={maxDate}
            placeholderText={'结束日期'}
            showTimeInput={type === 'minute'}
          />
        </React.Fragment>
      )}
      {allowClear && (startDate || endDate) && !disabled && (
        <div
          className="absolute right-1 top-[50%] translate-y-[-50%] w-5 h-5 rounded-[50%] border-[1px] border-solid border-gray-10 after:content-[''] after:absolute after:w-3 after:h-[2px] after:rounded after:bg-gray-200  after:top-[50%] after:left-[50%] after:rotate-45 after:translate-x-[-50%] after:translate-y-[-50%] before:content-[''] before:absolute before:w-3 before:h-[2px] before:rounded before:bg-gray-200 before:top-[50%] before:left-[50%] before:rotate-[-45deg] before:translate-x-[-50%] before:translate-y-[-50%] cursor-pointer hover:bg-gray-100"
          onClick={() => handleResetDate()}
        ></div>
      )}
    </div>
  );
};
