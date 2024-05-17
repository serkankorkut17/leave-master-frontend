import React, { useEffect, useState } from 'react';
import CalendarDays from '../components/CalendarDays';
import Loading from '../components/Loading';

const Calendar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [collisionDays, setCollisionDays] = useState({
    sameType: [],
    differentType: [],
  });
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [currentDay, setCurrentDay] = useState(new Date());

  const changeCurrentDay = day => {
    setCurrentDay(new Date(day.year, day.month, day.number));
  };

  const nextMonth = () => {
    setCurrentDay(prevDay => {
      const newDate = new Date(
        prevDay.getFullYear(),
        prevDay.getMonth() + 1,
        prevDay.getDate()
      );
      return newDate;
    });
  };

  const previousMonth = () => {
    setCurrentDay(prevDay => {
      const newDate = new Date(
        prevDay.getFullYear(),
        prevDay.getMonth() - 1,
        prevDay.getDate()
      );
      return newDate;
    });
  };

  useEffect(() => {
    document.title = 'Calendar';
    //wait for 500ms
    setTimeout(() => {
      setCollisionDays({
        sameType: [1, 2, 3, 4, 5, 10, 29],
        differentType: [4, 5, 6, 7, 8, 9, 10, 17, 30],
      });
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className="h-full mt-16">
        <div className="calendar">
          <div className="calendar-header">
            <div className="title">
              <h2>
                {months[currentDay.getMonth()]} {currentDay.getFullYear()}
              </h2>
            </div>
            <div className="tools">
              <button onClick={previousMonth}>
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h14M5 12l4-4m-4 4 4 4"
                  />
                </svg>
              </button>
              <p>{months[currentDay.getMonth()].substring(0, 3)}</p>
              <button onClick={nextMonth}>
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="calendar-body">
            <div className="table-header">
              {weekdays.map((weekday, index) => (
                <div key={index} className="weekday">
                  <p>{weekday}</p>
                </div>
              ))}
            </div>
            <CalendarDays
              day={currentDay}
              changeCurrentDay={changeCurrentDay}
              collisionDays={collisionDays}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
