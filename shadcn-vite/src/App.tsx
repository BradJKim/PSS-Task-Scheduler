// import "./index.css.css";
import { useState, useEffect } from "react";
import TaskTable from "./components/TaskTable";
import TaskSidebar from "./components/TaskSidebar";
import ImportExport from "./components/ImportExport";

function App() {
  // State to hold tasks fetched from the API
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    fetch("http://localhost:8080/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        return response.json();
      })
      .then((data) => setTasks(data))
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
    };

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div id="root" className="flex h-screen">
      {/* Sidebar on the left */}
      <aside className="p-4">
        <TaskSidebar fetchTasks={fetchTasks} />
      </aside>

      {/* Task table on the right */}
      <main className="p-4">
        <ImportExport tasks={tasks} fetchTasks={fetchTasks} />
        <TaskTable tasks={tasks} fetchTasks={fetchTasks} />
      </main>
    </div>
  );
}

export default App;
