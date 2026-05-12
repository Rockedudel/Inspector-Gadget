# Inspector-Gadget
🧠 OpenForensics‑AI
KI‑gestütztes Framework für digitale Forensik, Ransomware‑Analyse & Incident‑Response
📌 Kurzbeschreibung
OpenForensics‑AI ist ein modulares, agentenbasiertes Framework zur Analyse von Ransomware‑Vorfällen, RAM‑Forensik, Malware‑Klassifikation und automatisierten Incident‑Response‑Workflows.
Es dient Forensikern, Incident‑Response‑Teams, Ethical Hackern und Security‑Analysten, die KI‑gestützte Unterstützung bei der Analyse verschlüsselter Systeme benötigen.

Das Projekt entschlüsselt keine fremden Systeme und führt keine illegalen Aktionen aus.
Es unterstützt ausschließlich legitime Forensik‑ und IR‑Prozesse.

🚀 Features
Multi‑Agent‑Architektur (LLM‑basiert)

Automatische Ransomware‑Identifikation

RAM‑Forensik (Volatility‑Integration)

KI‑gestützte Malware‑Analyse

YARA‑Regel‑Generierung

Automatische Decryptor‑Suche (NoMoreRansom, CERT, Kaspersky)

Forensik‑Reports (Markdown/PDF)

Modular, erweiterbar, Docker‑fähig

Vollständig offline betreibbar (Ollama/Hermes/OpenClaw)

🧩 Architektur


Agentenübersicht
Identification Agent  
Klassifiziert Ransomware anhand von Artefakten, Extensions, Notizen, YARA‑Regeln.

Memory Forensics Agent  
Analysiert RAM‑Dumps, extrahiert Schlüssel, erkennt Prozesse.

Malware Analysis Agent  
LLM‑gestützte statische Analyse, Erkennung von Crypto‑Fehlern.

Decryptor Lookup Agent  
Prüft automatisch, ob ein offizieller Decryptor existiert.

Report Agent  
Erstellt vollständige Incident‑Reports.

📂 Projektstruktur
Code
openforensics-ai/
│
├── agents/
│   ├── identification_agent.py
│   ├── memory_agent.py
│   ├── malware_agent.py
│   ├── decryptor_agent.py
│   └── report_agent.py
│
├── core/
│   ├── pipeline.py
│   ├── utils.py
│   └── config.py
│
├── web/
│   ├── api.py
│   └── ui/
│
├── docs/
│   ├── architecture.md
│   ├── usage.md
│   └── ethics.md
│
└── README.md
🔧 Installation
Voraussetzungen
Python 3.10+

Docker (optional)

Volatility 3

YARA

Ollama / Hermes / OpenClaw (für KI‑Agenten)

Installation
Code
git clone https://github.com/<dein-user>/openforensics-ai
cd openforensics-ai
pip install -r requirements.txt
🛠️ Nutzung
1. Ransomware‑Identifikation
Code
python3 main.py --identify /pfad/zur/datei
2. RAM‑Forensik
Code
python3 main.py --memory dump.raw
3. Malware‑Analyse
Code
python3 main.py --analyze malware.exe
4. Decryptor‑Suche
Code
python3 main.py --decryptor malware_info.json
5. Report generieren
Code
python3 main.py --report session.json
🛡️ Sicherheit & Ethik
OpenForensics‑AI ist ausschließlich für:

Incident‑Response

Forensik

Forschung

Schulung

Pentesting mit offizieller Genehmigung

Das Projekt:

führt keine Exploits aus

enthält keine Malware

entschlüsselt keine fremden Systeme

respektiert gesetzliche Vorgaben

Siehe:
Ethics & Legal Policy

📜 Lizenz
MIT‑Lizenz – frei nutzbar für Forschung, Forensik und Bildung.

🤝 Mitwirken
Pull Requests sind willkommen!
Bitte beachte die Contribution Guidelines.

📣 Roadmap
[ ] Web‑Dashboard

[ ] Live‑Incident‑Monitoring

[ ] Offline‑KI‑Modelle optimieren

[ ] Erweiterte Crypto‑Fehler‑Analyse

[ ] Integration mit SIEM/SOC‑Systemen
