// Proxies to an n8n webhook that owns the RAG/AI-agent logic. The webhook's
// last node ("Respond to Webhook") must return the answer synchronously —
// this call is a single request/response round trip, not a callback.
export async function getChatReply(userInput, sessionId) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error(
      "N8N_WEBHOOK_URL is not set. Add it to a local, gitignored .env file — never hardcode it or paste it into chat.",
    );
  }

  const url = new URL(webhookUrl);
  url.searchParams.set("message", userInput);
  if (sessionId) {
    url.searchParams.set("sessionId", sessionId);
  }

  const headers = {};
  const headerName = process.env.N8N_WEBHOOK_HEADER_NAME;
  const headerValue = process.env.N8N_WEBHOOK_HEADER_VALUE;
  if (headerName && headerValue) {
    headers[headerName] = headerValue;
  }

  let response;
  try {
    response = await fetch(url, { method: "GET", headers });
  } catch {
    throw new Error("Could not reach the n8n webhook — check N8N_WEBHOOK_URL and your connection.");
  }

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("n8n webhook rejected the request — check the header auth values.");
    }
    const body = await response.text().catch(() => "");
    throw new Error(`n8n webhook error (${response.status}): ${body.slice(0, 200)}`);
  }

  const raw = await response.text();
  let reply = raw;
  try {
    let data = JSON.parse(raw);
    if (Array.isArray(data)) data = data[0];
    if (data && typeof data === "object") {
      const source = data.json && typeof data.json === "object" ? data.json : data;
      reply = source.reply ?? source.answer ?? source.output ?? source.text ?? source.message ?? raw;
    }
  } catch {
    // plain-text response from n8n — use as-is
  }

  return (typeof reply === "string" && reply.trim()) || "...";
}
