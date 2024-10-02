import dayjs from "dayjs";

export const defaultViewMode = "week";
export const currentWeek = `${dayjs()
  .startOf("week")
  .format("MMM D")} - ${dayjs().endOf("week").format("MMM D, YYYY")}`;
export const startWeek = dayjs().startOf("week");
export const endWeek = dayjs().endOf("week");

export const initialEvents = [
  {
    id: "event 1",
    title: "event 1",
    start: "2024-10-01T10:00:00",
    end: "2024-10-01T12:00:00",
  },
  {
    id: "event 2",
    title: "event 2",
    start: "2024-10-02T14:00:00",
    end: "2024-10-02T15:30:00",
  },
];
export const initialHeaderToolbar = {
  start: "",
  center: "",
  end: "",
};
export const EnumDateViewOption = {
  day: "Day",
  week: "Week",
  month: "Month",
};
export const datedOptions = Object.entries(EnumDateViewOption).map(
  // {value: 'day', label: 'Day'}
  ([key, value]) => ({ value: key, label: value })
);
export const CalendarViewOption = {
  day: "timeGridDay",
  week: "timeGridWeek",
  month: "dayGridMonth",
};
export const eventActionText = {
  addCustom: "Add Custom Event",
  addTimeoff: "Add Time Off",
  newjob: "New Job",
};
export const maxWidthPopupSelection = 200;
export const maxHeightPopupSelection =
  110 + 20 * Object.keys(eventActionText).length; // 20 is height for each items
