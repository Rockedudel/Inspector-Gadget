import { useState } from "react";
import { StatusBadge, DataTable, ResultCard } from "../components/UIComponents";

const MOCK_REPORTS = [
  { id: "RPT-001", session: "Session #1042", date: "2024-12-15 14:30", agents: 5, status: "success" },
  { id: "RPT-002", session: "Session #1038", date: "2024-12-14 09:15", agents: 3, status: "success" },
  { id: "RPT-003", session: "Session #1035", date: "2024-12-13 16:45", agents: 5, status: "warning" },
];

const MOCK_SUMMARY = {
  session_id: "#1042",
  generated_at: "2024-12-15 14:32:00 UTC",
  agents: [
    { name: "Identification Agent", status: "success", summary: "Detected LockBit 3.0 with 94.2% confidence" },
    { name: "Memory Forensics Agent", status: "success", summary: "2 encryption keys extracted, 3 suspicious processes found" },
    { name: "Malware Analysis Agent", status: "success", summary: "Risk score 87/100, exploitable crypto flaws detected" },
    { name: "Decryptor Lookup Agent", status: "warning", summary: "No official decryptor available for LockBit 3.0" },
    { name: "Report Agent", status: "success", summary: "Full incident report generated" },
  ],
};

const reportColumns = [
  { key: "id", label: "Report ID" },
  { key: "session", label: "Session" },
  { key: "date", label: "Date" },
  { key: "agents", label: "Agents" },
  {
    key: "status",
    label: "Status",
    render: (val) => <StatusBadge status={val}>{val}</StatusBadge>,
  },
];

export default function ReportGenerator() {
  const [reports] = useState(MOCK_REPORTS);
  const [generating, setGenerating] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    setPreview(MOCK_SUMMARY);
    setGenerating(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-100">Report Generator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h2 className="text-sm font-semibold text-gray-200 mb-4">Generate New Report</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Session ID</label>
              <input
                type="text"
                placeholder="Enter session ID (e.g., #1042)"
                className="input-field w-full"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleGenerate}
                className="btn-primary"
                disabled={generating}
              >
                {generating ? "Generating..." : "Generate Report"}
              </button>
              <button className="btn-secondary">
                Export Markdown
              </button>
              <button className="btn-secondary">
                Export PDF
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-sm font-semibold text-gray-200 mb-3">Export Options</h2>
          <div className="space-y-2 text-xs text-gray-400">
            <div className="flex items-center gap-2 p-2 rounded bg-gray-800">
              <span className="text-cyber-400">MD</span>
              <span>Markdown (.md)</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-gray-800">
              <span className="text-red-400">PDF</span>
              <span>PDF Document (.pdf)</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-gray-800">
              <span className="text-green-400">JSON</span>
              <span>JSON Export (.json)</span>
            </div>
          </div>
        </div>
      </div>

      {preview && (
        <ResultCard title={`Report Preview – Session ${preview.session_id}`} icon="📄">
          <div className="space-y-3">
            <p className="text-[10px] text-gray-500">Generated: {preview.generated_at}</p>
            <div className="space-y-2">
              {preview.agents.map((agent, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-800 border border-gray-700"
                >
                  <StatusBadge status={agent.status}>
                    {agent.status === "success" ? "✓" : "!"}
                  </StatusBadge>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-200">{agent.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{agent.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ResultCard>
      )}

      <div className="card">
        <h2 className="text-sm font-semibold text-gray-200 mb-4">Previous Reports</h2>
        <DataTable columns={reportColumns} data={reports} />
      </div>
    </div>
  );
}
