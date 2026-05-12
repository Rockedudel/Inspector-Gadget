"""Pipeline orchestration for OpenForensics-AI agents."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Mapping

from base_agent import AgentResult, BaseAgent


@dataclass(slots=True)
class Pipeline:
    """Sequentially run agents and aggregate their results."""

    agents: list[BaseAgent] = field(default_factory=list)

    def run(self, initial_context: Mapping[str, Any] | None = None) -> dict[str, AgentResult]:
        context: dict[str, Any] = dict(initial_context or {})
        results: dict[str, AgentResult] = {}

        for agent in self.agents:
            result = agent.run(context)
            results[agent.name] = result
            context[agent.name] = result
            context["agent_results"] = results

            detected_family = result.metadata.get("detected_family") if result.metadata else None
            if detected_family:
                context["detected_family"] = detected_family

        return results
