import { Button } from "./ui/button";

const ImportExport = () => {
    return (
    <div className="flex gap-2">
        <Button variant="primary" onClick={handleTaskSubmission}>
            Import Tasks
        </Button>

      {/* Export Button */}
      <Button variant="primary" className="flex-1">
        Export Tasks
      </Button>
    </div>
  );
};

export default ImportExport;