import React from "react";

const FileUpload = ({file, onChangeFile}) => {
  // const [file, setFile] = useState(null); // Store uploaded files

  // 🟢 Handle file selection via drag-and-drop OR file input
  const handleFile = (selectedFiles) => {
    if (!selectedFiles) return;
    
    onChangeFile(selectedFiles[0]);
  };

  // 🟠 Handle drag-over (to allow dropping)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Drag & Drop Wrapper */}
      <div
        className="w-96 h-40 border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput")?.click()} // Click triggers file input
      >
        {file ? `Selected: ${file.name}` : "Drag & drop a file here or click to upload"}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        onChange={(e) => handleFile(e.target.files)}
        className="hidden"
        id="fileInput"
      />
      
      {/* Display uploaded file */}
      {file && (
        <div className="w-96 p-4 border border-gray-300">
          <h3 className="text-lg font-bold">Uploaded File</h3>
          <img src={URL.createObjectURL(file)} />
          <p className="text-sm text-gray-700">{file.name}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

