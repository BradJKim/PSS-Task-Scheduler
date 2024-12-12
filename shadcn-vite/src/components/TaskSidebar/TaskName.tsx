import { Input } from "../ui/input";

const TaskName = ({name, updateTaskDetail}: {name: string, updateTaskDetail: (key: string, value: string) => void}) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium">Task Name</label>
      <Input
        placeholder="Enter task name"
        value={name}
        onChange={(e) => updateTaskDetail("name", e.target.value)}
      />
    </div>
  );
}

export default TaskName