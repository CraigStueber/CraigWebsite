import { useState } from "react";
import { BotPersona } from "../types/chatbot/persona";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};
type ChatResponse = {
  role: "assistant";
  content: string;
};

type MessagesByPersona = Record<BotPersona, ChatMessage[]>;

export function useChatState() {
  const [messagesByPersona, setMessagesByPersona] = useState<MessagesByPersona>(
    {
      fred: [],
      storyteller: [],
      socratic: [],
    }
  );

  function getMessages(persona: BotPersona): ChatMessage[] {
    return messagesByPersona[persona] ?? [];
  }

  function setMessages(persona: BotPersona, messages: ChatMessage[]) {
    setMessagesByPersona((prev) => ({
      ...prev,
      [persona]: messages,
    }));
  }
  function ensureWelcomeMessage(persona: BotPersona, welcomeMessage: string) {
    setMessagesByPersona((prev) => {
      if (prev[persona].length > 0) return prev;

      return {
        ...prev,
        [persona]: [
          {
            role: "assistant",
            content: welcomeMessage,
          },
        ],
      };
    });
  }

  function appendMessage(persona: BotPersona, message: ChatMessage) {
    setMessagesByPersona((prev) => ({
      ...prev,
      [persona]: [...prev[persona], message],
    }));
  }

  function clearMessages(persona: BotPersona) {
    setMessagesByPersona((prev) => ({
      ...prev,
      [persona]: [],
    }));
  }
  async function sendUserMessage(
    persona: BotPersona,
    content: string,
    options?: {
      onStart?: () => void;
      onFinish?: () => void;
      onError?: (err: unknown) => void;
    }
  ) {
    const userMessage: ChatMessage = { role: "user", content };

    const outgoingMessages = [
      ...(messagesByPersona[persona] ?? []),
      userMessage,
    ];

    setMessages(persona, outgoingMessages);

    options?.onStart?.();

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          botType: persona,
          messages: outgoingMessages,
        }),
      });

      if (!res.ok) throw new Error("Chat API error");

      const data = (await res.json()) as ChatResponse;

      appendMessage(persona, {
        role: "assistant",
        content: data.content,
      });
    } catch (err) {
      appendMessage(persona, {
        role: "assistant",
        content: "Sorry — something went wrong.",
      });
      options?.onError?.(err);
    } finally {
      options?.onFinish?.();
    }
  }

  return {
    getMessages,
    setMessages,
    appendMessage,
    clearMessages,
    ensureWelcomeMessage,
    sendUserMessage,
  };
}
