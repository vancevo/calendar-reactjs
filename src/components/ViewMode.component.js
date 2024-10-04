import { Select } from "antd";
import { CalendarViewOption, DatedOptions } from "../lib/constants";
import { useCalendarContext } from "../CalendarContext";
import { goCalendarAPI, renderTitleDatePicker } from "../lib/calendarConstant";

export function ViewMode({ children, defaultValue, ...props }) {
  const { calendarRef } = useCalendarContext();
  const views = Object.keys(CalendarViewOption);

  const handleChange = (type) => {
    if (!views.includes(type)) {
      return;
    }
    goCalendarAPI({
      calendarRef,
      viewOption: CalendarViewOption[type],
    }).changeView();
    renderTitleDatePicker({ calendarRef });
  };

  return (
    <>
      <Select
        onChange={handleChange}
        options={DatedOptions}
        className="w-[120px] h-[40px]"
        defaultValue={defaultValue.toLocaleLowerCase()}
        {...props}
      />
    </>
  );
}
