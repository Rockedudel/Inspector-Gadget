import { useState, useEffect } from "react";

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-medium text-gray-300">
          Incident Response Console
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-xs">
          <StatusDot label="API" status="online" />
          <StatusDot label="Agents" status="online" />
          <StatusDot label="LLM" status="idle" />
        </div>
        <div className="text-xs text-gray-500 font-mono tabular-nums">
          {time.toLocaleTimeString("en-US", { hour12: false })}
        </div>
      </div>
    </header>
  );
}

function StatusDot({ label, status }) {
  const colors = {
    online: "bg-green-500",
    offline: "bg-red-500",
    idle: "bg-yellow-500",
    error: "bg-red-500",
  };

  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-1.5 h-1.5 rounded-full ${colors[status] || "bg-gray-500"}`} />
      <span className="text-gray-400">{label}</span>
    </div>
  );
}
