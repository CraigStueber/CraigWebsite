import React from "react";
import "./IntroText.styles.css";

export default function IntroText() {
  return (
    <div className="intro-text">
      <h1 className="intro-name">Craig Stueber</h1>
      <h2 className="intro-title">
        Applied AI Engineer • AI Architecture & Governance • PhD Candidate
      </h2>

      <p className="intro-description">
        I design and deploy production AI systems — evaluation pipelines,
        behavioral guardrails, and governance frameworks that make LLM-powered
        applications reliable at enterprise scale.
      </p>
    </div>
  );
}
