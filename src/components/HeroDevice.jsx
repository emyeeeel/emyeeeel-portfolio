import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import scrollToSection from "../hooks/scrollToSection.js";
import runCommand from "./terminalCommands.js";
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

// Shown on load so the screen never starts blank.
const GREETING = [
  { text: "emyeeeel terminal — ready." },
  { text: "ask me anything, or type help.", ok: true },
];

// Shown whenever the n8n agent is unreachable, errors, or comes back with
// nothing usable — the CRT's own "signal lost" moment.
const DOWN_MESSAGE = [
  { text: "     NO SIGNAL — brain's offline", down: true },
  { text: "— the built-in answers still work: try help", ok: true },
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
  const [log, setLog] = useState(GREETING);
  const [loading, setLoading] = useState(false);
  const sessionId = useMemo(() => getSessionId(), []);
  const logRef = useRef(null);
  // Past inputs, for ↑/↓ recall in the prompt.
  const history = useRef([]);
  const historyPos = useRef(-1);

  // New output scrolls into view at the top of its answer, so a long reply
  // is read from its first line (scroll down for the rest).
  const answerStart = useRef(0);
  useEffect(() => {
    const el = logRef.current;
    if (!el) return;
    const first = el.children[answerStart.current];
    // offsetTop is measured from the terminal (its offset parent), so take
    // off the log's own offset to get the line's position inside the log.
    const top = first ? first.offsetTop - el.offsetTop : 0;
    if (first && top + el.clientHeight < el.scrollHeight) {
      el.scrollTop = Math.max(0, top - 2);
    } else {
      el.scrollTop = el.scrollHeight;
    }
  }, [log, loading]);

  function scrollLog(direction) {
    const el = logRef.current;
    if (el) el.scrollBy({ top: direction * el.clientHeight * 0.8, behavior: "smooth" });
  }

  function onInputKeyDown(event) {
    if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      scrollLog(event.key === "PageUp" ? -1 : 1);
      return;
    }
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    const list = history.current;
    if (!list.length) return;
    event.preventDefault();
    let pos = historyPos.current;
    pos = event.key === "ArrowUp" ? Math.min(list.length - 1, pos + 1) : Math.max(-1, pos - 1);
    historyPos.current = pos;
    setValue(pos === -1 ? "" : list[list.length - 1 - pos]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const raw = value.trim();
    if (!raw || loading) return;

    history.current = [...history.current, raw].slice(-30);
    historyPos.current = -1;

    const key = raw.toLowerCase();
    if (key === "clear" || key === "cls") {
      setLog([]);
      setValue("");
      return;
    }

    setValue("");
    setLog((prev) => {
      const next = [...prev, { text: `> ${raw}` }].slice(-80);
      // the echoed input line is where this answer starts
      answerStart.current = next.length - 1;
      return next;
    });

    const command = runCommand(raw, { navigate, scrollToSection });
    if (command) {
      setLog((prev) => [...prev, ...command.lines].slice(-80));
      if (command.action && command.immediate) {
        command.action();
      } else if (command.action) {
        window.setTimeout(command.action, 500);
      }
      return;
    }

    setLoading(true);
    const replyLines = await getFallbackReply(raw, sessionId);
    setLoading(false);
    setLog((prev) => [...prev, ...replyLines].slice(-80));
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
                        : line.dim
                          ? "hero-device__line--dim"
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
                onKeyDown={onInputKeyDown}
                autoComplete="off"
                spellCheck="false"
                placeholder="type what's next..."
                aria-label="Terminal: type help to see the commands, or ask a question"
                disabled={loading}
              />
            </form>
          </div>
          {/* scroll the answers up and down (also: mouse wheel, PgUp/PgDn) */}
          <div className="hero-device__scroll">
            <button type="button" onClick={() => scrollLog(-1)} aria-label="Scroll terminal up">
              ▲
            </button>
            <button type="button" onClick={() => scrollLog(1)} aria-label="Scroll terminal down">
              ▼
            </button>
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
