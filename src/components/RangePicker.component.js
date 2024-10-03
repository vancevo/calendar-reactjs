import dayjs from "dayjs";
import { DatePicker } from "antd";
import { useCalendarContext } from "../CalendarContext";
import { goCalendarAPI } from "../lib/calendarConstant";
import {  useState, useCallback } from "react";

const { RangePicker } = DatePicker;

export function RangePickerDate({ start, end, ...props }) {
  const { calendarRef } = useCalendarContext();
  const [rangedTime, setRangedTime] = useState([start, end]);
  const [isOpen, setIsOpen] = useState(false);

  const generatedEndDateByView = useCallback(({ start, view }) => {
    //timeGridWeek || timeGridDay || dayGridMonth
    let newStart, newEnd;
    switch (view) {
      case "timeGridDay":
        [newStart, newEnd] = [start, start];
        break;
      case "timeGridWeek":
        newStart = dayjs(start).startOf("week");
        newEnd = dayjs(start).endOf("week");
        break;
      case "dayGridMonth":
        newStart = dayjs(start).startOf("month");
        newEnd = dayjs(start).endOf("month");
        break;
      default:
        break;
    }
    return [newStart, newEnd];
  }, []);

  const handleRangeChange = useCallback(
    (dates) => {
      if (dates && dates[0]) {
        const [start] = dates;
        const view = goCalendarAPI({ calendarRef }).view();
        const [newStart, newEnd] = generatedEndDateByView({ start, view });
        setRangedTime([newStart, newEnd]);
        goCalendarAPI({ calendarRef, startTime: newStart }).goto();
        setIsOpen(false);
      }
    },
    [generatedEndDateByView, calendarRef]
  );

  const goNext = useCallback(() => {
    goCalendarAPI({ calendarRef }).next();
  }, []);
  const goPrevious = useCallback(() => {
    goCalendarAPI({ calendarRef }).prev();
  }, []);
  const goToday = useCallback(() => {
    goCalendarAPI({ calendarRef }).today();
  }, []);

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
          format={"DD/MM/YYYY"}
          className="rounded-none"
          defaultValue={[start, end]}
          value={rangedTime}
          open={isOpen}
          onCalendarChange={handleRangeChange}
          onClick={() => setIsOpen(true)}
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
