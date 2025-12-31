import React, { useState } from "react";
import "./RightPanel.styles.css";
import ChatbotIntro from "./ChatbotIntro";
import ChatContainer from "../../chatbot/ChatContainer";
import { usePersona } from "../../context/chatbot/personaContext";
import { BotPersona } from "../../types/chatbot/persona";

const PERSONA_LABELS: Record<BotPersona, string> = {
  fred: "About Craig",
  storyteller: "Story Mode",
  local_news: "Local News Digest",
};

export default function RightPanel() {
  const { persona, setPersona } = usePersona();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  function selectPersona(next: BotPersona) {
    if (next !== persona) {
      setPersona(next);
    }
    setShowPersonaMenu(false);
  }

  return (
    <div className="right-panel">
      <div className="mobile-header">
        <div className="mobile-header-left">
          <img src="/me/Avatar.png" alt="Craig" className="mobile-avatar" />
          <div className="mobile-identity">
            <div className="mobile-name">Craig Stueber</div>
            <div className="mobile-persona">{PERSONA_LABELS[persona]}</div>
          </div>
        </div>

        <button
          className="persona-mode-pill"
          onClick={() => setShowPersonaMenu((v) => !v)}
          aria-haspopup="true"
          aria-expanded={showPersonaMenu}
        >
          Switch mode
        </button>
      </div>

      {showPersonaMenu && (
        <div className="mobile-persona-menu">
          {(Object.keys(PERSONA_LABELS) as BotPersona[]).map((key) => (
            <button
              key={key}
              className={`mobile-persona-option ${
                persona === key ? "active" : ""
              }`}
              onClick={() => selectPersona(key)}
            >
              {PERSONA_LABELS[key]}
            </button>
          ))}
        </div>
      )}

      <ChatbotIntro />
      <ChatContainer />
    </div>
  );
}
