function CalendarDays(props) {
  const firstDayOfMonth = new Date(
    props.day.getFullYear(),
    props.day.getMonth(),
    1
  );
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  const collisionDays = props.collisionDays;
  let currentDays = [];

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

    let calendarDay = {
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
    <div className="table-content">
      {currentDays.map(day => {
        return (
          <div
            className={
              'calendar-day' +
              (day.currentMonth ? ' current' : '') +
              (day.selected ? ' selected' : '') +
              (day.currentMonth &&
              collisionDays.differentType.includes(day.number)
                ? ' different-type'
                : '') +
              (day.currentMonth && collisionDays.sameType.includes(day.number)
                ? ' same-type'
                : '')
            }
            onClick={() => props.changeCurrentDay(day)}
            key={day.date}
          >
            <p>{day.number}</p>
          </div>
        );
      })}
    </div>
  );
}

export default CalendarDays;
