import { useState } from "react";
import UploadCard from "../components/UploadCard";
import {
  StatusBadge,
  ProgressBar,
  ResultCard,
  DataTable,
} from "../components/UIComponents";

const MOCK_RESULT = {
  detected_family: "LockBit 3.0",
  confidence: 94.2,
  yara_matches: [
    { rule: "RansomNote_LockBit", severity: "high", description: "LockBit ransom note pattern detected" },
    { rule: "Crypto_AES256", severity: "medium", description: "AES-256 encryption routine identified" },
    { rule: "AntiDebug_Techniques", severity: "low", description: "Anti-debugging techniques present" },
  ],
  file_info: {
    name: "sample_001.exe",
    size: "2.4 MB",
    hash_sha256: "a1b2c3d4e5f6...deadbeef",
    type: "PE32 executable",
  },
};

const yaraColumns = [
  { key: "rule", label: "Rule Name" },
  {
    key: "severity",
    label: "Severity",
    render: (val) => (
      <StatusBadge status={val === "high" ? "error" : val === "medium" ? "warning" : "info"}>
        {val}
      </StatusBadge>
    ),
  },
  { key: "description", label: "Description" },
];

export default function RansomwareIdentification() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async (file) => {
    setLoading(true);
    // Simulate API call: api.identifyRansomware(file)
    await new Promise((r) => setTimeout(r, 2000));
    setResult(MOCK_RESULT);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-100">Ransomware Identification</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UploadCard
          title="Upload Suspicious File"
          description="Upload a binary, encrypted file, or ransom note for identification."
          accept=".exe,.dll,.bin,.dat,.txt,.html"
          onUpload={handleUpload}
          loading={loading}
        />

        {result && (
          <ResultCard title="Detection Result" icon="⚠">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Detected Family</span>
                <StatusBadge status="error">{result.detected_family}</StatusBadge>
              </div>
              <ProgressBar
                value={result.confidence}
                label="Confidence Score"
                color={result.confidence > 80 ? "red" : result.confidence > 50 ? "yellow" : "green"}
              />
              <div className="pt-2 border-t border-gray-800">
                <p className="text-xs text-gray-500 mb-2">File Info</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <span className="text-gray-500">Name:</span>
                  <span className="text-gray-300">{result.file_info.name}</span>
                  <span className="text-gray-500">Size:</span>
                  <span className="text-gray-300">{result.file_info.size}</span>
                  <span className="text-gray-500">Type:</span>
                  <span className="text-gray-300">{result.file_info.type}</span>
                  <span className="text-gray-500">SHA-256:</span>
                  <span className="text-gray-300 truncate">{result.file_info.hash_sha256}</span>
                </div>
              </div>
            </div>
          </ResultCard>
        )}
      </div>

      {result && (
        <div className="card">
          <h2 className="text-sm font-semibold text-gray-200 mb-4">YARA Matches</h2>
          <DataTable columns={yaraColumns} data={result.yara_matches} />
        </div>
      )}
    </div>
  );
}
