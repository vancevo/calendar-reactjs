import dayjs from "dayjs";

export const goCalendarAPI = ({
  calendarRef,
  startTime = null,
  viewOption = "timeGridWeek",
}) => {
  if (!calendarRef.current) {
    return;
  }
  const calendar = calendarRef?.current.getApi();
  return {
    view: () => calendar.view.type,
    changeView: () => calendar.changeView(viewOption),
    next: () => calendar.next(),
    prev: () => calendar.prev(),
    today: () => calendar.today(),
    goto: () =>
      startTime.length ?? calendar.gotoDate(dayjs(startTime).toISOString()),
  };
};

export const crudCalendarAPI = ({ calendarRef, data }) => {
  if (!calendarRef.current) {
    return;
  }
  const calendar = calendarRef?.current.getApi();
  return {
    add: () => calendar.addEvent(data),
  };
};

export const renderEventContent = (eventInfo) => {
  return (
    <div className="flex gap-2 flex-col h-[97px]">
      <p className="bg-[#91b6db]">{eventInfo.timeText}</p>
      <p>{eventInfo.event.title}</p>
    </div>
  );
};
