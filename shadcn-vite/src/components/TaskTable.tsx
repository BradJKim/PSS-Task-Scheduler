import { useState } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, isSameDay } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';

interface Task {
  id: string | number;
  name: string;
  date: string; 
  time: string; 
}

interface TaskTableProps {
  tasks: Task[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks }) => {
  const [view, setView] = useState<'day' | 'week' | 'month' | 'past'>('day');

  const getTasksByDate = (date: Date): Task[] => {
    return tasks.filter((task) => {
      const taskDate = new Date(`${task.date}T${task.time}`);
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

  const renderTable = () => {
    const date = new Date();
    const tasksForPeriod = getTasksByDate(date);

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasksForPeriod.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.name}</TableCell>
              <TableCell>{format(new Date(`${task.date}T${task.time}`), 'yyyy-MM-dd')}</TableCell>
              <TableCell>{task.time}</TableCell>
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
