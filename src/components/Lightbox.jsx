import { useEffect, useRef } from "react";
import "./Lightbox.css";

// Full-size image viewer. Esc or the backdrop closes it; focus moves to
// the close button on open and back to whatever opened it on close.
function Lightbox({ image, onClose }) {
  const closeRef = useRef(null);
  // Latest onClose without re-running the open/close effect when the
  // parent re-renders with a new callback.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const isOpen = Boolean(image);

  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKeyDown(event) {
      if (event.key === "Escape") onCloseRef.current();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      opener?.focus?.();
    };
  }, [isOpen]);

  if (!image) return null;

  return (
    <div className="lightbox" onClick={onClose}>
      <figure
        className="lightbox__figure"
        role="dialog"
        aria-modal="true"
        aria-label={image.alt}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          ref={closeRef}
          className="lightbox__close"
          aria-label="Close image"
          onClick={onClose}
        >
          ×
        </button>
        <img src={image.src} alt={image.alt} className="lightbox__img" />
        {image.caption && <figcaption className="lightbox__caption">{image.caption}</figcaption>}
      </figure>
    </div>
  );
}

export default Lightbox;
