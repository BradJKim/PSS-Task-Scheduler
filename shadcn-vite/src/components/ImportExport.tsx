import { Button } from "./ui/button";

const handleImport = () => {
  // Handle import logic here
  console.log("Importing tasks...");
};

const handleExport = () => {
  // Handle export logic here
  console.log("Exporting tasks...");
};

const ImportExport = () => {
    return (
      <div className="mb-4 ">
        <Button onClick={handleImport}>Export Tasks</Button>
        <Button onClick={handleExport}>Import Tasks</Button>
      </div>
  );
};

export default ImportExport;