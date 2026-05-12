import { useState, useEffect } from "react";
import {
  StatCard,
  StatusBadge,
  DataTable,
  LiveLogPanel,
} from "../components/UIComponents";

const MOCK_STATS = {
  totalAnalyses: 142,
  activeAgents: 5,
  alertsToday: 7,
  systemUptime: "99.8%",
};

const MOCK_RECENT = [
  { id: 1, name: "sample_001.exe", type: "Ransomware ID", status: "success", time: "2 min ago" },
  { id: 2, name: "memdump.raw", type: "RAM Forensics", status: "success", time: "15 min ago" },
  { id: 3, name: "trojan_x.bin", type: "Malware Analysis", status: "warning", time: "1 hr ago" },
  { id: 4, name: "cryptolocker.dat", type: "Decryptor Lookup", status: "info", time: "2 hrs ago" },
];

const MOCK_ALERTS = [
  { id: 1, severity: "error", message: "High-confidence ransomware detected: LockBit 3.0", time: "2 min ago" },
  { id: 2, severity: "warning", message: "Suspicious process found in memory dump: svchost_fake.exe", time: "15 min ago" },
  { id: 3, severity: "info", message: "Decryptor available for detected family: GandCrab v5.2", time: "1 hr ago" },
];

const MOCK_LOGS = [
  { timestamp: "19:42:01", level: "info", message: "Pipeline started for session #1042" },
  { timestamp: "19:42:03", level: "info", message: "Identification agent processing sample_001.exe" },
  { timestamp: "19:42:05", level: "warn", message: "YARA match: rule RansomNote_LockBit" },
  { timestamp: "19:42:06", level: "info", message: "Confidence score: 94.2%" },
  { timestamp: "19:42:08", level: "error", message: "Memory agent: access denied to protected region 0x7FFE0000" },
];

const recentColumns = [
  { key: "name", label: "File" },
  { key: "type", label: "Analysis Type" },
  {
    key: "status",
    label: "Status",
    render: (val) => <StatusBadge status={val}>{val}</StatusBadge>,
  },
  { key: "time", label: "Time" },
];

export default function Dashboard() {
  const [stats] = useState(MOCK_STATS);
  const [recent] = useState(MOCK_RECENT);
  const [alerts] = useState(MOCK_ALERTS);
  const [logs] = useState(MOCK_LOGS);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-100">Dashboard Overview</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Analyses" value={stats.totalAnalyses} icon="◈" trend={12} />
        <StatCard label="Active Agents" value={stats.activeAgents} icon="⚡" />
        <StatCard label="Alerts Today" value={stats.alertsToday} icon="⚠" trend={-5} />
        <StatCard label="System Uptime" value={stats.systemUptime} icon="♦" />
      </div>

      {/* Recent Analyses */}
      <div className="card">
        <h2 className="text-sm font-semibold text-gray-200 mb-4">Recent Analyses</h2>
        <DataTable columns={recentColumns} data={recent} />
      </div>

      {/* Alerts & Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="text-sm font-semibold text-gray-200 mb-4">Alerts & Findings</h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  alert.severity === "error"
                    ? "border-red-500/20 bg-red-500/5"
                    : alert.severity === "warning"
                      ? "border-yellow-500/20 bg-yellow-500/5"
                      : "border-cyber-500/20 bg-cyber-500/5"
                }`}
              >
                <StatusBadge status={alert.severity}>
                  {alert.severity.toUpperCase()}
                </StatusBadge>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-300">{alert.message}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <LiveLogPanel logs={logs} />
      </div>
    </div>
  );
}
