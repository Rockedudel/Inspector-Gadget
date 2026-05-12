"""Agent for generating consolidated forensic reports."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import UTC, datetime
from typing import Any, Mapping

from base_agent import AgentResult, BaseAgent


@dataclass(slots=True)
class ReportConfig:
    """Configuration for report rendering."""

    output_format: str = "markdown"


class ReportAgent(BaseAgent):
    """Generate Markdown or PDF-formatted summaries from pipeline results."""

    def __init__(self, config: ReportConfig | None = None) -> None:
        super().__init__(name="ReportAgent")
        self.config = config or ReportConfig()

    def run(self, context: Mapping[str, Any]) -> AgentResult:
        agent_results = dict(context.get("agent_results", {}))
        markdown = self._build_markdown(agent_results)

        if self.config.output_format.lower() == "pdf":
            return self._success(
                summary="Report generated in PDF placeholder format.",
                findings=[
                    {
                        "format": "pdf",
                        "content_placeholder": markdown,
                        "note": "Replace with real PDF renderer integration.",
                    }
                ],
                metadata={"output_format": "pdf"},
            )

        return self._success(
            summary="Report generated in Markdown format.",
            findings=[{"format": "markdown", "content": markdown}],
            metadata={"output_format": "markdown"},
        )

    def _build_markdown(self, agent_results: Mapping[str, Any]) -> str:
        timestamp = datetime.now(tz=UTC).isoformat()
        lines = [
            "# OpenForensics-AI Investigation Report",
            "",
            f"Generated: {timestamp}",
            "",
        ]

        for agent_name, raw_result in agent_results.items():
            result = raw_result if isinstance(raw_result, AgentResult) else AgentResult(**raw_result)
            lines.extend(
                [
                    f"## {agent_name}",
                    f"Status: {result.status}",
                    f"Summary: {result.summary}",
                    "",
                ]
            )
            if result.findings:
                lines.append("Findings:")
                for finding in result.findings:
                    lines.append(f"- {finding}")
                lines.append("")
            if result.errors:
                lines.append("Errors:")
                for error in result.errors:
                    lines.append(f"- {error}")
                lines.append("")

        return "\n".join(lines).strip() + "\n"
