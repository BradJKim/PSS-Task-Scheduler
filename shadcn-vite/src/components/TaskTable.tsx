import { useState } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, isSameDay } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';

interface Task {
  id: string | number;
  name: string;
  date: string;
  startTime: string; // Updated to include start time
  endTime: string;   // Updated to include end time
  type: string;
}

interface TaskTableProps {
  tasks: Task[];
  // onDelete: (taskId: string | number) => void; // New prop for deleting tasks
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks}) => {
  const [view, setView] = useState<'day' | 'week' | 'month' | 'past'>('day');

  const getTasksByDate = (date: Date): Task[] => {
    return tasks.filter((task) => {
      const taskDate = new Date(`${task.date}T${task.startTime}`);
      if (view === 'day') {
        return isSameDay(taskDate, date);
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
      if (view === 'past') {
        return taskDate < new Date();
      }
      return false;
    });
  };
  const onDelete = (taskId: string | number) => {
    console.log("deleted " +taskId);
  };
  const renderTable = () => {
    const date = new Date();
    const tasksForPeriod = getTasksByDate(date);

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="p-4">Task</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead></TableHead> {/* New column */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasksForPeriod.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.type}</TableCell>
              <TableCell>{format(new Date(`${task.date}T${task.startTime}`), 'yyyy-MM-dd')}</TableCell>
              <TableCell>{task.startTime}</TableCell>
              <TableCell>{task.endTime}</TableCell>
              <TableCell>
                <Button onClick={() => onDelete(task.id)} variant="destructive">
                  delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ marginBottom: '10px' }}>
        <Button onClick={() => setView('day')}>Day View</Button>
        <Button onClick={() => setView('week')}>Week View</Button>
        <Button onClick={() => setView('month')}>Month View</Button>
        <Button onClick={() => setView('past')}>Past Tasks</Button>
      </div>
      {renderTable()}
    </div>
  );
};

export default TaskTable;
