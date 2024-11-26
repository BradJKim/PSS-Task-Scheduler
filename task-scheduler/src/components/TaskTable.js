import React, { useState } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, isSameDay } from 'date-fns';

const TaskTable = ({ tasks }) => {
  const [view, setView] = useState('day'); // 'day', 'week', 'month'

  const getTasksByDate = (date) => {
    return tasks.filter((task) => {
      const taskDate = new Date(`${task.date}T${task.time}`);
      if (view === 'day') {
        return isSameDay(taskDate, date); // Checks if task is on the same day
      }
      if (view === 'week') {
        const startOfWeekDate = startOfWeek(date);
        const endOfWeekDate = addDays(startOfWeekDate, 6);
        return taskDate >= startOfWeekDate && taskDate <= endOfWeekDate;
      }
      if (view === 'month') {
        const startOfMonthDate = startOfMonth(date);
        const endOfMonthDate = endOfMonth(startOfMonthDate);
        return taskDate >= startOfMonthDate && taskDate <= endOfMonthDate;
      }
      return false;
    });
  };

  const renderTable = () => {
    const date = new Date(); // Current date for the view
    const tasksForPeriod = getTasksByDate(date);

    return (
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Due Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {tasksForPeriod.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{format(new Date(`${task.date}T${task.time}`), 'yyyy-MM-dd')}</td>
              <td>{task.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <div>
        <button onClick={() => setView('day')}>Day View</button>
        <button onClick={() => setView('week')}>Week View</button>
        <button onClick={() => setView('month')}>Month View</button>
      </div>
      {renderTable()}
    </div>
  );
};

export default TaskTable;
