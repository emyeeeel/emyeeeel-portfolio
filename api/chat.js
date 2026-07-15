import { getChatReply } from "../server/chatService.js";

const MAX_MESSAGE_LENGTH = 300;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const message = typeof req.query.message === "string" ? req.query.message.trim() : "";
  if (!message) {
    res.status(400).json({ error: 'Missing "message" query parameter' });
    return;
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    res.status(400).json({ error: "Message too long" });
    return;
  }

  const sessionId = typeof req.query.sessionId === "string" ? req.query.sessionId : undefined;

  try {
    const reply = await getChatReply(message, sessionId);
    res.status(200).json({ reply });
  } catch (error) {
    console.error("chat api error:", error);
    res.status(502).json({ error: "Failed to get a reply" });
  }
}
