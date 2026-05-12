import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import RansomwareIdentification from "./pages/RansomwareIdentification";
import RamForensics from "./pages/RamForensics";
import MalwareAnalysis from "./pages/MalwareAnalysis";
import DecryptorLookup from "./pages/DecryptorLookup";
import ReportGenerator from "./pages/ReportGenerator";

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ransomware" element={<RansomwareIdentification />} />
            <Route path="/ram-forensics" element={<RamForensics />} />
            <Route path="/malware" element={<MalwareAnalysis />} />
            <Route path="/decryptor" element={<DecryptorLookup />} />
            <Route path="/reports" element={<ReportGenerator />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
