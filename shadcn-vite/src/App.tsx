import "./App.css";
import TaskTable from "./components/TaskTable";
import TaskSidebar from "./components/TaskSidebar"; // Import the sidebar component

function App() {
  const tasks = [
    {
      id: 1,
      name: 'Task 1',
      date: '2024-12-05',
      startTime: '10:00',
      endTime: '11:00',
      type: 'Work',
    },
    {
      id: 2,
      name: 'Task 2',
      date: '2024-12-06',
      startTime: '14:00',
      endTime: '15:00',
      type: 'Personal',
    },
  ];

  return (
    <div id="root" className="flex h-screen">
      {/* Sidebar on the left */}
      <aside className=" bg-gray-200 p-4 border-r border-gray-300">
        <TaskSidebar />
        {/* <div className="bg-red-500 text-red p-4">Test</div>

        <div style={{ backgroundColor: 'red', color: 'white' }}>Test</div> */}


      </aside>

      {/* Task table on the right */}
      <main className=" p-4">
        <TaskTable tasks={tasks} />
      </main>
    </div>
    
  );
}

export default App;
