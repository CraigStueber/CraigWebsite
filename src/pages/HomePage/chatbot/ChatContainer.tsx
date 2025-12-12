import React, { useState } from "react";
import "./ChatContainer.styles.css";

import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";
import PresetQuestions from "./PresetQuestions";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi there! How can I help you today?" },
  ]);

  return (
    <div className="chat-container">
      <ChatMessageList messages={messages} />
      <PresetQuestions setMessages={setMessages} />
      <ChatInput messages={messages} setMessages={setMessages} />
    </div>
  );
}
