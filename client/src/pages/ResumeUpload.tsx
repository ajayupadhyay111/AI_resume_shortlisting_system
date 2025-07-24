import { uploadResume } from "@/API/resumeAPI";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResumeUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState<string>("");
  const [uniqueFiles, setUniqueFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle file drop
  // This function is called when files are dropped into the dropzone
  const onDrop = (acceptedFiles: File[]) => {
    console.log("Accepted files:", acceptedFiles);
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"], // Accept PDFs
    },
    multiple: true,
    noClick: true, // disables default click
    noKeyboard: true, // disables default keyboard
  });

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    console.log("hello rendering");
    scrollToTop();
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
    scrollToTop();
    setIsLoading(true);

    if (files.length === 0) {
      alert("No files to upload!");
      return;
    }

    if (description.length === 0) {
      toast.error("Please write the job description!");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("resumes", file));

    // 🔥 Job description bhi append karo
    formData.append("jobDescription", description);
    try {
      const response = await uploadResume(formData);
      if (response.success) {
        toast.success("Match Completed Successfully!");
      }
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.log("error in resume upload ", error);
      toast.error(error.response?.data?.message || "Failed to upload resume");
      navigate("/pricing");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex items-center justify-center space-x-2">
          <span>Wait</span>
          <div className="border-b-2 rounded-full h-6 w-6 animate-spin"></div>
        </div>
      </div>
    );
  }

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFiles = Array.from(e.target.files || []);
  //   setFiles(selectedFiles);
  //   e.target.value = "";
  // };

  return (
    <div className="flex justify-center items-center h-screen mt-20">
      <div className="p-6 text-white rounded-xl w-full max-w-3xl mx-auto ">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-10 text-center rounded-lg ${
            isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-500"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-lg">Drop the files here...</p>
          ) : (
            <p className="text-lg">
              Drag & drop some files here, or click to select files
            </p>
          )}
          <div className="flex justify-center items-center mt-4">
            <span className="text-md">OR</span>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={open}
              className="px-6 py-3 bg-blue-500 text-white rounded-2xl shadow-md hover:bg-blue-600 active:scale-95 transition-all duration-200 ease-in-out"
            >
              Select File
            </button>
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
