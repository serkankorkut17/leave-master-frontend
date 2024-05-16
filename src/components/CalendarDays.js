import React from "react";

function CalendarDays(props) {
  const firstDayOfMonth = new Date(
    props.day.getFullYear(),
    props.day.getMonth(),
    1
  );
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  const currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (day - weekdayOfFirstDay)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    const calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === props.day.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === props.day.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  return (
    <div className="w-full flex-grow flex flex-wrap justify-center box-border">
      {currentDays.map((day) => (
        <div
          className={`w-[125px] h-[75px] relative border border-gray-400 ${day.currentMonth ? "text-black" : ""} ${
            day.selected ? "text-red-600 font-bold" : ""
          }`}
          onClick={() => props.changeCurrentDay(day)}
        >
          <p className="absolute right-2 text-gray-600">{day.number}</p>
        </div>
      ))}
    </div>
  );
}

export default CalendarDays;
