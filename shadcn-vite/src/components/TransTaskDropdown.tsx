import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface TransTaskDropdownProps {
  onSelect: (value: string) => void;
}

const TransTaskDropdown = ({ onSelect }: TransTaskDropdownProps) => {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Task Type" />
      </SelectTrigger>
      <SelectContent className="bg-neutral-900 border border-gray-200 rounded shadow-md p-2">
        <SelectItem value="appointment">Appointment</SelectItem>
        <SelectItem value="shopping">Shopping</SelectItem>
        <SelectItem value="visit">Visit</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TransTaskDropdown;