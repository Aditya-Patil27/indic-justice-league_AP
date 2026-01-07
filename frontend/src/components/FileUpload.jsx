import React, { useState } from "react";
import { uploadFiles } from "../services/api";

const FileUpload = ({ onFilesSelected }) => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleChange = (e) => {
    const inputFiles = e.target.files;
    handleFiles(inputFiles);
  };

  const handleFiles = (fileList) => {
    const validFiles = Array.from(fileList).filter(
      (file) =>
        file.type.startsWith("image/") ||
        file.type === "application/pdf" ||
        file.name.endsWith(".pdf")
    );

    if (validFiles.length > 0) {
      setFiles(validFiles);
      onFilesSelected?.(validFiles);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    try {
      setUploading(true);
      const result = await uploadFiles(files);
      setUploadedFiles(result.uploaded || []);
      setFiles([]);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <div
        className={`p-6 border-2 border-dashed rounded cursor-pointer transition ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <p className="text-lg font-medium">Drag and drop files here</p>
          <p className="text-sm text-gray-500">or click to select</p>
          <input
            type="file"
            multiple
            onChange={handleChange}
            accept=".pdf,image/*"
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
          >
            Select Files
          </label>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Selected Files ({files.length})</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="p-2 bg-gray-100 rounded">
                <span className="font-medium">{file.name}</span>
                <span className="text-gray-600 ml-2">
                  ({(file.size / 1024).toFixed(2)} KB)
                </span>
              </li>
            ))}
          </ul>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Files"}
          </button>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <h3 className="font-medium mb-2">Uploaded Successfully</h3>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index} className="text-sm">
                {file.filename}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
