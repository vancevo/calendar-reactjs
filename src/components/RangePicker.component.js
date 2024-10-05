import dayjs from "dayjs";
import { DatePicker } from "antd";
import { useCalendarContext } from "../CalendarContext";
import { goCalendarAPI, renderTitleDatePicker } from "../lib/calendarConstant";
import { useState, useCallback, useEffect } from "react";

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
        renderTitleDatePicker({ calendarRef });
        setIsOpen(false);
      }
    },
    [generatedEndDateByView, calendarRef]
  );

  const handleNavigation = useCallback(
    ({ direction }) => {
      const actions = {
        next: goCalendarAPI({ calendarRef }).next,
        prev: goCalendarAPI({ calendarRef }).prev,
        today: goCalendarAPI({ calendarRef }).today,
      };
      actions[direction]();
      renderTitleDatePicker({ calendarRef });
      if (isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    renderTitleDatePicker({ calendarRef });
  }, []);

  return (
    <>
      <div className="flex shadow bg-white rounded-lg">
        <div
          className="bg-white rounded-l-md text-[#555B64] py-4 border-[#ddd] w-[32px] h-[31px] flex items-center justify-center font-bold hover:bg-[rgba(0, 0, 0, 0.03)] cursor-pointer border-r-[1px]"
          onClick={() => handleNavigation({ direction: "prev" })}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5 5.5L8 12L14.5 18.5"
              stroke="#4D5054"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
        <div className="bg-white text-[#555B64] py-4 border-[#ddd] w-[32px] h-[31px] flex items-center justify-center font-bold hover:opacity-70 cursor-pointer border-r-[1px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 5.5L5 12L11.5 18.5"
              stroke="#4D5054"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M17.5 5.5L11 12L17.5 18.5"
              stroke="#4D5054"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
        <div
          className="bg-white text-[#555B64] px-[3px] h-[31px] w-[46px] cursor-pointer text-[13px] flex justify-center items-center border-r-[1px]"
          onClick={() => handleNavigation({ direction: "today" })}
        >
          Today
        </div>
        <RangePicker
          format={"DD/MM/YYYY"}
          className="bg-white text-[#555B64] flex items-center justify-center rounded-none w-[150px] h-[31px] py-[0px] px-1 border-[0px]"
          defaultValue={[start, end]}
          value={rangedTime}
          open={isOpen}
          onCalendarChange={handleRangeChange}
          onClick={() => setIsOpen(true)}
          onOpenChange={() => setIsOpen((prev) => !prev)}
        />
        <div className="bg-white text-[#555B64] py-4 border-[#ddd] w-[32px] h-[31px] flex items-center justify-center font-bold hover:opacity-70 cursor-pointer border-l-[1px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 5.5L19 12L12.5 18.5"
              stroke="#4D5054"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M6.5 5.5L13 12L6.5 18.5"
              stroke="#4D5054"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
        <div
          className="bg-white rounded-r-md text-[#555B64] py-4 border-[#ddd] w-[32px] h-[31px] flex items-center justify-center font-bold hover:opacity-70 cursor-pointer border-l-[1px]"
          onClick={() => handleNavigation({ direction: "next" })}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 5.5L16 12L9.5 18.5"
              stroke="#4D5054"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
}
