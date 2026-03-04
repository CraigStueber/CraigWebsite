import React from "react";
import "./ChatbotIntro.styles.css";

export default function ChatbotIntro() {
  return (
    <div className="chatbot-intro">
      <h2 className="chatbot-intro-title">This site is a live AI system</h2>
      <p className="chatbot-intro-text">
        Three distinct agents. Structured behavioral guardrails. Vector search
        retrieval. Role-fit evaluation. Built and deployed by Craig as a
        demonstration of production AI architecture in practice.
      </p>
    </div>
  );
}
