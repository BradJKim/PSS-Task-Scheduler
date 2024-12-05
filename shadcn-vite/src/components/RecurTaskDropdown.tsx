
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button } from "@/components/ui/button"; // Adjust the import path to your project's structure

const Dropdown = () => {
  const handleSelect = (value: string) => {
    alert(`You selected: ${value}`);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="default">Task Type</Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-black border border-gray-200 rounded shadow-md p-2"
          sideOffset={5}
        >
          <DropdownMenu.Item
            onSelect={() => handleSelect('Option 1')}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded"
          >
            Course
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleSelect('Option 2')}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded"
          >
            Exercise
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleSelect('Option 3')}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded"
          >
            Meal
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleSelect('Option 3')}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded"
          >
            Sleep
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleSelect('Option 3')}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded"
          >
            Study
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleSelect('Option 3')}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded"
          >
            Work
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
