import { useCallback, useState } from "react";

export default function UploadCard({ title, description, accept, onUpload, loading }) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      const file = e.dataTransfer.files?.[0];
      if (file) {
        setFileName(file.name);
        onUpload?.(file);
      }
    },
    [onUpload]
  );

  const handleChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        setFileName(file.name);
        onUpload?.(file);
      }
    },
    [onUpload]
  );

  return (
    <div className="card">
      <h3 className="text-sm font-semibold text-gray-200 mb-1">{title}</h3>
      {description && <p className="text-xs text-gray-500 mb-4">{description}</p>}

      <label
        className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${
          dragActive
            ? "border-cyber-500 bg-cyber-600/10"
            : "border-gray-700 hover:border-gray-600 bg-gray-800/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleChange}
          disabled={loading}
        />
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-cyber-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-gray-400">Analyzing...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center px-4">
            <span className="text-2xl text-gray-500">↑</span>
            <span className="text-xs text-gray-400">
              {fileName || "Drop file here or click to browse"}
            </span>
            {accept && (
              <span className="text-[10px] text-gray-600">{accept}</span>
            )}
          </div>
        )}
      </label>
    </div>
  );
}
