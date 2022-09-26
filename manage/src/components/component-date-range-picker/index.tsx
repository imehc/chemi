import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { forwardRef, ReactElement, useEffect, useState } from 'react';
import { format, getMonth, getYear } from 'date-fns';
import clsx from 'clsx';
import zhCN from 'date-fns/locale/zh-CN';
import 日期 from './assets/日期.svg';

interface FunctionComponent<P = {}> extends React.FunctionComponent<P> {
  (props: ReactDatePickerProps, context?: P): ReactElement<P> | null;
}
// 解决DatePicker可能出现不能用作JSX组件的问题
// https://github.com/facebook/react/issues/24304#issue-1196695161
const RangePicker = DatePicker as unknown as FunctionComponent;

type DateScope = {
  start: Date;
  end: Date;
};
interface DatePickerProps {
  allowClear?: boolean;
  onChange?: (date: DateScope) => void;
}

/**
 * @deprecated use DatePicker instead 
 */
export const DateRangePicker: React.FC<DatePickerProps> = ({
  allowClear = true,
  onChange,
}) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const months = [
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
  ];
  const years = [...Array(2050 - 1970).keys()].map(
    (i) => getYear(new Date(1970)) + i
  );

  useEffect(() => {
    if (!startDate || !endDate) return;
    if (startDate > endDate) setStartDate(endDate);
  }, [endDate]);

  useEffect(() => {
    if (!startDate || !endDate) return;
    if (startDate > endDate) setEndDate(startDate);
  }, [startDate]);

  useEffect(() => {
    if (!startDate || !endDate) return;
    if (onChange) {
      onChange({ start: startDate, end: endDate });
    }
  }, [startDate, endDate]);

  return (
    <div className="w-[21rem] flex items-center justify-eventy bg-[#F4F6FB] h-8 rounded-lg border-[1px] border-solid border-gray-100 relative">
      <div className="ml-5 relative flex justify-center items-center">
        <img src={日期} alt="" className="h-4 mx-1" />
        <DatePicker
          locale={zhCN}
          selected={startDate}
          onChange={(date) => date && setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          nextMonthButtonLabel=">"
          previousMonthButtonLabel="<"
          popperClassName="react-datepicker-left"
          customInput={<ButtonInput type="start" />}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            changeYear,
            changeMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex items-center justify-between px-2 py-2">
              <div className="border-[1px] border-solid border-gray-300 rounded-lg px-2 h-7 flex justify-center items-center">
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) =>
                      changeYear(Number(value))
                    }
                    style={{ height: '40px' }}
                    className="outline-none bg-transparent border-none w-full text-[#040F1F] text-sm"
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  </div>
              <div className="w-20 h-7 border-[1px] border-solid border-gray-300 rounded-lg px-2 flex justify-center items-center">
                <select
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                  className="outline-none bg-transparent border-none w-full text-[#040F1F] text-sm"
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-x-2 flex justify-start items-center">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  type="button"
                  className={clsx(
                    'w-7 h-7 inline-flex p-1 text-sm font-medium text-[#9A9FA5] border border-gray-300 rounded-[50%] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-offset-0 focus:ring-0 relative hover:bg-gradient-to-r hover:from-[#6FCDFF] hover:to-[#2AB0F8] hover:text-white hover:border-none',
                    {
                      'cursor-not-allowed opacity-50': prevMonthButtonDisabled,
                    }
                  )}
                >
                  <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    &lt;
                  </span>
                </button>
                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  type="button"
                  className={clsx(
                    'w-7 h-7 inline-flex p-1 text-sm font-medium text-[#9A9FA5] border border-gray-300 rounded-[50%] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-offset-0 focus:ring-0 relative hover:bg-gradient-to-r hover:from-[#6FCDFF] hover:to-[#2AB0F8] hover:text-white hover:border-none',
                    {
                      'cursor-not-allowed opacity-50': nextMonthButtonDisabled,
                    }
                  )}
                >
                  <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    &gt;
                  </span>
                </button>
              </div>
            </div>
          )}
        />
      </div>
      <div className="text-sm text-[#040F1F] font-bold">至</div>
      <div className="relative flex justify-center items-center ml-3">
        <img src={日期} alt="" className="h-4 mx-1" />
        <DatePicker
          locale={zhCN}
          selected={endDate}
          onChange={(date) => date && setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          nextMonthButtonLabel=">"
          previousMonthButtonLabel="<"
          popperClassName="react-datepicker-right"
          customInput={<ButtonInput type="end" />}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            changeMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex items-center justify-between px-2 py-2">
              <div className="w-20 h-7 border-[1px] border-solid border-gray-300 rounded-lg px-2 flex justify-center items-center">
                <select
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                  className="outline-none bg-transparent border-none w-full text-[#040F1F] text-sm"
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-x-2">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  type="button"
                  className={clsx(
                    'w-7 h-7 inline-flex p-1 text-sm font-medium text-[#9A9FA5] border border-gray-300 rounded-[50%] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-offset-0 focus:ring-0 relative hover:bg-gradient-to-r hover:from-[#6FCDFF] hover:to-[#2AB0F8] hover:text-white hover:border-none',
                    {
                      'cursor-not-allowed opacity-50': prevMonthButtonDisabled,
                    }
                  )}
                >
                  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-bold">
                    &lt;
                  </div>
                </button>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  type="button"
                  className={clsx(
                    'w-7 h-7 inline-flex p-1 text-sm font-medium text-[#9A9FA5] border border-gray-300 rounded-[50%] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-offset-0 focus:ring-0 relative hover:bg-gradient-to-r hover:from-[#6FCDFF] hover:to-[#2AB0F8] hover:text-white hover:border-none',
                    {
                      'cursor-not-allowed opacity-50': nextMonthButtonDisabled,
                    }
                  )}
                >
                  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-bold">
                    &gt;
                  </div>
                </button>
              </div>
            </div>
          )}
        />
      </div>
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

const ButtonInput = forwardRef(({ value, onClick, type }: any, ref) => (
  <button
    onClick={onClick}
    ref={ref as any}
    type="button"
    className="w-28 flex justify-start items-center text-sm font-medium text-gray-700 focus:outline-none focus:ring-offset-0 focus:ring-0"
  >
    {value ? (
      format(new Date(value), 'yyyy-MM-dd')
    ) : (
      <span className="text-[12px] text-[#B7B6BB]">
        {type === 'start'
          ? '指定查询起始时间'
          : type === 'end'
          ? '指定查询结束时间'
          : ''}
      </span>
    )}
  </button>
));
