import React from 'react';
import './CalendarHeader.css';

const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth, onToday }) => {

  // month names to display the current month's name
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="calendar-header">
      {/* Display the current month and year */}
      <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
      
      <div className="header-controls">
        {/* Button to navigate to the previous month */}
        <button onClick={onPrevMonth}>&lt;</button>

        {/* Button to navigate to the current month */}
        <button onClick={onToday}>Today</button>

        {/* Button to navigate to the next month */}
        <button onClick={onNextMonth}>&gt;</button>
      </div>
    </div>
  );
};

export default CalendarHeader;