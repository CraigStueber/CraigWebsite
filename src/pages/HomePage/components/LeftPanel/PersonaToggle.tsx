import React from "react";
import { usePersona } from "../../context/chatbot/personaContext";
import { BotPersona } from "../../types/chatbot/persona";
import "./PersonaToggle.styles.css";

export default function PersonaToggle() {
  const { persona, setPersona } = usePersona();

  function selectPersona(next: BotPersona) {
    if (next !== persona) {
      setPersona(next);
    }
  }

  return (
    <div className="persona-toggle">
      <button
        className={`persona-btn ${persona === "fred" ? "active" : ""}`}
        onClick={() => selectPersona("fred")}
      >
        About Craig
      </button>

      <button
        className={`persona-btn ${persona === "storyteller" ? "active" : ""}`}
        onClick={() => selectPersona("storyteller")}
      >
        Story Mode
      </button>
    </div>
  );
}
