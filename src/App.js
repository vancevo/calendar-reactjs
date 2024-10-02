import "./App.css";
import "./index.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useEffect, useRef, useState } from "react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayjs from "dayjs";
import {
  currentWeek,
  endDayWeek,
  startDayWeek,
  CalendarViewOption,
  EnumDateViewOption,
  maxHeightPopupSelection,
  maxWidthPopupSelection,
  initialEvents,
  eventActionText,
  initialHeaderToolbar
} from "./lib/constants";
import { DatePicker, Select, Modal } from "antd";
import { PopoverEvent } from "./components/Popover.component";
import { getRandomColor } from "./lib/utils";

const { RangePicker } = DatePicker;

function App() {
  const [currentEvents, setCurrentEvents] = useState([]);
  const calendarRef = useRef(null);
  const [title, setTitle] = useState(currentWeek);
  const [startDay, setStartDay] = useState(startDayWeek);
  const [endDay, setEndDay] = useState(endDayWeek);
  // popup
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("Nội dung hiển thị");
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  function handleDateSelect(selectInfo) {
    // let calendarApi = selectInfo.view.calendar;
    // const colorRandom = getRandomColor();
    // calendarApi.unselect();
    // if (title) {
    //   calendarApi.addEvent({
    //     id: 1,
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     backgroundColor: colorRandom,
    //     allDay: selectInfo.allDay,
    //   });
    // }
    const { jsEvent } = selectInfo;
    setPopupPosition({
      top: `${jsEvent.clientY - maxHeightPopupSelection}px`, // Sử dụng clientY cho vị trí dọc
      left: `${jsEvent.clientX - maxHeightPopupSelection}px`, // Sử dụng clientX cho vị trí ngang
    });

    setPopupVisible(true); // Hiện popup
  }

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  function handleEventClick(clickInfo) {
    // if (
    //   confirm(
    //     `Are you sure you want to delete the event '${clickInfo.event.title}'`
    //   )
    // ) {
    //   clickInfo.event.remove();
    // }
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  const handleRangeChange = (dates) => {
    if (dates) {
      const calendarApi = calendarRef.current.getApi();
      const [start, end] = dates;
      calendarApi.gotoDate(dayjs(start).toISOString());
    }
  };

  function goNext() {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  }
  function goPrevious() {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
  }
  function goToday() {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
  }
  function goMonth() {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(CalendarViewOption[EnumDateViewOption["month"]]);
  }
  function goDay() {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(CalendarViewOption[EnumDateViewOption["day"]]);
  }
  function goWeek() {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(CalendarViewOption[EnumDateViewOption["week"]]);
  }

  const handleChange = (value) => {
    switch (value) {
      case "week":
        goWeek();
        break;
      case "day":
        goDay();
        break;
      case "month":
        goMonth();
        break;
      default:
        break;
    }
  };

  return (
    <div className="demo-app">
      <div
        className="demo-app-main"
        style={{
          maxWidth: "1120px",
          margin: "40px auto",
        }}
      >
        <div className="flex justify-between">
          <Select
            defaultValue="week"
            style={{ width: 120, height: 40 }}
            onChange={handleChange}
            options={[
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
            ]}
          />
          {/* DATEPICKER */}
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
              defaultValue={[startDay, endDay]}
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
        </div>
        {/* GRID CALENDAR */}
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={initialHeaderToolbar}
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          slotEventOverlap={true}
          nowIndicator={true}
          initialEvents={initialEvents}
          select={(e) => {
            console.log(e);
            return handleDateSelect(e);
          }}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        />
        <PopoverEvent
          visible={popupVisible}
          onClose={handlePopupClose}
          content={popupContent}
          top={popupPosition.top}
          left={popupPosition.left}
        >
          <div>
            {Object.entries(eventActionText).map(([key, value]) => (
              <p
                key={key}
                id={key}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(key);
                  setPopupVisible(false);
                }}
                className="p-2 hover:bg-neutral-300 cursor-pointer"
              >
                {value}
              </p>
            ))}
          </div>
        </PopoverEvent>
      </div>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <div className={`flex gap-2 ${eventInfo.event.backgroundColor}`}>
      <i>{eventInfo.event.title}</i>
      {/* <b>
        {startTime} - {endTime}
      </b> */}
    </div>
  );
}

export default App;
