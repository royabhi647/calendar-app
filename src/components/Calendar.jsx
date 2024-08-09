import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = ({ currentDate, events, onAddEvent, onUpdateEvent, onDeleteEvent }) => {
  // Calculate the number of days in the current month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  // Generate an array of days for the current month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  // Define the list of resources
  const resources = ['Resource A', 'Resource B', 'Resource C', 'Resource D', 'Resource E', 'Resource F', 'Resource G', 'Resource H', 'Resource I'];

  // Get the abbreviated day name (e.g., "Mon", "Tue")
  const getDayAbbreviation = (date) => date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3);

  // Check if a day is the current date
  const isCurrentDate = (day) => {
    const today = new Date();
    return currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear() &&
      day === today.getDate();
  };

  // Format time to a readable string
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  // State to manage dragging events
  const [draggingEvent, setDraggingEvent] = useState(null);
  // State to manage the currently selected event for deletion
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Handle the start of a drag operation
  const handleDragStart = (event, dragEvent) => {
    event.dataTransfer.effectAllowed = "move";
    setDraggingEvent(dragEvent);
  };

  // Handle dropping an event on a new day or resource
  const handleDrop = (day, resource) => {
    if (draggingEvent) {
      const updatedEvent = {
        ...draggingEvent,
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), day, new Date(draggingEvent.start).getHours(), new Date(draggingEvent.start).getMinutes()).toISOString(),
        end: new Date(currentDate.getFullYear(), currentDate.getMonth(), day, new Date(draggingEvent.end).getHours(), new Date(draggingEvent.end).getMinutes()).toISOString(),
        resource
      };
      onUpdateEvent(updatedEvent);
      setDraggingEvent(null);
    }
  };

  // Allow dragging over a cell
  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // Handle clicking on an event to select it
  const handleEventClick = (event, day, resource) => {
    setSelectedEventId(event.id);
  };

  // Handle keydown events for deleting selected events
  const handleKeyDown = (event) => {
    if (event.key === 'Delete' && selectedEventId) {
      if (window.confirm(`Are you sure you want to delete the selected event?`)) {
        onDeleteEvent(selectedEventId);
        setSelectedEventId(null);
      }
    }
  };

  // Set up event listener for delete key
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedEventId]);

  // Handle clicking on a cell to add a new event if none exist for that day and resource
  const handleCellClick = (day, resource) => {
    const eventExists = events.some(e => new Date(e.start).getDate() === day && e.resource === resource);
    if (!eventExists) {
      const eventColor = "#" + Math.floor(Math.random() * 16777215).toString(16); // Random color
      const newEventDetails = {
        id: Math.random(), // Generate a random ID for the new event
        resource,
        title: "New Event",
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), day, 9, 0).toISOString(),
        end: new Date(currentDate.getFullYear(), currentDate.getMonth(), day, 17, 0).toISOString(),
        color: eventColor
      };
      onAddEvent(newEventDetails);
    }
  };

  return (
    <div className="calendar">
      <div className="calendar-grid">
        {/* Resource column header */}
        <div className="resource-column">
          <div className="resource-header"></div>
          {/* List of resources */}
          {resources.map(resource => (
            <div className="resource-name" key={resource} onMouseDown={() => handleNewEventStart(resource)}>{resource}</div>
          ))}
        </div>
        <div className="days-grid">
          {/* Header with day abbreviations */}
          <div className="days-header">
            {days.map(day => {
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              return (
                <div className={`calendar-day ${isCurrentDate(day) ? 'current-day' : ''}`} key={day}>
                  <div className="day-number">{day}</div>
                  <div className="day-abbreviation">{getDayAbbreviation(date)}</div>
                </div>
              );
            })}
          </div>
          {/* Resource rows with days */}
          {resources.map(resource => (
            <div className="resource-row" key={resource}>
              {days.map(day => (
                <div
                  className="calendar-cell"
                  key={`${resource}-${day}`}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(day, resource)}
                  onClick={() => handleCellClick(day, resource)}
                >
                  {/* Render events for each cell */}
                  {events
                    .filter(event => new Date(event.start).getDate() === day && event.resource === resource)
                    .map(event => (
                      <div
                        className={`event ${selectedEventId === event.id ? 'selected' : ''}`}
                        key={event.id}
                        style={{ backgroundColor: event.color }}
                        draggable
                        onDragStart={(e) => handleDragStart(e, event)}
                        onClick={() => handleEventClick(event, day, resource)}
                      >
                        <div className="event-title">{event.title}</div>
                        <div className="event-time">
                          {formatTime(event.start)} - {formatTime(event.end)}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;