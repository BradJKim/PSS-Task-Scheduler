import DatePicker from "../DatePicker";

const StartDateSelect = ({startDate, updateTaskDetail}: {startDate: Date | undefined, updateTaskDetail: (key: string, value: Date) => void}) => {
    return (
      <div className="mb-4">
      <label className="block mb-1 text-sm font-medium">Date</label>
      <DatePicker
        selectedDate={startDate}
        onDateChange={(date) => updateTaskDetail("startDate", date)}
      />
    </div>
    );
  }

export default StartDateSelect