import React, { useState } from 'react';
import 'react-day-picker/dist/style.css';
import { addDays, addMonths, format, isSameMonth } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import zhCN from 'date-fns/locale/zh-CN';

export const DatePicker1 = () => {
  // https://react-day-picker.js.org/basics/modifiers
  const pastMonth = new Date(2020, 10, 15);
  const [selected, setSelected] = useState<Date>();
  const today = new Date();
  const nextMonth = addMonths(new Date(), 1);
  const [month, setMonth] = useState<Date>(nextMonth);

  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  const footer = (
    <button
      type="button"
      disabled={isSameMonth(today, month)}
      onClick={() => setMonth(today)}
    >
      Go to Today
    </button>
  );

  return (
    <DayPicker
      // 本地化
      locale={zhCN}
      // 选择日期范围 single[单选] multiple[多选] range[范围]
      mode="range"
      // 最小选择个数 mode="range"时有效
      // min={2}
      // 最大选择个数 mode="range"时有效
      // max={5}
      defaultMonth={pastMonth}
      selected={range}
      onSelect={setRange}
      footer={footer}
      // month={month}
      // onMonthChange={setMonth}
      // 限制年份开始范围
      // fromYear={2020}
      // 限制年份结束范围
      // toYear={2023}
      // 限制月份开始范围
      // fromMonth={new Date(2020, 1)}
      // 限制月份结束范围
      // toMonth={new Date(2020, 11)}
      // 限制日期开始范围,不能与fromYear同时使用
      // fromDate={new Date(2022, 8, 5)}
      // 限制日期结束范围，不能与toYear同时使用
      // toDate={new Date(2022, 8, 15)}
      // 使用下拉列表更改范围
      // captionLayout="dropdown"
      // 禁用导航
      // disableNavigation
      // 呈现多个日历
      // numberOfMonths={2}
      // 显示当前月份的天数
      // showOutsideDays
      // 显示周数
      // showWeekNumber
    />
  );
};
