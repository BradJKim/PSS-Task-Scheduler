import { useState } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, isSameDay } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';

interface Task {
  id: string;
  name: string;
  taskSpecific: string;
  date: string;
  startTime: string;
  endTime: string;
  dateTimeStart: string;
  dateTimeEnd: string;
}

const TaskTable = ({ tasks, fetchTasks } : { tasks: Task[], fetchTasks: () => Promise<void>}) => {
  const [view, setView] = useState<'day' | 'week' | 'month' | 'future' | 'past'>('day');

  const getTasksByDate = (date: Date): Task[] => {
    const now = new Date();
    
    return tasks.filter((task) => {
      const taskDate = new Date(task.dateTimeStart);
      
      if (view === 'future') {
        return taskDate > now;
      }
      
      if (view === 'past') {
        return taskDate < now;
      }
      
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
      
      return false;
    });
  };

  const onDelete = async(taskId: string) => {
    console.log("deleted " + taskId);
    const response = await fetch(`http://127.0.0.1:8080/tasks/remove/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Task deleted successfully:', data);
    fetchTasks();
  };

  const renderTable = () => {
    const date = new Date();
    const tasksForPeriod = getTasksByDate(date);

    // Sort tasks by date
    const sortedTasks = tasksForPeriod.sort((a, b) => {
      return new Date(a.dateTimeStart).getTime() - new Date(b.dateTimeStart).getTime();
    });

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="p-4">Task</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.map((task) => {
            const taskDate = new Date(task.dateTimeStart);
            const isPast = taskDate < new Date();
            
            return (
              <TableRow 
                key={task.id}
                className={isPast ? 'opacity-60' : ''}
              >
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.taskSpecific}</TableCell>
                <TableCell>{format(new Date(task.dateTimeStart), 'yyyy-MM-dd')}</TableCell>
                <TableCell>{task.startTime}</TableCell>
                <TableCell>{task.endTime}</TableCell>
                <TableCell>
                  <Button onClick={() => onDelete(task.id)} variant="destructive">
                    delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
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
        <Button onClick={() => setView('future')}>Future Tasks</Button>
        <Button onClick={() => setView('past')}>Past Tasks</Button>
      </div>
      {renderTable()}
    </div>
  );
};

export default TaskTable;