import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { useRef } from "react";

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

const ImportExport = ({ tasks, fetchTasks }: { tasks: Task[], fetchTasks: () => Promise<void> }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {toast} = useToast()

  const handleImport = () => {
    // Trigger the hidden file input click
    fileInputRef.current?.click();
  };

  const loadTasks = async (content: string) => {
    const response = await fetch('http://localhost:8080/tasks/load', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: content
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    fetchTasks()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          console.log("Imported tasks:", JSON.parse(content));
          loadTasks(content)
          ;
        } catch (error) {
          console.error("Error parsing imported file:", error);
          toast({description: "Error importing tasks", variant: "destructive"})
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExport = () => {
    try {
      const jsonData = JSON.stringify(tasks, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `tasks-${new Date().toISOString().split('T')[0]}.txt`;
      
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      toast({description: "Error exporting tasks", variant: "destructive"})
      console.error('Error exporting tasks:', error);
    }
  };


  return (
    <div className="mb-4">


      <Button onClick={handleImport}>
        <label>Import Tasks</label>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept=".json,.txt"
        />
      </Button>
      <Button onClick={handleExport}>Export Tasks</Button>
    </div>
  );
};

export default ImportExport;