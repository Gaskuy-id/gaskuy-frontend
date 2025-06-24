import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";

const FileUpload = ({files, setFiles, isMultiple}) => {
  const [filePreviews, setFilePreviews] = useState([]);
  // 🟢 Generate and store object URLs for preview
  useEffect(() => {
    const newPreviews = files.map(file => file instanceof File ? URL.createObjectURL(file) : file);
    setFilePreviews(newPreviews);

    // Cleanup: Revoke old object URLs when files change
    return () => {
      newPreviews.forEach((url, index) => { 
        if(files[index] instanceof File ){
          URL.revokeObjectURL(url)
        }
      });
    };
  }, [files]);
  // 🟢 Handle file selection via drag-and-drop OR file input
  const handleFiles = (selectedFiles) => {
    if (!selectedFiles) return;
    
    const newFiles = Array.from(selectedFiles)
    
    if (isMultiple) {
      const newArray = [...files, ...newFiles]
      setFiles(newArray);
    }else {
      setFiles(Array.from([newFiles[0]]));
    }
  };

  // 🟠 Handle drag-over (to allow dropping)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  // 🔴 Remove file and clean up URL
  const removeFile = (index) => {
    if (files[index] instanceof File) {
      URL.revokeObjectURL(filePreviews[index]);
    }

    const nextFiles = [...files];
    nextFiles.splice(index, 1);
    setFiles(nextFiles);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Drag & Drop Wrapper */}
      {((isMultiple) || (!isMultiple && files.length ==0)) &&
      (<div
        className="w-96 h-40 border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        "Drag & drop a file here or click to upload"
      </div>)
      }

      {/* Hidden File Input */}
      <input
        type="file"
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
        id="fileInput"
      />
      
      {/* Display uploaded file */}
      {files.length > 0 && (
        <div className="w-96 p-4 border border-gray-300">
          <h3 className="text-lg font-bold">Uploaded File</h3>
            <ul className="space-y-4">
              {files.map((file, index) => (
                <li key={index} className="relative">
                  <img
                    src={filePreviews[index]}
                    alt={`preview-${index}`}
                    className="w-full h-40 object-contain border border-gray-200 rounded"
                  />
                  <p className="text-sm text-gray-700 mt-1">{file.name}</p>
                  <ImCross 
                    className="-top-2 -right-2 absolute bg-white p-1 rounded-full shadow-md cursor-pointer w-5 h-5"
                    onClick={() => removeFile(index)} 
                  />
                </li>
              ))}
            </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

