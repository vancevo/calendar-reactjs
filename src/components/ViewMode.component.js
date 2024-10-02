import { Select } from "antd";
import {
  CalendarViewOption,
  datedOptions,
} from "../lib/constants";

export function ViewMode({ children, calendarRef, defaultValue, ...props }) {
  const goMonth = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(CalendarViewOption["month"]);
  };
  const goDay = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(CalendarViewOption["day"]);
  };
  const goWeek = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(CalendarViewOption["week"]);
  };

  const handleChange = (type) => {
    switch (type) {
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
    <>
      <Select
        onChange={handleChange}
        options={datedOptions}
        className="w-[120px] h-[40px]"
        defaultValue={defaultValue.toLocaleLowerCase()}
        {...props}
      />
    </>
  );
}
