export type BotPersona = "fred" | "storyteller" | "local_news";

export const PERSONA_WELCOME_MESSAGES: Record<BotPersona, string> = {
  fred: `Hello — Fred can help explain Craig’s engineering background, AI ethics research, and professional experience. Feel free to ask about his work, projects, or research focus.`,

  storyteller: `Well now… before any tale can begin, there’s something I ought to ask.

What sort of story are you hoping for today?

A grand adventure with swords and long roads?  
A quiet, cozy tale by firelight?  
Something dark and dangerous — or hopeful, even when things look grim?

Just say the word, and I’ll walk with you wherever the story leads.`,

  local_news: `Local News Digest mode.

Tell me a city/region (for example: “Richmond, VA” or “Fredericksburg, VA”), and this agent will pull a short digest of recent local headlines with sources.

Try: “Give me a local news digest for Richmond, VA.”`,
};
