"""Agent for ransomware family identification from forensic artifacts."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Callable, Mapping

from base_agent import AgentResult, BaseAgent

ClassifierHook = Callable[[dict[str, Any]], str | None]


@dataclass(slots=True)
class IdentificationConfig:
    """Configuration for ransomware family identification."""

    extension_families: dict[str, str]
    ransom_note_families: dict[str, str]


class IdentificationAgent(BaseAgent):
    """Detect ransomware families with patterns, notes, and optional LLM classification."""

    def __init__(
        self,
        config: IdentificationConfig | None = None,
        llm_classifier: ClassifierHook | None = None,
    ) -> None:
        super().__init__(name="IdentificationAgent")
        self.config = config or IdentificationConfig(
            extension_families={
                ".lockbit": "LockBit",
                ".conti": "Conti",
                ".ryuk": "Ryuk",
            },
            ransom_note_families={
                "restore-my-files": "LockBit",
                "how_to_decrypt": "Conti",
                "readme_for_decrypt": "Ryuk",
            },
        )
        self.llm_classifier = llm_classifier

    def run(self, context: Mapping[str, Any]) -> AgentResult:
        artifacts = [str(item).lower() for item in context.get("artifacts", [])]
        ransom_notes = [str(item).lower() for item in context.get("ransom_notes", [])]

        detected_families: dict[str, str] = {}
        findings: list[dict[str, Any]] = []

        for artifact in artifacts:
            for extension, family in self.config.extension_families.items():
                if artifact.endswith(extension):
                    detected_families[family] = "extension-pattern"
                    findings.append(
                        {
                            "artifact": artifact,
                            "family": family,
                            "method": "file-extension",
                        }
                    )

        for note in ransom_notes:
            for note_indicator, family in self.config.ransom_note_families.items():
                if note_indicator in note:
                    detected_families[family] = "ransom-note-pattern"
                    findings.append(
                        {
                            "note": note,
                            "family": family,
                            "method": "ransom-note",
                        }
                    )

        if self.llm_classifier:
            llm_family = self.llm_classifier(
                {"artifacts": artifacts, "ransom_notes": ransom_notes}
            )
            if llm_family:
                detected_families[llm_family] = "llm-classification"
                findings.append(
                    {
                        "family": llm_family,
                        "method": "llm",
                        "confidence": "placeholder",
                    }
                )

        if not detected_families:
            return self._success(
                summary="No ransomware family confidently identified.",
                findings=[],
                metadata={"detected_family": None},
            )

        selected_family = sorted(detected_families.keys())[0]
        return self._success(
            summary=f"Potential ransomware family identified: {selected_family}.",
            findings=findings,
            metadata={
                "detected_family": selected_family,
                "all_candidates": sorted(detected_families.keys()),
            },
        )
