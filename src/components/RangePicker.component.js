import dayjs from "dayjs";
import { DatePicker } from "antd";
import { useState } from "react";
import { defaultViewMode } from "../lib/constants";

const { RangePicker } = DatePicker;

export function RangePickerDate({ calendarRef, start, end, ...props }) {
  const handleRangeChange = (dates) => {
    if (dates) {
      const calendarApi = calendarRef.current.getApi();
      const [start, end] = dates;
      calendarApi.gotoDate(dayjs(start).toISOString());
    }
  };
  const goNext = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  };
  const goPrevious = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
  };
  const goToday = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
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
