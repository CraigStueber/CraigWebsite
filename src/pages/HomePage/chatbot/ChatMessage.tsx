import React from "react";
import ReactMarkdown from "react-markdown";
import "./ChatMessage.styles.css";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`chat-message ${isUser ? "user" : "assistant"}`}>
      <div className="chat-bubble">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
