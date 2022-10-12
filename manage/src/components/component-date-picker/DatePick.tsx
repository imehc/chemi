import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import zhCN from 'date-fns/locale/zh-CN';
import clsx from 'clsx';
import { format, getMonth } from 'date-fns';
import './index.css';

// docs https://reactdatepicker.com/#example-year-select-dropdown

interface FunctionComponent<P = {}> extends React.FunctionComponent<P> {
  (props: ReactDatePickerProps, context?: P): React.ReactElement<P> | null;
}
// 解决DatePicker可能出现不能用作JSX组件的问题
// https://github.com/facebook/react/issues/24304#issue-1196695161
const DateSelector = DatePicker as unknown as FunctionComponent;

interface DatePickerProps {
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
}

export const DatePick: React.FC<DatePickerProps> = ({
  months,
  selectsStart,
  selectsEnd,
  setDate,
  placeholderText = '请选择日期',
  selected,
  startDate,
  endDate,
  maxDate,
  disabled = false,
  showTimeInput = false,
}) => {
  return (
    <DateSelector
      disabled={disabled}
      locale={zhCN}
      selected={selected}
      placeholderText={placeholderText}
      onChange={(date: Date) => setDate && setDate(date)}
      dateFormat={showTimeInput ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'}
      maxDate={maxDate}
      selectsStart={selectsStart}
      selectsEnd={selectsEnd}
      startDate={startDate}
      endDate={endDate}
      nextMonthButtonLabel=">"
      previousMonthButtonLabel="<"
      popperClassName="react-datepicker-left"
      // showTimeSelect
      // timeFormat="HH:mm:ss"
      // timeIntervals={60}
      // timeCaption="时间："

      showTimeInput={showTimeInput}
      timeInputLabel="时间："
      customTimeInput={<CustomTimeInput />}
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
              className="outline-none bg-transparent border-none w-full text-[#040F1F] text-sm cursor-pointer"
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
                'w-7 h-7 inline-flex p-1 text-sm font-medium text-[#9A9FA5] border border-gray-300 rounded-[50%] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-offset-0 focus:ring-0 relative hover:bg-gradient-to-r hover:from-[#6FCDFF] hover:to-[#2AB0F8] hover:text-white hover:border-none after:absolute after:rotate-[-45deg] after:left-[8px] after:top-[35%] after:w-[10px] after:h-[2px] after:rounded-[4px] after:bg-[#c7cbd1] after:hover:bg-white before:absolute before:rotate-45 before:left-[8px] before:top-[58%] before:w-[10px] before:h-[2px] before:rounded-[4px] before:bg-[#c7cbd1] before:hover:bg-white',
                {
                  'cursor-not-allowed opacity-50': prevMonthButtonDisabled,
                }
              )}
            />
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              type="button"
              className={clsx(
                'w-7 h-7 inline-flex p-1 text-sm font-medium text-[#9A9FA5] border border-gray-300 rounded-[50%] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-offset-0 focus:ring-0 relative hover:bg-gradient-to-r hover:from-[#6FCDFF] hover:to-[#2AB0F8] hover:text-white hover:border-none after:absolute after:rotate-[45deg] after:left-[9px] after:top-[35%] after:w-[10px] after:h-[2px] after:rounded-[4px] after:bg-[#c7cbd1] after:hover:bg-white before:absolute before:rotate-[-45deg] before:left-[9px] before:top-[58%] before:w-[10px] before:h-[2px] before:rounded-[4px] before:bg-[#c7cbd1] before:hover:bg-white',
                {
                  'cursor-not-allowed opacity-50': nextMonthButtonDisabled,
                }
              )}
            />
          </div>
        </div>
      )}
    />
  );
};

interface CustomTimeInputProps {
  date: Date;
  value: string;
  onChange: (e: string) => void;
}

const CustomTimeInput: React.FC = ({ ...props }): JSX.Element => {
  const { date, value, onChange } = props as CustomTimeInputProps;
  return (
    <input
      type="time"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      }}
      // step="1"
    />
  );
};
