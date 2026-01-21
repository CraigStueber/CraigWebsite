type TraceEvent = {
  type: string;
  node?: string;
  data?: any;
};

export async function runAmbiguitySSE(
  input: { user_input: string; mode?: string },
  onEvent: (e: TraceEvent) => void
) {
  const res = await fetch("/api/ambiguity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_input: input.user_input,
      mode: input.mode ?? "thorough",
    }),
  });

  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed: ${res.status} ${text}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // SSE events are separated by blank lines
    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";

    for (const part of parts) {
      // We only care about "data: ..."
      const line = part.split("\n").find((l) => l.startsWith("data: "));
      if (!line) continue;

      const json = line.replace(/^data:\s*/, "");
      try {
        const evt = JSON.parse(json);
        onEvent(evt);
      } catch {
        // ignore malformed chunks
      }
    }
  }
}
