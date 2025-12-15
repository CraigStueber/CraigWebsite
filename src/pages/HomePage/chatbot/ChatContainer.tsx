import React from "react";
import "./ChatContainer.styles.css";

import { useChatState } from "../hooks/useChatState";
import { usePersona } from "../context/chatbot/personaContext";

import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";
import { PERSONA_WELCOME_MESSAGES } from "../types/chatbot/persona";
import { useEffect, useState } from "react";

import PresetQuestions from "./PresetQuestions";

export default function ChatContainer() {
  const { persona } = usePersona();
  const chatState = useChatState();
  const [isLoading, setIsLoading] = useState(false);

  const messages = chatState.getMessages(persona);

  useEffect(() => {
    chatState.ensureWelcomeMessage(persona, PERSONA_WELCOME_MESSAGES[persona]);
  }, [persona]);

  return (
    <div className="chat-container">
      <ChatMessageList
        messages={messages}
        chatState={chatState}
        setIsLoading={setIsLoading}
      />
      {messages.length === 1 && (
        <PresetQuestions
          chatState={chatState}
          persona={persona}
          setIsLoading={setIsLoading}
        />
      )}
      <ChatInput
        chatState={chatState}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}
