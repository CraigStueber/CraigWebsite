import React, { useEffect, useRef } from "react";
import "./ChatMessageList.styles.css";
import ChatMessage from "./ChatMessage";
import { useChatState } from "../hooks/useChatState";
type Message = {
  role: "user" | "assistant";
  content: string;
};

interface ChatMessageListProps {
  messages: Message[];
  chatState: ReturnType<typeof useChatState>;
  setIsLoading: (val: boolean) => void;
}

export default function ChatMessageList({
  messages,
  chatState,
  setIsLoading,
}: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-message-list">
      {messages.map((msg, i) => (
        <ChatMessage
          key={i}
          role={msg.role}
          content={msg.content}
          chatState={chatState}
          setIsLoading={setIsLoading}
        />
      ))}

      <div ref={bottomRef}></div>
    </div>
  );
}
