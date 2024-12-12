import { Input } from "../ui/input";

const TaskDuration = ({duration, updateTaskDetail}: {duration: number | undefined, updateTaskDetail: (key: string, value: number) => void}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 0) {
          updateTaskDetail("repeatPeriod", value);
        }
      };


  return (
    <>
      <label className="block mb-1 text-sm font-medium">Duration</label>
      <div className="mb-4">
        <Input
          type="number"
          min={0}
          className="w-full p-2 border border-gray-200 rounded"
          value={duration}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default TaskDuration