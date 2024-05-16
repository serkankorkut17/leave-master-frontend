import React, { useState } from "react";
import dayjs from "dayjs";
import CalendarDays from "../components/CalendarDays";

const CalendarPage = () => {
  const [currentDay, setCurrentDay] = useState(new Date());

  const handleDayChange = (day) => {
    setCurrentDay(new Date(day.year, day.month, day.number));
  };
  const month = 6; // May
  const year = 2024;

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const firstDayOfMonth = dayjs()
    .set("year", year)
    .set("month", month - 1)
    .startOf("month");
  const daysInMonth = firstDayOfMonth.daysInMonth();
  const monthDays = Array.from(new Array(daysInMonth).keys()).map((index) => {
    return firstDayOfMonth.add(index, "day");
  });
  const startDayOfWeek = firstDayOfMonth.day() - 1;
  const precedingDays = Array.from(new Array(startDayOfWeek).keys()).map(
    () => null
  );
  const succeedDays = Array.from(
    new Array(35 - daysInMonth - precedingDays.length).keys()
  ).map(() => null);

  return (
    <div className="h-full mt-16">
      <div className="w-900 h-600 flex flex-col">
        <div className="h-100 w-full flex items-center">
          <h2>{firstDayOfMonth.format("MMMM YYYY")}</h2>
        </div>
        <div className="w-full flex-grow flex flex-col">
          <div className="h-100 w-full flex items-center justify-around">
            {weekdays.map((weekday) => {
              return (
                <div className="w-100 text-center" key={weekday}>
                  <p>{weekday}</p>
                </div>
              );
            })}
          </div>
          <CalendarDays
            day={currentDay}
            changeCurrentDay={handleDayChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
