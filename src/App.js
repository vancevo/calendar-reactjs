import "./App.css";
import "./index.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import React, { useEffect, useState, useCallback } from "react";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  endWeek,
  startWeek,
  CalendarViewOption,
  EnumDateViewOption,
  maxHeightPopupSelection,
  initialEvents,
  EventActionText,
  initialHeaderToolbar,
} from "./lib/constants";
import { PopoverEvent } from "./components/Popover.component";
import { ViewMode } from "./components/ViewMode.component";
import { getRandomColor, generatedId } from "./lib/utils";
import { RangePickerDate } from "./components/RangePicker.component";
import { Sidebar } from "./components/Sidebar.component";
import { useCalendarContext } from "./CalendarContext";
import {
  goCalendarAPI,
  crudCalendarAPI,
  renderEventContent,
} from "./lib/calendarConstant";

function App() {
  const { calendarRef, dateRef, isDraggableInitialized } = useCalendarContext();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleDateSelect = useCallback(
    (selectInfo) => {
      const views = Object.values(CalendarViewOption).filter(
        (view) => view !== CalendarViewOption["month"]
      );
      const currentView = goCalendarAPI({ calendarRef }).view();

      if (!views.includes(currentView)) {
        return;
      }

      dateRef.current.start = selectInfo.startStr;
      dateRef.current.end = selectInfo.endStr;
      const { jsEvent } = selectInfo;
      setPopupPosition({
        top: `${jsEvent.clientY - maxHeightPopupSelection}px`,
        left: `${jsEvent.clientX - maxHeightPopupSelection}px`,
      });
      setPopupVisible(true);
    },
    [calendarRef, dateRef]
  );

  const generatedEvent = useCallback(() => {
    const title = prompt("Enter task title");
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
      crudCalendarAPI({ calendarRef, data: newEvent }).add();
    }
  }, []);

  const handleEventPopover = useCallback(
    (type) => {
      switch (type) {
        case "addTimeoff":
          generatedEvent();
          break;
        default:
          console.log(type);
          break;
      }
    },
    [generatedEvent]
  );

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  const handleEventClick = useCallback((clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }, []);

  useEffect(() => {
    const containerEl = document.querySelector("#external-events");
    if (!isDraggableInitialized.current && containerEl) {
      new Draggable(containerEl, {
        itemSelector: ".event-items",
        eventData: (ev) => {
          return {
            backgroundColor: ev.getAttribute("data-color"),
            title: ev.innerText,
          };
        },
      });
    }
    // Mark as initialized
    isDraggableInitialized.current = true;

    return () => {
      if (isDraggableInitialized.current) {
        isDraggableInitialized.current = null;
      }
    };
  }, []);

  return (
    <div className="demo-app grid grid-cols-[1400px,1fr] shadow">
      <div className="demo-app-main my-[40px] ml-4">
        {/* HEADER */}
        <div className="flex justify-between">
          <ViewMode defaultValue={EnumDateViewOption.week} />
          <RangePickerDate start={startWeek} end={endWeek} />
        </div>
        {/* GRID CALENDAR */}
        <div className="shadow rounded-lg bg-white mt-3">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={initialHeaderToolbar}
            initialView={CalendarViewOption.week}
            initialEvents={initialEvents}
            select={handleDateSelect}
            eventClick={handleEventClick}
            allDaySlot={false}
            eventContent={renderEventContent}
            drop={(info) =>
              info.draggedEl.parentNode?.removeChild(info.draggedEl)
            }
            className="max-w-[1600px]"
            editable
            selectable
            dayMaxEvents
            slotEventOverlap
            nowIndicator
            droppable
          />
        </div>
      </div>
      <Sidebar />
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
          {Object.entries(EventActionText).map(([key, value]) => (
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
