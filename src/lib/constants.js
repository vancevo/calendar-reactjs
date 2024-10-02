import dayjs from "dayjs";

export const currentWeek = `${dayjs()
  .startOf("week")
  .format("MMM D")} - ${dayjs().endOf("week").format("MMM D, YYYY")}`;
export const startDayWeek = dayjs().startOf("week");
export const endDayWeek = dayjs().endOf("week");


export const DateViewOption = {
  day: "Day",
  week: "Week",
  month: "Month"
}

export const CalendarViewOption = {
  [DateViewOption['day']]: 'timeGridDay',
  [DateViewOption['week']]: 'timeGridWeek',
  [DateViewOption['month']]: 'dayGridMonth',
}