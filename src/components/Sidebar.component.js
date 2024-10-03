import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { generatedId, getRandomColor } from "../lib/utils";

export function Sidebar() {
  const [tasks, setTasks] = useState([]);

  const totalTasks = useMemo(() => tasks.length, [tasks]);

  const addTask = () => {
    const title = prompt("Enter task title");
    if (!title) {
      return;
    }
    let newTask = {
      id: generatedId(),
      bgColor: getRandomColor(),
      title,
      time: dayjs().format("ddd MMM D, YYYY"),
    };
    setTasks((prev) => [...prev, newTask]);
  };
  return (
    <>
      <div className="absolute left-[1%] top-[10%] bg-neutral-200 w-[250px] h-[80vh] overflow-y-scroll">
        <div className="flex gap-1 justify-center items-center">
          <p className="text-center text-xl font-bold my-2">
            Task List ({totalTasks})
          </p>
          <div
            className="btn bg-yellow-300 w-10 h-8 flex items-center justify-center rounded-lg border-[1px] border-neutral-500 cursor-pointer hover:opacity-70"
            onClick={addTask}
          >
            +
          </div>
        </div>
        <div className="flex flex-col gap-2" id="external-events">
          {tasks?.map(({ id, title, time, bgColor }) => (
            <div
              key={id}
              className={`w-[200px] min-h-20 border-l-500 border-l-[4px] border-neutral-500 ml-2 shadow p-2  event-items`}
              style={{
                backgroundColor: bgColor,
              }}
              draggable
            >
              <p className="font-bold">{time}</p>
              <p className="event-items">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
