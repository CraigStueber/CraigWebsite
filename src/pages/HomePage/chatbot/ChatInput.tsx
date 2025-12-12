import React, { useState } from "react";
import "./ChatInput.styles.css";
import { usePersona } from "../context/chatbot/personaContext";
type Message = {
  role: "user" | "assistant";
  content: string;
};

interface ChatInputProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}
interface ChatResponse {
  role: "assistant";
  content: string;
}

export default function ChatInput({ messages, setMessages }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { persona } = usePersona();

  async function sendMessage() {
    if (!input.trim()) return;

    // Add the user's new message locally
    const userMessage: Message = { role: "user", content: input };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    setIsLoading(true);

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botType: persona, messages: newMessages }),
      });

      if (!res.ok) {
        throw new Error("Chat API error");
      }

      const data = (await res.json()) as ChatResponse;

      // Add assistant message to UI
      const assistantMessage: Message = {
        role: "assistant",
        content: data.content,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat error:", err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry — something went wrong reaching the server.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="chat-input-container">
      <textarea
        className="chat-input"
        placeholder={
          isLoading ? "Craig’s AI is thinking…" : "Type your message…"
        }
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
