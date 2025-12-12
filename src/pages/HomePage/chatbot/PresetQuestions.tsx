import React from "react";
import "./PresetQuestions.styles.css";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface PresetQuestionsProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const PRESETS = [
  "What does Craig specialize in?",
  "Show me Craig's resume",
  "Tell me about Craig's AI Ethics research",
  "What roles is Craig looking for next?",
];

export default function PresetQuestions({ setMessages }: PresetQuestionsProps) {
  function handleClick(text: string) {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
  }

  return (
    <div className="preset-questions">
      {PRESETS.map((q) => (
        <button
          key={q}
          className="preset-question"
          onClick={() => handleClick(q)}
        >
          {q}
        </button>
      ))}
    </div>
  );
}
