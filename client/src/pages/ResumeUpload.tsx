import { uploadResume } from "@/API/resumeAPI";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

const ResumeUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState<string>("");
  const [uniqueFiles, setUniqueFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"], // Accept PDFs
    },
    multiple: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const uniqueFiles = files.filter(
      (file, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.name === file.name && t.size === file.size && t.type === file.type
        )
    );
    setUniqueFiles(uniqueFiles);
  }, [files]);

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("No files to upload!");
      return;
    }

    if (description.length === 0) {
      toast.error("Please write the job description!");
      return;
    }

    const formData = new FormData();
    uniqueFiles.forEach((file) => formData.append("resumes", file));

    console.log("Uploading files:", uniqueFiles);

    // 🔥 Job description bhi append karo
    formData.append("jobDescription", description);
    try {
      const response = await uploadResume(formData);
      if (response.success) {
        toast.success("Match Completed Successfully!");
      }
      navigate("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError
      console.log("error in resume upload ", axiosError);
    }
  };

  const handleUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFiles(files);
  };

  return (
    <div className="flex justify-center items-center h-screen mt-20">
      <div className="p-6 text-white rounded-xl w-full max-w-3xl mx-auto ">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-10 text-center rounded-lg ${
            isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-500"
          }`}
        >
          <div>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-lg">Drop the files here...</p>
            ) : (
              <p className="text-lg">
                Drag & drop some files here, or click to select files
              </p>
            )}
          </div>
          <div className="flex justify-center items-center mt-4">
            <span className="text-md">OR</span>
          </div>
          <div className="mt-4">
            <button
              onClick={() => inputRef.current?.click()}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Select Files
            </button>
            <input
              type="file"
              multiple
              accept=".pdf"
              ref={inputRef}
              className="hidden"
              onChange={handleUploadFiles}
            />
          </div>
        </div>
        {files?.length > 0 && (
          <div className="mt-4 flex justify-start items-start flex-col">
            <span className="text-lg">Total Files : {files?.length}</span>
            <span className="text-lg">
              Total Unique Files : {uniqueFiles?.length}
            </span>
          </div>
        )}
        <div className="mt-4">
          <textarea
            className="w-full h-60 p-4 text-white rounded-lg shadow-md border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
            placeholder="Write the job description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />{" "}
        </div>
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default ResumeUpload;
