// import "./index.css.css";
import { useState, useEffect } from "react";
import TaskTable from "./components/TaskTable";
import TaskSidebar from "./components/TaskSidebar";
import TaskSidebarOld from "./components/TaskSidebarOld";
import { Import } from "lucide-react";
import ImportExport from "./components/ImportExport";

function App() {
  // State to hold tasks fetched from the API
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
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
  }, []);

  return (
    <div id="root" className="flex h-screen">
      {/* Sidebar on the left */}
      <aside className="p-4">
        <TaskSidebar />
        {/* <TaskSidebarOld /> */}
      </aside>

      {/* Task table on the right */}
      <main className="p-4">
        <ImportExport />
        <TaskTable tasks={tasks} />
      </main>
    </div>
  );
}

export default App;
