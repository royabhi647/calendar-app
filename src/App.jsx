import React, { useState } from 'react';
import Calendar from './components/Calendar';
import CalendarHeader from './components/CalendarHeader';

function App() {
  // State to hold the current date being displayed
  const [currentDate, setCurrentDate] = useState(new Date(2024, 7, 7));

  // State to hold the list of events
  const [events, setEvents] = useState([
    { id: 1, resource: 'Resource A', title: 'Event 1', start: '2024-08-02T09:00', end: '2024-08-04T17:00', color: '#FFCCCB' },
    { id: 2, resource: 'Resource C', title: 'Event 2', start: '2024-08-12T09:00', end: '2024-08-12T15:00', color: '#E6E6FA' },
    { id: 3, resource: 'Resource D', title: 'Event 3', start: '2024-08-12T10:00', end: '2024-08-13T16:00', color: '#FFB6C1' },
    { id: 4, resource: 'Resource E', title: 'Event 4', start: '2024-08-15T07:00', end: '2024-08-15T12:00', color: '#90EE90' },
    { id: 5, resource: 'Resource F', title: 'Event 5', start: '2024-08-03T08:00', end: '2024-08-08T18:00', color: '#FFFACD' },
    { id: 6, resource: 'Resource G', title: 'Event 6', start: '2024-08-09T08:00', end: '2024-08-09T20:00', color: '#E0FFFF' },
    { id: 7, resource: 'Resource B', title: 'Event 7', start: '2024-08-20T14:00', end: '2024-08-22T12:00', color: '#FFA07A' },
    { id: 8, resource: 'Resource H', title: 'Event 8', start: '2024-08-25T09:00', end: '2024-08-25T17:00', color: '#98FB98' },
    { id: 9, resource: 'Resource A', title: 'Event 9', start: '2024-09-05T10:00', end: '2024-09-07T16:00', color: '#DDA0DD' },
    { id: 10, resource: 'Resource C', title: 'Event 10', start: '2024-09-10T09:00', end: '2024-09-10T18:00', color: '#20B2AA' },
    { id: 11, resource: 'Resource E', title: 'Event 11', start: '2024-09-15T08:00', end: '2024-09-18T17:00', color: '#F0E68C' },
    { id: 12, resource: 'Resource G', title: 'Event 12', start: '2024-09-22T11:00', end: '2024-09-23T15:00', color: '#FF69B4' },
    { id: 13, resource: 'Resource I', title: 'Event 13', start: '2024-09-28T09:00', end: '2024-09-28T13:00', color: '#8FBC8F' },
    { id: 14, resource: 'Resource B', title: 'Event 14', start: '2024-10-03T10:00', end: '2024-10-05T18:00', color: '#CD853F' },
    { id: 15, resource: 'Resource D', title: 'Event 15', start: '2024-10-08T09:00', end: '2024-10-08T17:00', color: '#6A5ACD' },
    { id: 16, resource: 'Resource F', title: 'Event 16', start: '2024-10-12T08:00', end: '2024-10-14T16:00', color: '#00CED1' },
    { id: 17, resource: 'Resource H', title: 'Event 17', start: '2024-10-18T11:00', end: '2024-10-20T13:00', color: '#FF6347' },
    { id: 18, resource: 'Resource A', title: 'Event 18', start: '2024-10-25T09:00', end: '2024-10-25T18:00', color: '#7B68EE' },
    { id: 19, resource: 'Resource C', title: 'Event 19', start: '2024-10-30T10:00', end: '2024-10-31T15:00', color: '#3CB371' },
  ]);

  // Function to handle going to the previous month
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  // Function to handle going to the next month
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  // Function to reset the calendar to the "today" date
  const handleToday = () => {
    setCurrentDate(new Date(2024, 7, 7));
  };

  // Function to add a new event
  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  // Function to update an existing event
  const handleUpdateEvent = (updatedEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  };

  // Function to delete an event
  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div className="calendar-container">
      {/* Render the CalendarHeader component with props for current date and navigation functions */}
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />

      {/* Render the Calendar component with props for current date, events, and event handling functions */}
      <Calendar
        currentDate={currentDate}
        events={events}
        onAddEvent={handleAddEvent}
        onUpdateEvent={handleUpdateEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
}

export default App;
