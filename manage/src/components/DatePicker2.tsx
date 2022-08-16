import DatePicker from 'react-datepicker';
import { forwardRef, useEffect, useState } from 'react';
import { addMonths, format, getMonth, getYear } from 'date-fns';
import clsx from 'clsx';
import zhCN from 'date-fns/locale/zh-CN';

export const DatePicker2 = () => {
  // const [startDate, setStartDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date>();
  // getUnixTime() 返回的是时间戳，单位是毫秒
  // const [endDate, setEndDate] = useState(addMonths(startDate, 1));
  const [endDate, setEndDate] = useState<Date>();
  const years = [...Array(2050 - 1970).keys()].map(
    (i) => getYear(new Date(1970)) + i
  );
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

  useEffect(() => {
    if (!startDate || !endDate) return;
    if (startDate > endDate) setStartDate(endDate);
  }, [endDate]);

  useEffect(() => {
    if (!startDate || !endDate) return;
    if (startDate > endDate) setEndDate(startDate);
  }, [startDate]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center max-w-2xl py-20 mx-auto space-x-4">
        <span className="font-medium text-gray-900">Custom Components:</span>
        <div className="relative w-40">
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
                {/* <div className="border-[1px] border-solid border-gray-300 rounded-lg px-2 h-7 flex justify-center items-center">
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
                  </div> */}
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
                      'w-7 h-7 inline-flex p-1 text-sm font-medium text-[#9A9FA5] border border-gray-300 rounded-[50%] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-offset-0 focus:ring-0 relative hover:bg-gradient-to-r hover:from-[#6f88ff] hover:to-[#4c4de2] hover:text-white hover:border-none',
                      {
                        'cursor-not-allowed opacity-50':
                          prevMonthButtonDisabled,
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
                      'w-7 h-7 inline-flex p-1 text-sm font-medium text-[#9A9FA5] border border-gray-300 rounded-[50%] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-offset-0 focus:ring-0 relative hover:bg-gradient-to-r hover:from-[#6f88ff] hover:to-[#4c4de2] hover:text-white hover:border-none',
                      {
                        'cursor-not-allowed opacity-50':
                          nextMonthButtonDisabled,
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
        <div className="relative w-40">
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
                      'w-7 h-7 inline-flex p-1 text-sm font-medium text-[#9A9FA5] border border-gray-300 rounded-[50%] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-offset-0 focus:ring-0 relative hover:bg-gradient-to-r hover:from-[#6f88ff] hover:to-[#4c4de2] hover:text-white hover:border-none',
                      {
                        'cursor-not-allowed opacity-50':
                          prevMonthButtonDisabled,
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
                      'w-7 h-7 inline-flex p-1 text-sm font-medium text-[#9A9FA5] border border-gray-300 rounded-[50%] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-offset-0 focus:ring-0 relative hover:bg-gradient-to-r hover:from-[#6f88ff] hover:to-[#4c4de2] hover:text-white hover:border-none',
                      {
                        'cursor-not-allowed opacity-50':
                          nextMonthButtonDisabled,
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
      </div>
      {/* <div className="flex items-center justify-center max-w-2xl py-20 mx-auto space-x-4">
        <span className="font-medium text-gray-900">Default Components:</span>
        <div className="relative w-40 h-8 rounded-lg">
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
          />
        </div>
        <div className="relative w-40">
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
          />
        </div>
      </div> */}
    </div>
  );
};

const ButtonInput = forwardRef(({ value, onClick, type }: any, ref) => (
  <button
    onClick={onClick}
    ref={ref as any}
    type="button"
    className="h-8 rounded-lg w-full flex justify-center items-center text-sm font-medium text-gray-700 bg-[#f4f6fc] border border-gray-100 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-offset-0 focus:ring-0"
  >
    {value ? (
      format(new Date(value), 'yyyy-MM-dd')
    ) : (
      <span className="text-sm text-[#B7B6BB]">
        {type === 'start' ? '开始日期' : type === 'end' ? '结束日期' : ''}
      </span>
    )}
  </button>
));
