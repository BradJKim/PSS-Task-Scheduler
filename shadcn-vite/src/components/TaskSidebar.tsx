import { useState } from "react";
import { Button } from "./ui/button";

import { useToast } from "@/hooks/use-toast"

import TaskName from "./TaskSidebar/TaskName";
import TaskType from "./TaskSidebar/TaskType";
import StartDateSelect from "./TaskSidebar/StartDateSelect";
import TaskCategory from "./TaskSidebar/TaskCategory";
import TaskTimeSelect from "./TaskSidebar/TaskTimeSelect";
import TaskDuration from "./TaskSidebar/TaskDuration";


const taskCategoryOptions: string[] = ["Course", "Exercise", "Meal", "Sleep", "Study", "Work"];
const oneTimeTaskCategoryOptions: string[] = ["Appointment", "Shopping", "Visit"];

interface TaskSubmission {
  name: string;
  dateString: string;
  startTimeString: string;
  endTimeString: string;
  taskSpecific: string;
  repeatPeriod: number;
}

const TaskSidebar = ({ fetchTasks }: { fetchTasks: () => Promise<void> }) => {
  const [taskDetails, setTaskDetails] = useState({
    type: "one-time" as "one-time" | "recurring",
    name: "",
    startDate: undefined as Date | undefined,
    startTime: "",
    endTime: "",
    taskSpecific: "",
    repeatPeriod: 1,
  });
  
  const { toast } = useToast()

  const formatDateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const handleTaskSubmission = async () => {
    if (!taskDetails.startDate) return;

    const submissionDetails: TaskSubmission = {
      name: taskDetails.name,
      dateString: formatDateString(taskDetails.startDate),
      startTimeString: taskDetails.startTime,
      endTimeString: taskDetails.endTime,
      taskSpecific: taskDetails.taskSpecific,
      repeatPeriod: taskDetails.type === "recurring" ? taskDetails.repeatPeriod : 1,
    };

    console.log("Task Details:", submissionDetails);
    // Handle task creation logic here
    try {
      const response = await fetch('http://127.0.0.1:8080/tasks/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionDetails),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Task created successfully:', data);
      fetchTasks();
    } catch (error) {
      toast({description: "Error creating task", variant: "destructive"})
      console.error('Error creating task:', error);
    }
  };

  const updateTaskDetail = (key: string, value: string | number | Date) => {
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  return (
    <div className="w-full p-4 h-screen flex flex-col">
      <h2 className="text-xl font-bold mb-4 w-full">PSS Task Scheduler</h2>
      <div className="grid">
        
        <TaskName name={taskDetails.name} updateTaskDetail={updateTaskDetail} />

        <TaskType type={taskDetails.type} updateTaskDetail={updateTaskDetail} />

        <StartDateSelect startDate={taskDetails.startDate} updateTaskDetail={updateTaskDetail} /> 

        { taskDetails.type === "recurring" &&
          <TaskDuration duration={taskDetails.repeatPeriod} updateTaskDetail={updateTaskDetail} />
        }

        { taskDetails.type === "recurring" ?
          <TaskCategory options={taskCategoryOptions} onSelect={(task) => updateTaskDetail("taskSpecific", task)} /> 
          :
          <TaskCategory options={oneTimeTaskCategoryOptions} onSelect={(task) => updateTaskDetail("taskSpecific", task)} />
        }

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Start Time</label>
          <TaskTimeSelect value={taskDetails.startTime} onChange={(time) => updateTaskDetail("startTime", time)} />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">End Time</label>
          <TaskTimeSelect value={taskDetails.endTime} onChange={(time) => updateTaskDetail("endTime", time)} />
        </div>


        <div className="mb-4">
          <Button onClick={handleTaskSubmission}>Create Task</Button>
        </div>

      </div>
    </div>
  );
};



export default TaskSidebar;