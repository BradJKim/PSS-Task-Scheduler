import { Button } from "./ui/button";

interface Task {
  id: string;
  name: string;
  taskSpecific: string;
  date: string;
  startTime: string;
  endTime: string;
  dateTimeStart: string;
  dateTimeEnd: string;
}

const ImportExport = ({ tasks } : { tasks: Task[]}) => {
  const handleImport = () => {
    // Handle import logic here
    console.log("Importing tasks...");
  };

  const handleExport = () => {
    try {
      // Create a JSON blob from the tasks data
      const jsonData = JSON.stringify(tasks, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `tasks-${new Date().toISOString().split('T')[0]}.txt`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting tasks:', error);
    }
  };

  return (
    <div className="mb-4">
      <Button onClick={handleImport}>Import Tasks</Button>
      <Button onClick={handleExport}>Export Tasks</Button>
    </div>
  );
};

export default ImportExport;
