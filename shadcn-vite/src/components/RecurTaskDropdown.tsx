import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RecurTaskDropdownProps {
  onSelect: (value: string) => void;
}

const RecurTaskDropdown = ({ onSelect }: RecurTaskDropdownProps) => {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Task Type" />
      </SelectTrigger>
      <SelectContent className="bg-neutral-900 border border-gray-200 rounded shadow-md p-2">
        <SelectItem value="course">Course</SelectItem>
        <SelectItem value="exercise">Exercise</SelectItem>
        <SelectItem value="meal">Meal</SelectItem>
        <SelectItem value="sleep">Sleep</SelectItem>
        <SelectItem value="study">Study</SelectItem>
        <SelectItem value="work">Work</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default RecurTaskDropdown;