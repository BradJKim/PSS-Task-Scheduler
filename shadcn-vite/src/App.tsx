import "./App.css";
import TaskTable from "./components/TaskTable";
import TaskSidebar from "./components/TaskSidebar"; // Import the sidebar component

function App() {
  const tasks = [
    { id: 1, name: "Task 1", date: "2024-11-25", time: "14:00" },
    { id: 2, name: "Task 2", date: "2024-11-26", time: "09:00" },
    { id: 3, name: "Task 3", date: "2024-11-27", time: "16:30" },
    { id: 4, name: "Task 4", date: "2024-11-25", time: "10:00" },
  ];

  return (
    <div id="root" className="flex h-screen">
      {/* Sidebar on the left */}
      <aside className="w-1/4 bg-gray-200 p-4 border-r border-gray-300">
        <TaskSidebar />
      </aside>

      {/* Task table on the right */}
      <main className="w-3/4 p-4">
        <TaskTable tasks={tasks} />
      </main>
    </div>
  );
}

export default App;
