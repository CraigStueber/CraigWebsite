export type BotPersona = "fred" | "storyteller" | "local_news";

export const PERSONA_WELCOME_MESSAGES: Record<BotPersona, string> = {
  fred: `Hi, I'm Fred — Craig's AI representative. Ask me about his production AI systems work, doctoral research in AI-generated code security, or his background in applied AI architecture and governance.`,

  storyteller: `Well now… before any tale can begin, there's something I ought to ask.

What sort of story are you hoping for today?

A grand adventure with swords and long roads?  
A quiet, cozy tale by firelight?  
Something dark and dangerous — or hopeful, even when things look grim?

Just say the word, and I'll walk with you wherever the story leads.`,

  local_news: `Local News Digest mode.

Tell me a city/region (for example: "Richmond, VA" or "Fredericksburg, VA"), and this agent will pull a short digest of recent local headlines with sources.

Try: "Give me a local news digest for Richmond, VA."`,
};
