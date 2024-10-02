import "./App.css";
import "./index.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useEffect, useRef, useState } from "react";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  currentWeek,
  endWeek,
  startWeek,
  CalendarViewOption,
  EnumDateViewOption,
  maxHeightPopupSelection,
  initialEvents,
  eventActionText,
  initialHeaderToolbar,
} from "./lib/constants";
import { PopoverEvent } from "./components/Popover.component";
import { ViewMode } from "./components/ViewMode.component";
import { getRandomColor } from "./lib/utils";
import { RangePickerDate } from "./components/RangePicker.component";


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

function App() {
  const [currentEvents, setCurrentEvents] = useState([]);
  const calendarRef = useRef(null);
  
  const [popupVisible, setPopupVisible] = useState(false);
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

  return (
    <div className="demo-app">
      {/* HEADER */}
      <div className="demo-app-main max-w-[1120px] my-[40px] mx-auto">
        <div className="flex justify-between">
          <ViewMode
            defaultValue={EnumDateViewOption.week}
            calendarRef={calendarRef}
          />
          <RangePickerDate
            calendarRef={calendarRef}
            start={startWeek}
            end={endWeek}
          />
        </div>
        {/* GRID CALENDAR */}
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={initialHeaderToolbar}
          initialView={CalendarViewOption.week}
          initialEvents={initialEvents}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          editable
          selectable
          selectMirror
          dayMaxEvents
          slotEventOverlap
          nowIndicator
        />
        <PopoverEvent
          visible={popupVisible}
          onCancel={handlePopupClose}
          top={popupPosition.top}
          left={popupPosition.left}
          closable={false}
          mask={false}
          footer={null}
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
                className="p-2 hover:bg-neutral-300 border-b-[1px] cursor-pointer"
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


export default App;
