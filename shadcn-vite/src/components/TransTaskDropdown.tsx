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
          className="bg-neutral-900 border border-gray-200 rounded shadow-md p-2"
          sideOffset={5}
        >
          <DropdownMenu.Item
            onSelect={() => handleSelect('Option 1')}
            className="cursor-pointer px-4 py-2 hover:bg-neutral-700 rounded"
          >
            Appointment
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleSelect('Option 2')}
            className="cursor-pointer px-4 py-2 hover:bg-neutral-700 rounded"
          >
            Shopping
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleSelect('Option 3')}
            className="cursor-pointer px-4 py-2 hover:bg-neutral-700 rounded"
          >
            Visit
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;