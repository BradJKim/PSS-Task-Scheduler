import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"; // Adjust the import path to your project's structure
import { Button } from "@/components/ui/button"; // If needed, keep the button component for other use cases

const Dropdown = () => {
  const handleSelect = (value: string) => {
    alert(`You selected: ${value}`);
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Task Type" />
      </SelectTrigger>
      <SelectContent className="bg-neutral-900 border border-gray-200 rounded shadow-md p-2">
        <SelectItem value="Option 1">Appointment</SelectItem>
        <SelectItem value="Option 2">Shopping</SelectItem>
        <SelectItem value="Option 3">Visit</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
