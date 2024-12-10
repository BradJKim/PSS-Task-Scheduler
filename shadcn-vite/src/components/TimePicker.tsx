import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";

interface TimePickerProps {
  selectedHour: string;
  selectedMinute: string;
  selectedAmPm: string;
  onHourChange: (hour: string) => void;
  onMinuteChange: (minute: string) => void;
  onAmPmChange: (amPm: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  selectedHour,
  selectedMinute,
  selectedAmPm,
  onHourChange,
  onMinuteChange,
  onAmPmChange,
}) => {
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1)); // 1 to 12
  const minutes = ["00", "15", "30", "45"]; // 15-minute increments
  const amPmOptions = ["AM", "PM"];

  return (
    <div className="flex gap-2">
      {/* Hour Picker */}
      <Select onValueChange={onHourChange} value={selectedHour}>
        <SelectTrigger>
          <SelectValue placeholder="Hour" />
        </SelectTrigger>
        <SelectContent className="bg-neutral-900">
          {hours.map((hour) => (
            <SelectItem key={hour} value={hour} className="cursor-pointer px-4 py-2 hover:bg-neutral-700 rounded">
              {hour}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Minute Picker */}
      <Select onValueChange={onMinuteChange} value={selectedMinute}>
        <SelectTrigger>
          <SelectValue placeholder="Minute" />
        </SelectTrigger>
        <SelectContent className="bg-neutral-900">
          {minutes.map((minute) => (
            <SelectItem key={minute} value={minute} className="cursor-pointer px-4 py-2 hover:bg-neutral-700 rounded">
              {minute}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* AM/PM Picker */}
      <Select onValueChange={onAmPmChange} value={selectedAmPm}>
        <SelectTrigger>
          <SelectValue placeholder="AM/PM" />
        </SelectTrigger>
        <SelectContent className="bg-neutral-900">
          {amPmOptions.map((amPm) => (
            <SelectItem key={amPm} value={amPm} className="cursor-pointer px-4 py-2 hover:bg-neutral-700 rounded">
              {amPm}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimePicker;
