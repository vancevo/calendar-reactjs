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
import { getRandomColor, generatedId } from "./lib/utils";
import { RangePickerDate } from "./components/RangePicker.component";
import { Sidebar } from "./components/Sidebar.component";

function renderEventContent(eventInfo) {
  return (
    <div className={`flex gap-2 ${eventInfo.event.backgroundColor}`}>
      <i>{eventInfo.event.title}</i>
    </div>
  );
}

function App() {
  const calendarRef = useRef(null);
  const dateRef = useRef({});
  const [events, setEvents] = useState(initialEvents);
  const [currentEvents, setCurrentEvents] = useState([]);

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleDateSelect = (selectInfo) => {
    dateRef.current.start = selectInfo.startStr;
    dateRef.current.end = selectInfo.endStr;
    const { jsEvent } = selectInfo;

    setPopupPosition({
      top: `${jsEvent.clientY - maxHeightPopupSelection}px`,
      left: `${jsEvent.clientX - maxHeightPopupSelection}px`,
    });
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  const generatedEvent = () => {
    const title = prompt("Enter task title");
    const calendarApi = calendarRef.current.getApi();
    const startTime = dateRef.current.start;
    const endTime = dateRef.current.end;
    if (title && startTime && endTime) {
      const newEvent = {
        id: generatedId(),
        title,
        start: startTime,
        end: endTime,
        bgColor: getRandomColor(),
        allDay: false,
      };
      calendarApi.addEvent(newEvent);
      setEvents([...events, newEvent]);
    }
  };
  const handleEventPopover = (type) => {
    switch (type) {
      case "addTimeoff":
        generatedEvent();
        break;
      default:
        console.log(type);
        break;
    }
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
      <div className="demo-app-main max-w-[1120px] my-[40px] mx-[20%]">
        {/* HEADER */}
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
          initialEvents={events}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          editable
          selectable
          dayMaxEvents
          slotEventOverlap
          nowIndicator
          droppable
        />
      </div>
      <Sidebar events={events} />
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
                handleEventPopover(key);
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
  );
}

export default App;
