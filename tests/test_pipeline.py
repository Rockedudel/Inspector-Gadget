"""Focused tests for OpenForensics-AI pipeline scaffolding."""

from __future__ import annotations

import unittest

from decryptor_agent import DecryptorLookupAgent
from identification_agent import IdentificationAgent
from pipeline import Pipeline
from report_agent import ReportAgent


class PipelineTests(unittest.TestCase):
    def test_pipeline_flows_detected_family_to_lookup(self) -> None:
        pipeline = Pipeline(
            agents=[
                IdentificationAgent(),
                DecryptorLookupAgent(),
                ReportAgent(),
            ]
        )

        results = pipeline.run(
            {
                "artifacts": ["sample.lockbit"],
                "ransom_notes": ["restore-my-files.txt"],
            }
        )

        identification_result = results["IdentificationAgent"]
        self.assertEqual(identification_result.metadata["detected_family"], "LockBit")

        decryptor_result = results["DecryptorLookupAgent"]
        self.assertTrue(decryptor_result.findings)
        self.assertEqual(decryptor_result.findings[0]["source"], "NoMoreRansom")

    def test_report_agent_markdown_output(self) -> None:
        report_agent = ReportAgent()

        result = report_agent.run(
            {
                "agent_results": {
                    "IdentificationAgent": {
                        "agent_name": "IdentificationAgent",
                        "status": "success",
                        "summary": "Potential ransomware family identified: LockBit.",
                        "findings": [{"family": "LockBit"}],
                        "errors": [],
                        "metadata": {"detected_family": "LockBit"},
                    }
                }
            }
        )

        self.assertEqual(result.status, "success")
        self.assertEqual(result.metadata["output_format"], "markdown")
        self.assertIn("OpenForensics-AI Investigation Report", result.findings[0]["content"])


if __name__ == "__main__":
    unittest.main()
