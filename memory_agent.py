"""Agent for memory forensics workflows using RAM dump evidence."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Callable, Mapping

from base_agent import AgentResult, BaseAgent

VolatilityRunner = Callable[[str], dict[str, Any]]


@dataclass(slots=True)
class MemoryForensicsConfig:
    """Configuration for suspicious process and key extraction checks."""

    suspicious_process_keywords: tuple[str, ...] = (
        "vssadmin",
        "wbadmin",
        "bcdedit",
        "cipher",
        "powershell",
    )


class MemoryForensicsAgent(BaseAgent):
    """Analyze RAM artifacts and extract indicators relevant to decryption efforts."""

    def __init__(
        self,
        config: MemoryForensicsConfig | None = None,
        volatility_runner: VolatilityRunner | None = None,
    ) -> None:
        super().__init__(name="MemoryForensicsAgent")
        self.config = config or MemoryForensicsConfig()
        self.volatility_runner = volatility_runner

    def run(self, context: Mapping[str, Any]) -> AgentResult:
        findings: list[dict[str, Any]] = []

        ram_dump_path = context.get("ram_dump_path")
        if self.volatility_runner and ram_dump_path:
            try:
                volatility_output = self.volatility_runner(str(ram_dump_path))
                findings.append(
                    {
                        "source": "volatility",
                        "result": volatility_output,
                        "note": "Placeholder integration output.",
                    }
                )
            except Exception as exc:  # pragma: no cover - defensive branch
                return self._failure(
                    summary="Volatility integration failed.",
                    errors=[str(exc)],
                )

        process_list = [str(item).lower() for item in context.get("process_list", [])]
        suspicious_processes = [
            process
            for process in process_list
            if any(keyword in process for keyword in self.config.suspicious_process_keywords)
        ]
        if suspicious_processes:
            findings.append(
                {
                    "type": "suspicious_processes",
                    "processes": suspicious_processes,
                }
            )

        memory_strings = [str(item) for item in context.get("memory_strings", [])]
        candidate_keys = [line for line in memory_strings if "key=" in line.lower()]
        if candidate_keys:
            findings.append(
                {
                    "type": "candidate_decryption_keys",
                    "values": candidate_keys,
                    "quality": "unverified",
                }
            )

        return self._success(
            summary="Memory analysis complete.",
            findings=findings,
            metadata={
                "suspicious_process_count": len(suspicious_processes),
                "candidate_key_count": len(candidate_keys),
            },
        )
