import React, { createContext, useContext, useRef } from "react";

const CalendarContext = createContext();

export function CalendarProvider({ children }) {
  const calendarRef = useRef(null);
  const dateRef = useRef({});
  const isDraggableInitialized = useRef(false);

  return (
    <CalendarContext.Provider
      value={{ calendarRef, dateRef, isDraggableInitialized }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarContext() {
  return useContext(CalendarContext);
}
