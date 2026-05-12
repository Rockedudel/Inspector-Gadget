import { useState } from "react";
import { StatusBadge, ResultCard } from "../components/UIComponents";

const MOCK_DECRYPTORS = {
  GandCrab: {
    available: true,
    tools: [
      { name: "NoMoreRansom – GandCrab Decryptor", url: "https://www.nomoreransom.org/en/decryption-tools.html" },
      { name: "Bitdefender GandCrab Decryptor", url: "https://labs.bitdefender.com/2019/02/new-gandcrab-v5-1-decryptor/" },
    ],
  },
  LockBit: {
    available: false,
    tools: [],
  },
  REvil: {
    available: true,
    tools: [
      { name: "Bitdefender REvil Decryptor", url: "https://www.bitdefender.com/blog/labs/bitdefender-offers-free-universal-decryptor-for-revil-sodinokibi-ransomware/" },
      { name: "Kaspersky RakhniDecryptor", url: "https://support.kaspersky.com/common/disinfection/10556" },
    ],
  },
};

export default function DecryptorLookup() {
  const [family, setFamily] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!family.trim()) return;
    setLoading(true);
    // Simulate API call: api.lookupDecryptor(family)
    await new Promise((r) => setTimeout(r, 1500));
    const mock = MOCK_DECRYPTORS[family] || { available: false, tools: [] };
    setResult({ family, ...mock });
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-100">Decryptor Lookup</h1>

      <div className="card">
        <h2 className="text-sm font-semibold text-gray-200 mb-4">Search for Decryptor</h2>
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            value={family}
            onChange={(e) => setFamily(e.target.value)}
            placeholder="Enter ransomware family name (e.g. GandCrab, REvil, LockBit)"
            className="input-field flex-1"
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Searching..." : "Lookup"}
          </button>
        </form>
        <div className="flex gap-2 mt-3">
          {Object.keys(MOCK_DECRYPTORS).map((name) => (
            <button
              key={name}
              onClick={() => setFamily(name)}
              className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-400 hover:text-cyber-400 hover:bg-gray-700 transition-colors border border-gray-700"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <ResultCard
          title={`Results for "${result.family}"`}
          icon="🔑"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">Decryptor Available:</span>
              <StatusBadge status={result.available ? "success" : "error"}>
                {result.available ? "Yes" : "No"}
              </StatusBadge>
            </div>

            {result.available && result.tools.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-2">Available Tools:</p>
                <div className="space-y-2">
                  {result.tools.map((tool, i) => (
                    <a
                      key={i}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-lg bg-gray-800 border border-gray-700 hover:border-cyber-600/40 transition-colors group"
                    >
                      <span className="text-cyber-400 group-hover:text-cyber-300">→</span>
                      <span className="text-xs text-gray-300 group-hover:text-gray-100">
                        {tool.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {!result.available && (
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <p className="text-xs text-gray-400 mb-2">
                  No official decryptor currently available. Try these resources:
                </p>
                <div className="space-y-1">
                  {[
                    { name: "NoMoreRansom Project", url: "https://www.nomoreransom.org" },
                    { name: "CERT/CC", url: "https://www.cert.org" },
                    { name: "Kaspersky No Ransom", url: "https://noransom.kaspersky.com" },
                    { name: "Europol – EC3", url: "https://www.europol.europa.eu/about-europol/european-cybercrime-centre-ec3" },
                  ].map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs text-cyber-400 hover:text-cyber-300 hover:underline"
                    >
                      {link.name} ↗
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ResultCard>
      )}
    </div>
  );
}
