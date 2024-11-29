import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "./ui/popover";

const hours = Array.from({ length: 12 }, (_, i) => String(i + 1)); // 1 to 12
const minutes = ["00", "15", "30", "45"]; // 15-minute increments
const amPm = ["AM", "PM"];

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

  const renderDatePicker = (date: Date | undefined, setDate: (date: Date) => void) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={`w-full justify-start text-left font-normal ${
            !date ? "text-muted-foreground" : ""
          }`}
        >
          <CalendarIcon className="mr-2" />
          {date ? format(date, "PPP") : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );

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
        {renderDatePicker(startDate, setStartDate)}
      </div>

      {/* End Date (Only for Recurring Tasks) */}
      {taskType === "recurring" && (
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">End Date</label>
          {renderDatePicker(endDate, setEndDate)}
        </div>
      )}

      {/* Start Time */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Start Time</label>
        <div className="flex gap-2">
          <Select onValueChange={setStartHour}>
            <SelectTrigger>
              <SelectValue placeholder="Hour" />
            </SelectTrigger>
            <SelectContent>
              {hours.map((hour) => (
                <SelectItem key={hour} value={hour}>
                  {hour}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setStartMinute}>
            <SelectTrigger>
              <SelectValue placeholder="Minute" />
            </SelectTrigger>
            <SelectContent>
              {minutes.map((minute) => (
                <SelectItem key={minute} value={minute}>
                  {minute}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setStartAmPm}>
            <SelectTrigger>
              <SelectValue placeholder="AM/PM" />
            </SelectTrigger>
            <SelectContent>
              {amPm.map((period) => (
                <SelectItem key={period} value={period}>
                  {period}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* End Time */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">End Time</label>
        <div className="flex gap-2">
          <Select onValueChange={setEndHour}>
            <SelectTrigger>
              <SelectValue placeholder="Hour" />
            </SelectTrigger>
            <SelectContent>
              {hours.map((hour) => (
                <SelectItem key={hour} value={hour}>
                  {hour}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setEndMinute}>
            <SelectTrigger>
              <SelectValue placeholder="Minute" />
            </SelectTrigger>
            <SelectContent>
              {minutes.map((minute) => (
                <SelectItem key={minute} value={minute}>
                  {minute}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setEndAmPm}>
            <SelectTrigger>
              <SelectValue placeholder="AM/PM" />
            </SelectTrigger>
            <SelectContent>
              {amPm.map((period) => (
                <SelectItem key={period} value={period}>
                  {period}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Submit Button */}
      <Button variant="primary" onClick={handleTaskSubmission}>
        Create Task
      </Button>
    </div>
  );
};

export default TaskSidebar;
