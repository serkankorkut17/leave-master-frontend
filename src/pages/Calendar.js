import React, { useEffect, useState } from 'react';
import CalendarDays from '../components/CalendarDays';
import Loading from '../components/Loading';
import { getLeavesAPI } from '../services/LeaveService';
import { useAuthContext } from '../context/Auth';
import { set } from 'date-fns';

const Calendar = () => {
  const { token } = useAuthContext();
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
    // change only if month is different
    // if (day.month !== currentDay.getMonth()) {
    //   setCurrentDay(new Date(day.year, day.month, day.number));
    // }
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
    if (!token) return;
    if (!currentDay) return;
    setIsLoading(true);
    // console.log(currentDay.getMonth(), currentDay.getFullYear());
    const fetchLeaves = async () => {
      const response = await getLeavesAPI(currentDay.getMonth()+1, currentDay.getFullYear());
      if (response) {
        // console.log(response.data);
        setCollisionDays({
          sameType: response.data.sameRoleDays,
          differentType: response.data.otherRoleDays,
        });
      }
    };
    fetchLeaves();
    setIsLoading(false);
  }, [currentDay, token]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="h-full mt-16 px-4 py-1 mb-4">
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
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14M5 12l4-4m-4 4 4 4"
                  />
                </svg>
              </button>
              <p>{months[currentDay.getMonth()].substring(0, 3)}</p>
              <button onClick={nextMonth}>
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
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
