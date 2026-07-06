import { useState } from "react";

function MediaWithFallback({ src, alt, label, className, placeholderClassName }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
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
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}

export default MediaWithFallback;
