import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";



interface TransTaskDropdownProps {
  onSelect: (value: string) => void;
  options: string[];
}

const TransTaskDropdown = ({ 
  onSelect, 
  options,
}: TransTaskDropdownProps) => {
  return (
    <div className="mb-4">
    <label className="block mb-1 text-sm font-medium">Task Type</label>
    <Select onValueChange={onSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Task Type" />
      </SelectTrigger>
      <SelectContent className="bg-neutral-900 border border-gray-200 rounded shadow-md p-2">
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    </div>
  );
};

export default TransTaskDropdown;
