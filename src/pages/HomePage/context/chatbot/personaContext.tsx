import React, { createContext, useContext, useState } from "react";
import { BotPersona } from "../../types/chatbot/persona";

interface PersonaContextValue {
  persona: BotPersona;
  setPersona: (p: BotPersona) => void;
}

const PersonaContext = createContext<PersonaContextValue | undefined>(
  undefined
);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [persona, setPersona] = useState<BotPersona>("fred");

  return (
    <PersonaContext.Provider value={{ persona, setPersona }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const ctx = useContext(PersonaContext);
  if (!ctx) {
    throw new Error("usePersona must be used within a PersonaProvider");
  }
  return ctx;
}
