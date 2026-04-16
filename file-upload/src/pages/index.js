import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const { control, register, handleSubmit, formState: { errors } } = useForm();
  const [progress, setProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Submit handler
  const onSubmit = async (data) => {
    setIsUploading(true);
    setProgress(0);
    setUploadResult(null);

    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("name", data.name);

    try {
      // ✅ Connect to Express backend
      const response = await axios.post("http://localhost:8000/api/upload", formData, {
        onUploadProgress: (event) => {
          setProgress(Math.round((event.loaded * 100) / event.total));
        },
      });

      setUploadResult({ success: true, data: response.data });
    } catch (error) {
      setUploadResult({
        success: false,
        message: error.response?.data?.error || "Upload failed",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Dropzone component
  const Dropzone = ({ onDrop, disabled }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: (acceptedFiles) => {
        if (disabled) return; // ✅ prevent new uploads after success
        onDrop(acceptedFiles);
        if (acceptedFiles.length > 0) {
          const file = acceptedFiles[0];
          if (file.type.startsWith("image/")) {
            setFilePreview({ url: URL.createObjectURL(file), name: file.name, type: file.type });
          } else if (file.type === "application/pdf") {
            setFilePreview({ name: file.name, type: file.type });
          } else {
            setFilePreview(null);
          }
        }
      },
      multiple: false,
    });

    return (
      <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""} ${disabled ? "disabled" : ""}`}>
        <input {...getInputProps()} disabled={disabled} />
        <p>{disabled ? "Upload locked after success ✅" : "Drag & drop a file here, or click to select"}</p>
        {!disabled && <p className="hint">(Only JPEG, PNG, and PDF files under 5MB are accepted)</p>}
      </div>
    );
  };

  return (
    <div className="container">
      <h1>File Upload Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name field */}
        <div className="form-group">
          <label>Your Name:</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            disabled={uploadResult?.success}   // ✅ disable after success
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        {/* File field */}
        <div className="form-group">
          <label>Upload File:</label>
          <Controller
            name="file"
            control={control}
            rules={{ required: "File is required" }}
            render={({ field: { onChange } }) => (
              <Dropzone onDrop={(files) => onChange(files)} disabled={uploadResult?.success} />
            )}
          />
          {errors.file && <p className="error">{errors.file.message}</p>}
        </div>

        {/* Preview */}
        {filePreview && (
          <div className="preview">
            <h3>Preview:</h3>
            {filePreview.type?.startsWith("image/") ? (
              <img src={filePreview.url} alt={filePreview.name} />
            ) : (
              <p>📄 {filePreview.name}</p>
            )}
          </div>
        )}

        {/* Progress */}
        {progress > 0 && <p className="progress">Upload Progress: {progress}%</p>}

        {/* Submit button */}
        <button type="submit" disabled={isUploading || uploadResult?.success}>
          {uploadResult?.success ? "Uploaded ✅" : isUploading ? "Uploading..." : "Upload File"}
        </button>
      </form>

      {/* Result */}
      {uploadResult && (
        <div className={uploadResult.success ? "success" : "error"}>
          {uploadResult.success
            ? `✅ File uploaded successfully!`
            : `❌ ${uploadResult.message}`}
          {uploadResult.success && uploadResult.data?.filename && (
            <p className="text-sm mt-1">Uploaded as: {uploadResult.data.filename}</p>
          )}
        </div>
      )}
    </div>
  );
}
