import { useState } from "react";
import "./MediaWithFallback.css";

function MediaWithFallback({ src, alt, label, className, placeholderClassName }) {
  const [status, setStatus] = useState("loading");

  if (status === "errored") {
    return (
      <div
        className={placeholderClassName}
        role="img"
        aria-label={alt}
      >
        <span>{label}</span>
      </div>
    );
  }

  return (
    <div className={className} style={{ position: "relative", display: "block" }}>
      <img
        src={src}
        alt={alt}
        className="media-with-fallback__img"
        style={{ opacity: status === "loaded" ? 1 : 0 }}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("errored")}
      />
      {status === "loading" && (
        <div className="media-with-fallback__loading" aria-hidden="true">
          <span className="media-with-fallback__loading-bars">
            ▓▒░▒▓░▒▓░▒▓░▒▓░▒▓
          </span>
          <span className="media-with-fallback__loading-status">
            acquiring signal...
          </span>
        </div>
      )}
    </div>
  );
}

export default MediaWithFallback;
