import { useEffect } from "react";

export function Sidebar({ events }) {
  useEffect(() => {
    console.log(events);
  }, []);

  return (
    <>
      <div className="absolute left-[1%] top-[10%] bg-neutral-200 w-[250px] min-h-[80vh]">
        <p className="text-center text-xl font-bold my-2">Task List</p>
        <div className="flex flex-col gap-2">
          {events?.map(({ id, title, time, bgColor }) => (
            <div
              className={`w-[200px] min-h-20 border-l-500 border-[4px] ml-2 shadow p-2`}
              style={{
                backgroundColor: bgColor,
              }}
            >
              <div key={id} draggable>
                <p>{time}</p>
                <p>{title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
