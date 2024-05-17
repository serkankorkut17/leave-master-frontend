import React from 'react';
import { useState } from 'react';
import { DateRange, DayPicker } from "react-day-picker";
import { addDays } from "date-fns";
import 'react-day-picker/src/style.css';

const LeaveRequestPage = () => {
  const initialRange = {
    from: new Date(),
    to: addDays(new Date(), 2)
  };

  const [range, setRange] = useState(initialRange);
  const [maxLeaveDays, setMaxLeaveDays] = useState(5);

  const handleSelect = (range) => {
    // range = {
    // "from": "2024-05-17T18:12:28.689Z",
    // "to": "2024-05-21T21:00:00.000Z"
    // }
    // if range is more than maxLeaveDays, dont increase the range
    // const diff = new Date(range.to) - new Date(range.from);
    // const days = diff / (1000 * 60 * 60 * 24);
    // if (days > maxLeaveDays) {
    //   return;
    // }
    setRange(range);
  };

  return (
    <div className="container mx-auto mt-16">
      <h1 className="text-4xl font-bold text-center dark:text-white">Leave Request Page</h1>
      <div className="mx-auto max-w-md flex justify-center items-center dark:bg-gray-800 text-center mt-5 rounded-xl">
        <DayPicker
          mode="range"
          // min={1}
          max={5}
          selected={range}
          onSelect={handleSelect}
          disabled={day => day < new Date()}
          className="justify-center dark:text-white"
        />
      </div>
    </div>
  );
};

export default LeaveRequestPage;
