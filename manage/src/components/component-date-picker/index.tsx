import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 日期 from './assets/日期.svg';
import { useStatic } from '~/hooks';
import { DatePick } from './DatePick';

type Range = {
  startDate: Date;
  endDate?: Date;
};

interface DatePickerProps {
  allowClear?: boolean;
  range?: boolean;
  onChange?: (date: Range | Date) => void;
  allResults?: boolean;
  placeholderText?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  allowClear = true, // 是否允许清除
  range = false, // 是否是区间选择
  onChange,
  allResults = false, // 是否允许选择起始日期和结束日期后才会返回，需range为true
  placeholderText = '请选择日期',
}) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleStartDate = useCallback((date: Date) => setStartDate(date), []);
  const handleEndDate = useCallback((date: Date) => setEndDate(date), []);

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
    <div className="flex justify-center items-center w-full bg-[#F4F6FB] border border-solid border-[#e6e6e6] shadow-sm rounded-lg pr-5 relative">
      <img src={日期} alt="" className="h-4 ml-3" />
      <DatePick
        months={months}
        selected={startDate}
        selectsStart
        selectsEnd={false}
        startDate={startDate}
        endDate={endDate}
        setDate={handleStartDate}
        maxDate={new Date()}
        placeholderText={!range ? placeholderText : '起始日期'}
      />
      {range && (
        <React.Fragment>
          <div className="text-sm text-[#040F1F] font-bold">至</div>
          <img src={日期} alt="" className="h-4 ml-3" />
          <DatePick
            months={months}
            selected={endDate}
            selectsStart={false}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            setDate={handleEndDate}
            maxDate={new Date()}
            placeholderText={'结束日期'}
          />
        </React.Fragment>
      )}
      {allowClear && (startDate || endDate) && (
        <div
          className="absolute right-1 top-[50%] translate-y-[-50%] w-5 h-5 rounded-[50%] border-[1px] border-solid border-gray-10 after:content-[''] after:absolute after:w-3 after:h-[2px] after:rounded after:bg-gray-200  after:top-[50%] after:left-[50%] after:rotate-45 after:translate-x-[-50%] after:translate-y-[-50%] before:content-[''] before:absolute before:w-3 before:h-[2px] before:rounded before:bg-gray-200 before:top-[50%] before:left-[50%] before:rotate-[-45deg] before:translate-x-[-50%] before:translate-y-[-50%] cursor-pointer hover:bg-gray-100"
          onClick={() => {
            setStartDate(undefined);
            setEndDate(undefined);
          }}
        ></div>
      )}
    </div>
  );
};
