import { useState } from "react";
import UploadCard from "../components/UploadCard";
import {
  StatusBadge,
  ResultCard,
  DataTable,
} from "../components/UIComponents";

const MOCK_RESULT = {
  keys_found: [
    { id: 1, algorithm: "AES-256-CBC", key_hex: "4a6f686e...44656572", location: "0x7FFE4200", confidence: "high" },
    { id: 2, algorithm: "RSA-2048", key_hex: "30820122...010001", location: "0x00AF1000", confidence: "medium" },
  ],
  suspicious_processes: [
    { id: 1, pid: 4812, name: "svchost_fake.exe", ppid: 1024, cmd: "C:\\Windows\\Temp\\svchost_fake.exe --encrypt", risk: "high" },
    { id: 2, pid: 6220, name: "powershell.exe", ppid: 4812, cmd: "powershell -enc ZW5jb2Rl...", risk: "medium" },
    { id: 3, pid: 1100, name: "cmd.exe", ppid: 4812, cmd: "cmd /c vssadmin delete shadows /all", risk: "high" },
  ],
  timeline: [
    { time: "14:02:31", event: "Process svchost_fake.exe created (PID 4812)", type: "process" },
    { time: "14:02:33", event: "Network connection to 185.220.101.x:443", type: "network" },
    { time: "14:02:35", event: "File encryption started in C:\\Users\\", type: "file" },
    { time: "14:02:40", event: "VSS shadow copies deleted", type: "system" },
    { time: "14:03:01", event: "Ransom note dropped: README_RESTORE.txt", type: "file" },
    { time: "14:03:05", event: "Registry persistence key added", type: "registry" },
  ],
};

const keyColumns = [
  { key: "algorithm", label: "Algorithm" },
  { key: "key_hex", label: "Key (Hex)" },
  { key: "location", label: "Memory Address" },
  {
    key: "confidence",
    label: "Confidence",
    render: (val) => (
      <StatusBadge status={val === "high" ? "success" : val === "medium" ? "warning" : "info"}>
        {val}
      </StatusBadge>
    ),
  },
];

const processColumns = [
  { key: "pid", label: "PID" },
  { key: "name", label: "Process" },
  { key: "ppid", label: "Parent PID" },
  { key: "cmd", label: "Command Line" },
  {
    key: "risk",
    label: "Risk",
    render: (val) => (
      <StatusBadge status={val === "high" ? "error" : "warning"}>{val}</StatusBadge>
    ),
  },
];

const eventTypeColors = {
  process: "text-cyber-400",
  network: "text-yellow-400",
  file: "text-red-400",
  system: "text-purple-400",
  registry: "text-orange-400",
};

export default function RamForensics() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async (file) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 3000));
    setResult(MOCK_RESULT);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-100">RAM Forensics</h1>

      <UploadCard
        title="Upload Memory Dump"
        description="Upload a RAM dump (.raw, .dmp, .vmem) for forensic analysis."
        accept=".raw,.dmp,.vmem,.mem"
        onUpload={handleUpload}
        loading={loading}
      />

      {result && (
        <>
          <div className="card">
            <h2 className="text-sm font-semibold text-gray-200 mb-4">Extracted Encryption Keys</h2>
            <DataTable columns={keyColumns} data={result.keys_found} />
          </div>

          <div className="card">
            <h2 className="text-sm font-semibold text-gray-200 mb-4">Suspicious Processes</h2>
            <DataTable columns={processColumns} data={result.suspicious_processes} />
          </div>

          <div className="card">
            <h2 className="text-sm font-semibold text-gray-200 mb-4">Event Timeline</h2>
            <div className="relative pl-6 space-y-4">
              <div className="absolute left-2 top-1 bottom-1 w-px bg-gray-700" />
              {result.timeline.map((event, i) => (
                <div key={i} className="relative flex items-start gap-3">
                  <div className="absolute left-[-16px] top-1.5 w-2 h-2 rounded-full bg-cyber-500 ring-2 ring-gray-900" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-500">{event.time}</span>
                      <span className={`text-[10px] uppercase font-medium ${eventTypeColors[event.type] || "text-gray-400"}`}>
                        {event.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 mt-0.5">{event.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
