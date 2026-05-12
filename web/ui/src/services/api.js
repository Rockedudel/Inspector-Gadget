const API_BASE = "/api/v1";

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || "API request failed");
  }

  return response.json();
}

function uploadFile(endpoint, file, additionalData = {}) {
  const formData = new FormData();
  formData.append("file", file);
  Object.entries(additionalData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    body: formData,
  }).then(async (res) => {
    if (!res.ok) {
      const error = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error(error.detail || "Upload failed");
    }
    return res.json();
  });
}

export const api = {
  // Dashboard
  getDashboardStats: () => request("/dashboard/stats"),
  getRecentAnalyses: () => request("/dashboard/recent"),
  getAlerts: () => request("/dashboard/alerts"),
  getSystemStatus: () => request("/system/status"),

  // Ransomware Identification
  identifyRansomware: (file) => uploadFile("/identify/upload", file),
  getIdentificationResult: (id) => request(`/identify/result/${id}`),

  // RAM Forensics
  analyzeMemoryDump: (file) => uploadFile("/memory/upload", file),
  getMemoryResult: (id) => request(`/memory/result/${id}`),
  getMemoryTimeline: (id) => request(`/memory/timeline/${id}`),

  // Malware Analysis
  analyzeMalware: (file) => uploadFile("/malware/upload", file),
  getMalwareResult: (id) => request(`/malware/result/${id}`),

  // Decryptor Lookup
  lookupDecryptor: (family) => request(`/decryptor/lookup?family=${encodeURIComponent(family)}`),

  // Reports
  generateReport: (sessionId) => request(`/report/generate/${sessionId}`, { method: "POST" }),
  downloadReport: (sessionId, format) =>
    `${API_BASE}/report/download/${sessionId}?format=${format}`,
  listReports: () => request("/report/list"),

  // Live Logs (WebSocket)
  connectLiveLogs: (onMessage) => {
    const wsUrl = `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${window.location.host}${API_BASE}/ws/logs`;
    const ws = new WebSocket(wsUrl);
    ws.onmessage = (event) => onMessage(JSON.parse(event.data));
    return ws;
  },
};
