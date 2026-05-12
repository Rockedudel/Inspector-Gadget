export function StatusBadge({ status, children }) {
  const styles = {
    success: "bg-green-500/15 text-green-400 border-green-500/30",
    warning: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    error: "bg-red-500/15 text-red-400 border-red-500/30",
    info: "bg-cyber-500/15 text-cyber-400 border-cyber-500/30",
    neutral: "bg-gray-500/15 text-gray-400 border-gray-500/30",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
        styles[status] || styles.neutral
      }`}
    >
      {children}
    </span>
  );
}

export function ProgressBar({ value, max = 100, label, color = "cyber" }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const barColors = {
    cyber: "bg-cyber-500",
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>{label}</span>
          <span>{pct.toFixed(0)}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColors[color] || barColors.cyber}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function DataTable({ columns, data, emptyMessage = "No data available" }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-gray-500">{emptyMessage}</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800/50">
          {data.map((row, i) => (
            <tr key={row.id || i} className="hover:bg-gray-800/30 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="py-2.5 px-3 text-gray-300">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ResultCard({ title, children, icon }) {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-3">
        {icon && <span className="text-cyber-400">{icon}</span>}
        <h3 className="text-sm font-semibold text-gray-200">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
}

export function StatCard({ label, value, icon, trend }) {
  return (
    <div className="card-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-100">{value}</p>
        </div>
        {icon && <span className="text-2xl text-cyber-400/60">{icon}</span>}
      </div>
      {trend && (
        <p className={`text-xs mt-2 ${trend > 0 ? "text-green-400" : "text-red-400"}`}>
          {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last period
        </p>
      )}
    </div>
  );
}

export function LiveLogPanel({ logs = [] }) {
  return (
    <div className="card max-h-64 overflow-y-auto">
      <h3 className="text-sm font-semibold text-gray-200 mb-3">Live Logs</h3>
      <div className="space-y-1 font-mono text-xs">
        {logs.length === 0 ? (
          <p className="text-gray-500">Waiting for events...</p>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-gray-600 shrink-0">{log.timestamp}</span>
              <span
                className={
                  log.level === "error"
                    ? "text-red-400"
                    : log.level === "warn"
                      ? "text-yellow-400"
                      : "text-gray-400"
                }
              >
                [{log.level?.toUpperCase() || "INFO"}]
              </span>
              <span className="text-gray-300">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
