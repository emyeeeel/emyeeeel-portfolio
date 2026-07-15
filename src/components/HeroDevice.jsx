import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroDevice.css";

const SESSION_KEY = "emyeeeel-terminal-session";

// One id per browser session, so n8n's Session Memory node can key
// conversation history — without it, that node errors on an empty key.
function getSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id =
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

// Shown whenever the n8n agent is unreachable, errors, or comes back with
// nothing usable — the CRT's own "signal lost" moment.
const DOWN_MESSAGE = [
  { text: "     NO SIGNAL — brain's offline", down: true },
  { text: "— try: work · about · contact · help", ok: true },
];

// Handles genuinely-unmatched input by asking the /api/chat serverless
// function (api/chat.js), which proxies to the n8n webhook server-side —
// the browser never talks to n8n directly.
async function getFallbackReply(input, sessionId) {
  try {
    const response = await fetch(
      `/api/chat?message=${encodeURIComponent(input)}&sessionId=${encodeURIComponent(sessionId)}`,
    );
    if (!response.ok) return DOWN_MESSAGE;

    const data = await response.json();
    const text = typeof data.reply === "string" ? data.reply.trim() : "";
    if (!text || text === "...") return DOWN_MESSAGE;

    return [{ text, ok: true }];
  } catch {
    return DOWN_MESSAGE;
  }
}

function HeroDevice() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [log, setLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const sessionId = useMemo(() => getSessionId(), []);
  const logRef = useRef(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log, loading]);

  const commands = useMemo(
    () => ({
      work: {
        respond: "→ opening /work ...",
        action: () => navigate("/work"),
      },
      about: {
        respond: "→ opening /about ...",
        action: () => navigate("/about"),
      },
      contact: {
        respond: "→ jumping to #contact ...",
        action: () => {
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" });
        },
      },
      help: {
        respond: "available: work, about, contact, clear, help",
      },
    }),
    [navigate],
  );

  async function handleSubmit(event) {
    event.preventDefault();
    const raw = value.trim();
    if (!raw || loading) return;

    const key = raw.toLowerCase();
    if (key === "clear" || key === "cls") {
      setLog([]);
      setValue("");
      return;
    }

    setValue("");
    setLog((prev) => [...prev, { text: `> ${raw}` }].slice(-50));

    const command = commands[key];
    if (command) {
      setLog((prev) =>
        [...prev, { text: command.respond, ok: true }].slice(-50),
      );
      if (command.action) {
        window.setTimeout(command.action, 500);
      }
      return;
    }

    setLoading(true);
    const replyLines = await getFallbackReply(raw, sessionId);
    setLoading(false);
    setLog((prev) => [...prev, ...replyLines].slice(-50));
  }

  return (
    <div className="hero-device">
      <div className="hero-device__monitor">
        <span className="hero-device__monitor-highlight" />
        <div className="hero-device__screen">
          <span className="hero-device__glow" />
          <span className="hero-device__screen-shine" />
          <div className="hero-device__terminal">
            <div className="hero-device__log" ref={logRef} aria-live="polite">
              {log.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.ok === true
                      ? "hero-device__line--ok"
                      : line.down
                        ? "hero-device__line--down"
                        : undefined
                  }
                >
                  {line.text}
                </div>
              ))}
              {loading && (
                <div className="hero-device__line--pending">...</div>
              )}
            </div>
            <form className="hero-device__prompt" onSubmit={handleSubmit}>
              <span className="hero-device__prompt-glyph" aria-hidden="true">
                &gt;
              </span>
              <input
                className="hero-device__input"
                type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                autoComplete="off"
                spellCheck="false"
                placeholder="type a command..."
                aria-label="Type a command: work, about, contact, or help"
                disabled={loading}
              />
            </form>
          </div>
        </div>
        <div className="hero-device__vents" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
        <div className="hero-device__monitor-dots" aria-hidden="true">
          <span className="hero-device__dot" />
          <span className="hero-device__dot" />
          <span className="hero-device__dot hero-device__dot--light" />
        </div>
      </div>

      <span className="hero-device__neck-shadow" aria-hidden="true" />
      <div className="hero-device__neck" aria-hidden="true">
        <span className="hero-device__neck-highlight" />
        <span className="hero-device__neck-seam" />
      </div>

      <div className="hero-device__tower" aria-hidden="true">
        <span className="hero-device__shine" />
        <span className="hero-device__button" />
        <span className="hero-device__slot" />
        <span className="hero-device__badge">386</span>
        <span className="hero-device__led hero-device__led--one" />
        <span className="hero-device__led hero-device__led--two" />
        <span className="hero-device__bay" />
      </div>
      <span className="hero-device__ground-shadow" aria-hidden="true" />
    </div>
  );
}

export default HeroDevice;
