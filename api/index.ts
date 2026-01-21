export interface Env {
  AMBIGUITY_API_URL: string;
  AMBIGUITY_API_KEY: string;
}

function corsHeaders(origin: string | null) {
  const allowed = new Set([
    "https://craigstueber.com",
    "http://localhost:5173",
    "http://localhost:3000",
  ]);

  const o = origin && allowed.has(origin) ? origin : "https://craigstueber.com";

  return {
    "Access-Control-Allow-Origin": o,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
    Vary: "Origin",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== "/api/ambiguity") {
      return new Response("Not Found", { status: 404 });
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request.headers.get("Origin")),
      });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: corsHeaders(request.headers.get("Origin")),
      });
    }

    const mode = url.searchParams.get("mode") ?? "sse";
    const targetPath = mode === "json" ? "/run-json" : "/run";
    const targetUrl = `${env.AMBIGUITY_API_URL}${targetPath}`;

    const bodyText = await request.text();

    const upstream = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.AMBIGUITY_API_KEY,
      },
      body: bodyText,
    });

    const headers = new Headers(upstream.headers);

    if (mode !== "json") {
      headers.set("Content-Type", "text/event-stream");
      headers.set("Cache-Control", "no-cache");
      headers.set("Connection", "keep-alive");
    }

    const cors = corsHeaders(request.headers.get("Origin"));
    Object.entries(cors).forEach(([k, v]) => headers.set(k, v));

    return new Response(upstream.body, { status: upstream.status, headers });
  },
};
