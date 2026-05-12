import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/", label: "Dashboard", icon: "◈" },
  { path: "/ransomware", label: "Ransomware ID", icon: "⚠" },
  { path: "/ram-forensics", label: "RAM Forensics", icon: "⚡" },
  { path: "/malware", label: "Malware Analysis", icon: "☣" },
  { path: "/decryptor", label: "Decryptor Lookup", icon: "🔑" },
  { path: "/reports", label: "Reports", icon: "📄" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">
      <div className="p-5 border-b border-gray-800">
        <h1 className="text-lg font-bold text-cyber-400 tracking-wider">
          OpenForensics-AI
        </h1>
        <p className="text-xs text-gray-500 mt-1">Digital Forensics Dashboard</p>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 ${
                isActive
                  ? "bg-cyber-600/20 text-cyber-400 border border-cyber-600/30"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>System Online</span>
        </div>
      </div>
    </aside>
  );
}
