import React, { useState } from "react";
import "./ChatInput.styles.css";

import { usePersona } from "../context/chatbot/personaContext";
import { useChatState } from "../hooks/useChatState";

export default function ChatInput({
  chatState,
  isLoading,
  setIsLoading,
}: {
  chatState: ReturnType<typeof useChatState>;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}) {
  const { persona } = usePersona();

  const [input, setInput] = useState("");

  async function sendMessage() {
    if (isLoading) return;
    if (!input.trim()) return;

    const message = input;
    setInput("");

    await chatState.sendUserMessage(persona, message, {
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    });
  }

  const loadingPlaceholder =
    persona === "storyteller"
      ? "The tale is unfolding…"
      : persona === "local_news"
      ? "Checking local headlines…"
      : "Fred is thinking…";

  return (
    <div className="chat-input-container">
      <textarea
        className="chat-input"
        placeholder={isLoading ? loadingPlaceholder : "Type your message…"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        rows={1}
        disabled={isLoading}
      />

      <button
        className="chat-send-btn"
        onClick={sendMessage}
        disabled={isLoading}
      >
        {isLoading ? "…" : "➤"}
      </button>
    </div>
  );
}
