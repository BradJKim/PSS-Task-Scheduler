import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "./ui/popover";
import { format } from "date-fns";

interface DatePickerProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-start text-left font-normal ${
            !selectedDate ? "text-muted-foreground" : ""
          }`}
        >
          <CalendarIcon className="mr-2" />
          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={selectedDate} onSelect={onDateChange} initialFocus />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
