/// <reference types="@cloudflare/workers-types" />

export interface Env {
  OPENAI_API_KEY: string;
  VECTORIZER: VectorizeIndex;
}
interface OpenAIEmbeddingResponse {
  data: { embedding: number[] }[];
}
interface UploadRequest {
  text: string;
  source: string; // e.g. "resume.pdf", "chapter1.txt"
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body = (await request.json()) as UploadRequest;

    const text = body.text?.trim();
    const source = body.source ?? "unknown";

    if (!text) {
      return new Response(JSON.stringify({ error: "No text provided" }), {
        status: 400,
      });
    }

    // 1. Generate embeddings
    const embedRes = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input: text,
      }),
    });

    // Tell TS what this is
    const embedJson =
      (await embedRes.json()) as Partial<OpenAIEmbeddingResponse>;

    // Extract embedding safely
    const vector = embedJson.data?.[0]?.embedding;

    if (!vector) {
      return new Response(
        JSON.stringify({
          error: "Embedding generation failed",
          details: embedJson,
        }),
        { status: 500 }
      );
    }

    //
    // 2. Insert into Vectorize index
    //
    await env.VECTORIZER.insert([
      {
        id: crypto.randomUUID(),
        values: vector,
        metadata: {
          text,
          source,
        },
      },
    ]);

    return new Response(JSON.stringify({ success: true, source }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.toString() }), {
      status: 500,
    });
  }
};
