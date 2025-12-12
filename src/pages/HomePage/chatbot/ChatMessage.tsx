import React from "react";
import ReactMarkdown from "react-markdown";
import "./ChatMessage.styles.css";

import { usePersona } from "../context/chatbot/personaContext";
import { parseStoryChoices } from "../utils/parseStoryChoices";
import { useChatState } from "../hooks/useChatState";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  chatState: ReturnType<typeof useChatState>;
  setIsLoading: (val: boolean) => void;
}

export default function ChatMessage({
  role,
  content,
  chatState,
  setIsLoading,
}: ChatMessageProps) {
  const { persona } = usePersona();

  const isUser = role === "user";
  const isStoryteller = persona === "storyteller";

  const choices =
    role === "assistant" && isStoryteller ? parseStoryChoices(content) : [];

  function handleChoiceClick(choiceIndex: number) {
    chatState.sendUserMessage(persona, String(choiceIndex), {
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    });
  }

  return (
    <div className={`chat-message ${isUser ? "user" : "assistant"}`}>
      <div className="chat-bubble">
        <ReactMarkdown>{content}</ReactMarkdown>

        {choices.length > 0 && (
          <div className="story-choices">
            {choices.map((choice) => (
              <button
                key={choice.index}
                className="story-choice-btn"
                onClick={() => handleChoiceClick(choice.index)}
              >
                {choice.index}. {choice.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
