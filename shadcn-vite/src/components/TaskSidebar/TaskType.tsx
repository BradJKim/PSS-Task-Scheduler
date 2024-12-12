import { Button } from "../ui/button";

const TaskType = ({type, updateTaskDetail}: {type: "one-time" | "recurring", updateTaskDetail: (key: string, value: string) => void}) => {
  return (
    <>
      <label className="block mb-1 text-sm font-medium">Task Type</label>
      <div className="mb-4">
        <Button
          className={type === "one-time" ? "bg-neutral-800" : "secondary"}
          onClick={() => updateTaskDetail("type", "one-time")}
        >
          One-Time Task
        </Button>
        <Button
          className={type === "recurring" ? "bg-neutral-800" : "secondary"}
          onClick={() => updateTaskDetail("type", "recurring")}
        >
          Recurring Task
        </Button>
      </div>
    </>
  );
}

export default TaskType