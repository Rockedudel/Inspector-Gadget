"""Agent for official decryptor intelligence lookups."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Mapping

from base_agent import AgentResult, BaseAgent


@dataclass(slots=True)
class DecryptorSourceEntry:
    """A trusted decryptor source record."""

    source: str
    family: str
    url: str


class DecryptorLookupAgent(BaseAgent):
    """Search trusted sources for known and legitimate decryptor utilities."""

    def __init__(self) -> None:
        super().__init__(name="DecryptorLookupAgent")
        self.known_tools: tuple[DecryptorSourceEntry, ...] = (
            DecryptorSourceEntry(
                source="NoMoreRansom",
                family="LockBit",
                url="https://www.nomoreransom.org/",
            ),
            DecryptorSourceEntry(
                source="CERT",
                family="Conti",
                url="https://www.cisa.gov/stopransomware",
            ),
            DecryptorSourceEntry(
                source="Kaspersky",
                family="Ryuk",
                url="https://www.kaspersky.com/resource-center/threats/ransomware",
            ),
        )

    def run(self, context: Mapping[str, Any]) -> AgentResult:
        family = str(context.get("detected_family") or "").strip()
        if not family:
            return self._success(
                summary="Decryptor lookup skipped because no ransomware family was identified.",
                findings=[],
            )

        matches = [
            {
                "source": entry.source,
                "family": entry.family,
                "url": entry.url,
            }
            for entry in self.known_tools
            if entry.family.lower() == family.lower()
        ]

        if not matches:
            return self._success(
                summary=f"No official decryptor references found for family '{family}'.",
                findings=[],
                metadata={"queried_family": family},
            )

        return self._success(
            summary=f"Found {len(matches)} trusted decryptor reference(s) for {family}.",
            findings=matches,
            metadata={"queried_family": family},
        )
