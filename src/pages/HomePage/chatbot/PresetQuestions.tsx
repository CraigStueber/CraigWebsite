import React from "react";
import "./PresetQuestions.styles.css";
import { useChatState } from "../hooks/useChatState";
import { BotPersona } from "../types/chatbot/persona";

const PRESETS: Record<BotPersona, string[]> = {
  fred: [
    "What does Craig specialize in?",
    "Tell me about Craig's AI Ethics research",
    "What roles is Craig looking for next?",
  ],
  storyteller: [
    "I want a quiet, hopeful story",
    "Tell me an adventurous tale",
    "Something cozy by a fire",
  ],
  local_news: [
    "Give me a local news digest for Richmond, VA.",
    "What are the top local headlines in Fredericksburg, VA today?",
    "Any important weather alerts or city updates for Charlottesville, VA?",
  ],
};

interface PresetQuestionsProps {
  chatState: ReturnType<typeof useChatState>;
  persona: BotPersona;
  setIsLoading: (val: boolean) => void;
}

export default function PresetQuestions({
  chatState,
  persona,
  setIsLoading,
}: PresetQuestionsProps) {
  function handleClick(text: string) {
    chatState.sendUserMessage(persona, text, {
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    });
  }

  const presets = PRESETS[persona] ?? [];

  if (presets.length === 0) return null;

  return (
    <div className="preset-questions">
      {presets.map((q) => (
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
