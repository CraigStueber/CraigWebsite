import React from "react";
import "./IntroText.styles.css";

export default function IntroText() {
  return (
    <div className="intro-text">
      <h1 className="intro-name">Craig Stueber</h1>
      <h2 className="intro-title">Applied AI Engineer • PhD Candidate</h2>
      <p className="intro-description">
        Craig designs and deploys production AI systems; evaluation pipelines,
        behavioral guardrails, and governance frameworks for enterprise-scale
        LLM applications.
      </p>
    </div>
  );
}
