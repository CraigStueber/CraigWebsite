import React from "react";
import { usePersona } from "../../context/chatbot/personaContext";
import { BotPersona } from "../../types/chatbot/persona";
import "./PersonaToggle.styles.css";

const PERSONA_LABELS: Record<BotPersona, string> = {
  fred: "About Craig",
  storyteller: "Story Mode",
  socratic: "Socratic Analyst",
};

export default function PersonaToggle() {
  const { persona, setPersona } = usePersona();

  function selectPersona(next: BotPersona) {
    if (next !== persona) {
      setPersona(next);
    }
  }

  return (
    <div className="persona-toggle">
      {(Object.keys(PERSONA_LABELS) as BotPersona[]).map((key) => (
        <button
          key={key}
          className={`persona-btn ${persona === key ? "active" : ""}`}
          onClick={() => selectPersona(key)}
          aria-pressed={persona === key}
        >
          {PERSONA_LABELS[key]}
        </button>
      ))}
    </div>
  );
}
