import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import RecurTaskDropdown from "./RecurTaskDropdown";
import TransTaskDropdown from "./TransTaskDropdown";

interface TaskSubmission {
  name: string;
  dateString: string;
  startTimeString: string;
  endTimeString: string;
  taskSpecific: string;
  repeatPeriod: number | null;
}

const TaskSidebar = () => {
  const [taskDetails, setTaskDetails] = useState({
    type: "one-time" as "one-time" | "recurring",
    name: "",
    startDate: undefined as Date | undefined,
    startHour: "",
    startMinute: "",
    startAmPm: "",
    endHour: "",
    endMinute: "",
    endAmPm: "",
    taskSpecific: "",
    repeatPeriod: null as number | null,
  });

  const formatTimeString = (hour: string, minute: string, amPm: string): string => {
    let hourNum = parseInt(hour);
    if (amPm === "PM" && hourNum !== 12) hourNum += 12;
    if (amPm === "AM" && hourNum === 12) hourNum = 0;
    return `${hourNum.toString().padStart(2, '0')}:${minute}:00`;
  };

  const formatDateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const handleTaskSubmission = () => {
    if (!taskDetails.startDate) return;

    const submissionDetails: TaskSubmission = {
      name: taskDetails.name,
      dateString: formatDateString(taskDetails.startDate),
      startTimeString: formatTimeString(
        taskDetails.startHour,
        taskDetails.startMinute,
        taskDetails.startAmPm
      ),
      endTimeString: formatTimeString(
        taskDetails.endHour,
        taskDetails.endMinute,
        taskDetails.endAmPm
      ),
      taskSpecific: taskDetails.taskSpecific,
      repeatPeriod: taskDetails.type === "recurring" ? taskDetails.repeatPeriod : null,
    };

    console.log("Task Details:", submissionDetails);
    // Handle task creation logic here
  };

  const updateTaskDetail = (key: string, value: any) => {
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const handleTaskTypeSelection = (specificTask: string) => {
    setTaskDetails(prevDetails => ({
      ...prevDetails,
      taskSpecific: specificTask
    }));
  };

  return (
    <div className="w-full p-4 h-screen flex flex-col">
      <h2 className="text-xl font-bold mb-4 w-full">PSS Task Scheduler</h2>
      <div className="grid">
        {/* Import and Export Tasks Buttons */}
        <div className="mb-4">
          <Button onClick={handleTaskSubmission}>Export Tasks</Button>
          <Button onClick={handleTaskSubmission}>Import Tasks</Button>
        </div>

        {/* Task Type Selection */}
        <div className="mb-4">
          <Button
            variant={taskDetails.type === "one-time" ? "default" : "secondary"}
            onClick={() => updateTaskDetail("type", "one-time")}
          >
            One-Time Task
          </Button>
          <Button
            variant={taskDetails.type === "recurring" ? "default" : "secondary"}
            onClick={() => updateTaskDetail("type", "recurring")}
            className="ml-2"
          >
            Recurring Task
          </Button>
        </div>

        {/* Task Name */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Task Name</label>
          <Input
            placeholder="Enter task name"
            value={taskDetails.name}
            onChange={(e) => updateTaskDetail("name", e.target.value)}
          />
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Date</label>
          <DatePicker
            selectedDate={taskDetails.startDate}
            onDateChange={(date) => updateTaskDetail("startDate", date)}
          />
        </div>


        {taskDetails.type === "recurring" && (
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Task Type</label>
            <RecurTaskDropdown 
              onSelect={(task) => handleTaskTypeSelection("recurring", task)}
            />
          </div>
        )}

        {/* Transient Task Dropdown */}
        {taskDetails.type === "one-time" && (
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Task Type</label>
            <TransTaskDropdown 
              onSelect={(task) => handleTaskTypeSelection("one-time", task)}
            />
          </div>
        )}

        {/* Start Time */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Start Time</label>
          <TimePicker
            selectedHour={taskDetails.startHour}
            selectedMinute={taskDetails.startMinute}
            selectedAmPm={taskDetails.startAmPm}
            onHourChange={(hour) => updateTaskDetail("startHour", hour)}
            onMinuteChange={(minute) => updateTaskDetail("startMinute", minute)}
            onAmPmChange={(amPm) => updateTaskDetail("startAmPm", amPm)}
          />
        </div>

        {/* End Time */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">End Time</label>
          {/* 00:00:00 */}
          <TimePicker
            selectedHour={taskDetails.endHour}
            selectedMinute={taskDetails.endMinute}
            selectedAmPm={taskDetails.endAmPm}
            onHourChange={(hour) => updateTaskDetail("endHour", hour)}
            onMinuteChange={(minute) => updateTaskDetail("endMinute", minute)}
            onAmPmChange={(amPm) => updateTaskDetail("endAmPm", amPm)}
          />
        </div>

        <div className="mb-4">
          <Button onClick={handleTaskSubmission}>Create Task</Button>
        </div>
      </div>
    </div>
  );
};

export default TaskSidebar;