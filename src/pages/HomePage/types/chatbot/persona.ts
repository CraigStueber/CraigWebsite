export type BotPersona = "fred" | "storyteller" | "socratic";

export const PERSONA_WELCOME_MESSAGES: Record<BotPersona, string> = {
  fred: `Hello — Fred can help explain Craig’s engineering background, AI ethics research, and professional experience. Feel free to ask about his work, projects, or research focus.`,

  storyteller: `Well now… before any tale can begin, there’s something I ought to ask.

What sort of story are you hoping for today?

A grand adventure with swords and long roads?  
A quiet, cozy tale by firelight?  
Something dark and dangerous — or hopeful, even when things look grim?

Just say the word, and I’ll walk with you wherever the story leads.`,
  socratic: `Hello. This mode is designed for careful thinking, not debate.

You can bring an idea, belief, or argument you’re wrestling with, and we’ll examine it together.

I’ll help clarify assumptions, explore counter-arguments, and surface tradeoffs — without trying to persuade or “win.”

If you’d like, start by sharing a claim or question you want to think through more clearly.`,
};
