import React from 'react';
import dayjs from 'dayjs';

const CalendarPage = () => {
  const month = 6; // May
  const year = 2024;
      
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const firstDayOfMonth = dayjs()
    .set('year', year)
    .set('month', month - 1)
    .startOf('month');
  const daysInMonth = firstDayOfMonth.daysInMonth();
  const monthDays = Array.from(new Array(daysInMonth).keys()).map(index => {
    return firstDayOfMonth.add(index, 'day');
  });
  const startDayOfWeek = firstDayOfMonth.day() - 1;
  const precedingDays = Array.from(new Array(startDayOfWeek).keys()).map(
    () => null
  );
  const succeedDays = Array.from(new Array(35 - daysInMonth - precedingDays.length).keys()).map(
    () => null
  );

  return (
    <div className="h-full mt-16">
      <h1 className="text-4xl mb-4 font-bold text-center">
        {firstDayOfMonth.format('MMMM YYYY').toUpperCase()}
      </h1>
      <div className="grid grid-cols-7 gap-0">
      {dayNames.map(dayName => (
          <div
            key={dayName}
            className="flex items-center justify-center font-semibold text-2xl text-gray-900 auto-cols-auto auto-rows-auto dark:text-white"
          >
            {dayName}
          </div>
        ))}
        </div>
      <div className="h-screen grid grid-cols-7 gap-0 border-2 border-gray-300 dark:border-white">
        {precedingDays.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-center text-gray-900 dark:text-white border-2 border-gray-300 dark:border-white"
          >
            {day ? day.format('D') : ''}
          </div>
        ))}
        {monthDays.map(day => (
          <div
            key={day}
            className="flex items-center justify-center text-gray-900 dark:text-white border-2 border-gray-300 dark:border-white"
          >
            {day.format('D')}
          </div>
        ))}
        {succeedDays.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-center text-gray-900 dark:text-white border-2 border-gray-300 dark:border-white"
          >
            {day ? day.format('D') : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;
