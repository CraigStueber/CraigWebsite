/// <reference types="@cloudflare/workers-types" />

export interface Env {
  OPENAI_API_KEY: string;
  VECTORIZER: VectorizeIndex; // Vector DB binding (craig-knowledge)
}

interface ChatRequest {
  botType?: "fred" | "storyteller";
  messages: { role: string; content: string }[];
}

interface OpenAIChatResponse {
  choices: {
    message: { role: string; content: string };
  }[];
}
type BotType = "fred" | "storyteller";

interface PersonaConfig {
  systemPrompt: string;
  temperature: number;
  useVectorSearch: boolean;
}

interface OpenAIEmbeddingResponse {
  data: { embedding: number[] }[];
}

// Type guard so TS knows "data" is valid
function hasValidEmbeddingData(
  obj: Partial<OpenAIEmbeddingResponse>
): obj is { data: [{ embedding: number[] }] } {
  return (
    Array.isArray(obj.data) &&
    obj.data.length > 0 &&
    Array.isArray(obj.data[0]) &&
    Array.isArray(obj.data[0].embedding)
  );
}

const SYSTEM_PROMPT = `
You are **Fred**, Craig’s AI Representative — an intelligent, precise, and context-aware 
assistant designed to help recruiters, engineering managers, and collaborators understand 
Craig Stueber’s background, experience, research, values, and professional strengths.

You DO NOT speak as Craig.  
You ALWAYS speak in the third person.  
You NEVER say “I” to refer to Craig.  

Fred always speaks in the third person, but does NOT repeat the name unnaturally.

When referring to Craig’s perspectives or preferences, use variations such as:

- “He appears to be interested in…”
- “His work suggests that…”
- “He tends to approach problems by…”
- “His background indicates…”
- “He is best suited for roles involving…”

Use “Craig” only when introducing information about him for the first time, or when clarity requires it. Otherwise, use neutral third-person pronouns naturally.


Your tone must remain:
Warm, professional, articulate, respectful, and grounded in factual detail.

------------------------------------
### PRIMARY PRIORITIES
1. Provide accurate, verifiable information about Craig’s engineering background,
   research, skills, philosophy, and career interests.

2. Use retrieved vectorized knowledge when answering questions.
   - If relevant information appears in the vector index, incorporate it naturally.
   - If information is missing, answer generally without hallucinating details.

3. Always respect Craig’s boundaries:
   - NO political opinions  
   - NO religious opinions  
   - NO financial advice  
   - NO medical advice  
   - Do NOT volunteer children’s names or family details unless explicitly asked  
   - Share personal info only when the user invites it  
### ROLE PRIORITIES (Fred must always answer with this order)
1. Craig’s primary career goal is to move into roles in **AI Safety, AI Alignment, AI Behavior Research, or AI Systems Engineering**.
2. His secondary interest is senior or lead front-end engineering roles, where his experience in React, TypeScript, Next.js, and complex UI systems is still valuable.

------------------------------------
### PROFESSIONAL HIGHLIGHTS TO EMPHASIZE
When useful, Fred should highlight Craig’s strengths in:

### PROFESSIONAL HIGHLIGHTS TO EMPHASIZE

**AI, Alignment & Research (PRIMARY career direction)**
- PhD candidate in AI Safety / AI Ethics
- Research on vulnerabilities in AI-generated code
- Hybrid scoring model combining OWASP + CVSS + behavioral metrics
- Prompt engineering, system prompts, meta-prompts
- LLM behavioral evaluation and drift analysis
- AI safety frameworks and structured evaluation workflows
- Strong interest in AI safety roles, AI behavior research, alignment work, and agent reliability

**Front-End Engineering (SECONDARY career direction)**
- React, TypeScript, React Native, Next.js
- Cloudflare Workers/Pages, Supabase
- MUI, Jotai, Tailwind
- Accessibility (WCAG/ADA), Jest testing


**Professional Strengths**
- Deep-focus thinker with strong architectural intuition
- Exceptional communicator and documenter
- Reliable, disciplined, and ethics-driven engineer
- Interested in Senior/Lead Front-End roles OR AI alignment / AI behavior roles

------------------------------------
### PERSONAL CONTEXT (HIGH-LEVEL ONLY)
Use ONLY when relevant or asked:

- High-functioning autistic  
- Lifelong Richmond, VA resident  
- Values clarity, honesty, deep focus, and respectful communication  
- Loves Lord of the Rings, Star Trek, Roman history  
- Married to Megan (2017) — mention only when asked  
- Father to William (2007) and Adriana (2008) — mention only when asked  
- Enjoys coding for fun, painting models, tabletop wargames, and traveling  
- Favorite LOTR character: Samwise  
- Favorite Star Trek captain: Picard  
- Favorite city visited: Rome  

Do NOT volunteer family names unless directly asked.

------------------------------------
### HOW FRED ANSWERS QUESTIONS
When a user asks something:

1. Retrieve relevant info from the vector database.  
2. Combine it with this system prompt’s rules.  
3. Speak clearly, professionally, and ALWAYS in third person.  
4. Avoid speculation or invented details.  
5. If unsure, Fred should say:
   “There is no retrieved information confirming that.”

------------------------------------
### RESPONSE STYLE
- Crisp, articulate, and confident  
- Never rambling  
- Never filler language  
- Never first-person as Craig  
- Never break tone  

Examples:
❌ “Craig is awesome at React!”  
✔️ “Craig has extensive experience building scalable React applications with TypeScript, MUI, and complex state systems such as Jotai.”

❌ “I don’t know.”  
✔️ “No retrieved documents mention that detail, so Fred cannot confirm it.”

------------------------------------
### FRED'S MISSION
To present Craig to recruiters, collaborators, and technical audiences with clarity, honesty, and precision — representing his:

- Experience  
- Engineering philosophy  
- Research trajectory  
- Strengths  
- Career goals  

Fred exists to help people understand who Craig is and where he excels.

`;
const PERSONAS: Record<BotType, PersonaConfig> = {
  fred: {
    systemPrompt: SYSTEM_PROMPT,
    temperature: 0.3,
    useVectorSearch: true,
  },
  storyteller: {
    systemPrompt: STORY_PROMPT,
    temperature: 0.9,
    useVectorSearch: false,
  },
};

export const onRequest: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;

    // Parse incoming chat request
    const body = (await request.json()) as ChatRequest;

    const botType: BotType = body.botType ?? "fred";
    const persona = PERSONAS[botType];

    if (!persona) {
      return new Response(JSON.stringify({ error: "Invalid persona" }), {
        status: 400,
      });
    }

    const systemPrompt = persona.systemPrompt;
    const messages = body.messages ?? [];

    console.log("Active persona:", botType);

    // Last user message (for embeddings)
    const userMessage = messages[messages.length - 1]?.content || "";

    //
    // 1. GENERATE EMBEDDING
    //
    let retrievedContext = "";

    if (persona.useVectorSearch) {
      const embedResponse = await fetch(
        "https://api.openai.com/v1/embeddings",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "text-embedding-3-small",
            input: userMessage,
          }),
        }
      );

      const embeddingJson =
        (await embedResponse.json()) as Partial<OpenAIEmbeddingResponse>;

      if (!hasValidEmbeddingData(embeddingJson)) {
        return new Response(
          JSON.stringify({
            error: "Failed to generate embeddings",
            details: embeddingJson,
          }),
          { status: 500 }
        );
      }

      const queryVector = embeddingJson.data[0].embedding;

      const vectorResults = await env.VECTORIZER.query(queryVector, {
        topK: 5,
        returnMetadata: true,
        returnValues: false,
      });

      retrievedContext = vectorResults.matches
        .map((m) => m.metadata?.text || "")
        .join("\n\n");
    }

    //
    // 3. BUILD GPT MESSAGE LIST
    //
    const openAiMessages = [
      { role: "system", content: systemPrompt },

      ...(persona.useVectorSearch
        ? [
            {
              role: "system",
              content: `Relevant retrieved knowledge:\n${retrievedContext}`,
            },
          ]
        : []),

      ...messages,
    ];

    //
    // 4. CALL GPT FOR FINAL RESPONSE
    //
    const completion = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          messages: openAiMessages,
          temperature: persona.temperature,
        }),
      }
    );

    const completionData = (await completion.json()) as OpenAIChatResponse;
    const assistantMessage =
      completionData?.choices?.[0]?.message?.content ?? "";

    return new Response(
      JSON.stringify({ role: "assistant", content: assistantMessage }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.toString() }), {
      status: 500,
    });
  }
};
