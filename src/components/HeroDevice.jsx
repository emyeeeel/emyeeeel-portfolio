import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroDevice.css";

const SMART_REPLIES = [
  {
    test: (s) => /^(hi|hello|hey|yo|sup)!?$/.test(s),
    reply: "hey — I'm just a portfolio terminal, not sentient. try \"help\".",
  },
  {
    test: (s) => /^who are you\??$/.test(s),
    reply: "emyeeeel's portfolio terminal. type \"help\" to see what I actually do.",
  },
  {
    test: (s) => /^(thanks|thank you|ty)!?$/.test(s),
    reply: "anytime.",
  },
  {
    test: (s) => /^how('s| is)? it going\??$/.test(s) || /^how are you\??$/.test(s),
    reply: "running smooth, thanks for asking.",
  },
];

function findSmartReply(input) {
  const match = SMART_REPLIES.find((entry) => entry.test(input));
  return match ? match.reply : null;
}

// Placeholder for genuinely-unmatched input. This is the exact spot a real
// API call replaces once there's a secure server-side endpoint to call —
// swap the body for `await fetch("/api/chat", ...)` and return its reply.
async function getFallbackReply(input) {
  await new Promise((resolve) => setTimeout(resolve, 650));
  return `not sure how to respond to "${input}" yet — real AI wiring is next. try "help" for commands that work today.`;
}

function HeroDevice() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [log, setLog] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setLog((prev) => [...prev, { text: `> ${raw}` }].slice(-4));

    const command = commands[key];
    if (command) {
      setLog((prev) =>
        [...prev, { text: command.respond, ok: true }].slice(-4),
      );
      if (command.action) {
        window.setTimeout(command.action, 500);
      }
      return;
    }

    const smartReply = findSmartReply(key);
    if (smartReply) {
      setLog((prev) => [...prev, { text: smartReply, ok: true }].slice(-4));
      return;
    }

    setLoading(true);
    const reply = await getFallbackReply(raw);
    setLoading(false);
    setLog((prev) => [...prev, { text: reply }].slice(-4));
  }

  return (
    <div className="hero-device">
      <div className="hero-device__monitor">
        <span className="hero-device__monitor-highlight" />
        <div className="hero-device__screen">
          <span className="hero-device__glow" />
          <span className="hero-device__screen-shine" />
          <div className="hero-device__terminal">
            <div className="hero-device__log" aria-live="polite">
              {log.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.ok === true
                      ? "hero-device__line--ok"
                      : line.ok === false
                        ? "hero-device__line--err"
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
