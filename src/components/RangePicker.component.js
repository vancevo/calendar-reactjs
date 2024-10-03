import dayjs from "dayjs";
import { DatePicker } from "antd";
import { useCalendarContext } from "../CalendarContext";
import { goCalendarAPI } from "../lib/calendarConstant";

const { RangePicker } = DatePicker;

export function RangePickerDate({ start, end, ...props }) {
  const { calendarRef } = useCalendarContext();

  const handleRangeChange = (dates) => {
    if (dates) {
      const [start, end] = dates;
      goCalendarAPI({ calendarRef, startTime: start }).goto();
    }
  };
  const goNext = () => {
    goCalendarAPI({ calendarRef }).next();
  };
  const goPrevious = () => {
    goCalendarAPI({ calendarRef }).prev();
  };
  const goToday = () => {
    goCalendarAPI({ calendarRef }).today();
  };

  return (
    <>
      <div className="flex">
        <div
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-neutral-400 cursor-pointer border-r-[1px]"
          onClick={goPrevious}
        >
          {"<"}
        </div>
        <div
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-neutral-500 cursor-pointer"
          onClick={goToday}
        >
          Today
        </div>

        <RangePicker
          defaultValue={[start, end]}
          format={"DD/MM/YYYY"}
          onChange={handleRangeChange}
          className="rounded-none"
        />
        <div
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-neutral-500 cursor-pointer"
          onClick={goNext}
        >
          {">"}
        </div>
      </div>
    </>
  );
}
