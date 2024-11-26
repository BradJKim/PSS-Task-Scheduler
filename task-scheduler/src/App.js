import './App.css';
import TaskTable from './components/TaskTable';


function App() {

  const tasks = [
    { id: 1, name: 'Task 1', date: '2024-11-25', time: '14:00' },
    { id: 2, name: 'Task 2', date: '2024-11-26', time: '09:00' },
    { id: 3, name: 'Task 3', date: '2024-11-27', time: '16:30' },
    { id: 4, name: 'Task 4', date: '2024-11-25', time: '10:00' },
  ];

  return (
    <TaskTable tasks={tasks} />
  );
}

export default App;
