"""Core abstractions for OpenForensics-AI agents."""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any, Mapping


@dataclass(slots=True)
class AgentResult:
    """Standardized output object returned by every agent."""

    agent_name: str
    status: str
    summary: str
    findings: list[dict[str, Any]] = field(default_factory=list)
    errors: list[str] = field(default_factory=list)
    metadata: dict[str, Any] = field(default_factory=dict)


class BaseAgent(ABC):
    """Abstract base class for all OpenForensics-AI agents."""

    def __init__(self, name: str) -> None:
        self.name = name

    @abstractmethod
    def run(self, context: Mapping[str, Any]) -> AgentResult:
        """Execute the agent logic and return a standardized result."""

    def _success(
        self,
        summary: str,
        findings: list[dict[str, Any]] | None = None,
        metadata: dict[str, Any] | None = None,
    ) -> AgentResult:
        return AgentResult(
            agent_name=self.name,
            status="success",
            summary=summary,
            findings=findings or [],
            metadata=metadata or {},
        )

    def _failure(self, summary: str, errors: list[str] | None = None) -> AgentResult:
        return AgentResult(
            agent_name=self.name,
            status="failed",
            summary=summary,
            errors=errors or [],
        )
