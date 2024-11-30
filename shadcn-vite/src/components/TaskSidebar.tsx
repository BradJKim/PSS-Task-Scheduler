import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import DatePicker from "./DatePicker"; // Import the DatePicker component
import TimePicker from "./TimePicker";

const TaskSidebar = () => {
  const [taskType, setTaskType] = useState<"one-time" | "recurring" | "antitask">("one-time");
  const [taskName, setTaskName] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [startAmPm, setStartAmPm] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
  const [endAmPm, setEndAmPm] = useState("");

  const handleTaskSubmission = () => {
    const startTime = `${startHour}:${startMinute} ${startAmPm}`;
    const endTime = `${endHour}:${endMinute} ${endAmPm}`;
    const taskDetails = {
      type: taskType,
      name: taskName,
      startDate,
      endDate: taskType === "recurring" ? endDate : null,
      startTime,
      endTime,
    };
    console.log("Task Details:", taskDetails);
    // Handle task creation logic here
  };

  return (
    <div className="w-1/4 bg-gray-100 p-4 h-screen flex flex-col">
      <h2 className="text-xl font-bold mb-4">Create Task</h2>

      {/* Task Type Selection */}
      <div className="mb-4">
        <Button
          variant={taskType === "one-time" ? "primary" : "secondary"}
          onClick={() => setTaskType("one-time")}
        >
          One-Time Task
        </Button>
        <Button
          variant={taskType === "recurring" ? "primary" : "secondary"}
          onClick={() => setTaskType("recurring")}
          className="ml-2"
        >
          Recurring Task
        </Button>
        <Button
          variant={taskType === "antitask" ? "primary" : "secondary"}
          onClick={() => setTaskType("antitask")}
          className="ml-2"
        >
          Antitask
        </Button>
      </div>

      {/* Task Name */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Task Name</label>
        <Input
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>

      {/* Start Date */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Start Date</label>
        <DatePicker selectedDate={startDate} onDateChange={setStartDate} />
      </div>

      {/* End Date (Only for Recurring Tasks) */}
      {taskType === "recurring" && (
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">End Date</label>
          <DatePicker selectedDate={endDate} onDateChange={setEndDate} />
        </div>
      )}

      {/* Start Time */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Start Time</label>
        <TimePicker
          selectedHour={startHour}
          selectedMinute={startMinute}
          selectedAmPm={startAmPm}
          onHourChange={setStartHour}
          onMinuteChange={setStartMinute}
          onAmPmChange={setStartAmPm}
        />
      </div>

      {/* End Time */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">End Time</label>
        <TimePicker
          selectedHour={endHour}
          selectedMinute={endMinute}
          selectedAmPm={endAmPm}
          onHourChange={setEndHour}
          onMinuteChange={setEndMinute}
          onAmPmChange={setEndAmPm}
        />
      </div>

      {/* Submit Button */}
      <Button variant="primary" onClick={handleTaskSubmission}>
        Create Task
      </Button>
    </div>
  );
};

export default TaskSidebar;
