import { useEffect, useRef, useState } from "react";
import aboutFacets from "../data/aboutFacets.js";
import "./AboutCanvas.css";

const CANVAS_WIDTH = 2400;
const CANVAS_HEIGHT = 1600;
const CLICK_THRESHOLD = 6;

// Photos start scattered in a ring around the intro heading rather than in
// a grid, so they read as circling it. INTRO_TOP_RATIO must match
// .about-canvas__intro's `top` percentage in AboutCanvas.css.
const INTRO_TOP_RATIO = 0.45;
const CENTER_X = CANVAS_WIDTH / 2;
const CENTER_Y = CANVAS_HEIGHT * INTRO_TOP_RATIO;
const MIN_RADIUS = 280;
const MAX_RADIUS = 520;
// Matches the polaroid card's fixed footprint at its largest breakpoint
// size (150px wide; 10px/10px/32px padding around a square 130px photo).
const CARD_HALF_W = 75;
const CARD_HALF_H = 86;
const EST_CARD_W = 150;
const EST_CARD_H = 172;
const CARD_MARGIN = 20;
const MAX_PLACEMENT_ATTEMPTS = 60;

function overlaps(a, b) {
  return !(
    a.x + EST_CARD_W + CARD_MARGIN < b.x ||
    b.x + EST_CARD_W + CARD_MARGIN < a.x ||
    a.y + EST_CARD_H + CARD_MARGIN < b.y ||
    b.y + EST_CARD_H + CARD_MARGIN < a.y
  );
}

function randomLayout() {
  const count = aboutFacets.length;
  const angleStep = (Math.PI * 2) / count;
  const placed = [];

  return aboutFacets.map((facet, index) => {
    let position = null;

    for (let attempt = 0; attempt < MAX_PLACEMENT_ATTEMPTS; attempt++) {
      const angle = index * angleStep + (Math.random() - 0.5) * angleStep * 0.7;
      const radius = MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS);
      const candidate = {
        x: CENTER_X + Math.cos(angle) * radius - CARD_HALF_W,
        y: CENTER_Y + Math.sin(angle) * radius - CARD_HALF_H,
      };

      if (!placed.some((p) => overlaps(candidate, p))) {
        position = candidate;
        break;
      }
      // Keep the last-tried spot as a fallback in case every attempt collides.
      position = candidate;
    }

    placed.push(position);

    return {
      ...facet,
      id: index,
      x: position.x,
      y: position.y,
      rotate: Math.random() * 16 - 8,
      z: index + 1,
    };
  });
}

function CanvasImage({ src, alt }) {
  const [status, setStatus] = useState("loading");

  if (status === "errored") {
    return (
      <div className="about-canvas__placeholder">
        <span>{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="about-canvas__img"
      draggable={false}
      style={{ opacity: status === "loaded" ? 1 : 0 }}
      onLoad={() => setStatus("loaded")}
      onError={() => setStatus("errored")}
    />
  );
}

function AboutCanvasPage() {
  useEffect(() => {
    document.title = "emyeeeel — canvas";
  }, []);

  const [items, setItems] = useState(randomLayout);
  const [pan, setPan] = useState({
    x: -(CENTER_X - 640),
    // Shifted down a bit further so the top of the ring clears the fixed
    // nav bar instead of rendering clipped behind it.
    y: -(CENTER_Y - 400) + 70,
  });
  const [activeItem, setActiveItem] = useState(null);
  const zCounter = useRef(aboutFacets.length + 1);
  const panState = useRef(null);
  const dragState = useRef(null);

  function handleSurfacePointerDown(event) {
    if (event.target.closest(".about-canvas__card")) return;
    panState.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: pan.x,
      originY: pan.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleSurfacePointerMove(event) {
    if (!panState.current) return;
    const { startX, startY, originX, originY } = panState.current;
    setPan({
      x: originX + (event.clientX - startX),
      y: originY + (event.clientY - startY),
    });
  }

  function handleSurfacePointerUp() {
    panState.current = null;
  }

  function handleCardPointerDown(event, id) {
    event.stopPropagation();
    dragState.current = {
      id,
      startX: event.clientX,
      startY: event.clientY,
      moved: 0,
    };
    zCounter.current += 1;
    const nextZ = zCounter.current;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, z: nextZ } : item)),
    );
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleCardPointerMove(event, id) {
    const drag = dragState.current;
    if (!drag || drag.id !== id) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    drag.moved += Math.hypot(dx, dy);
    drag.startX = event.clientX;
    drag.startY = event.clientY;

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, x: item.x + dx, y: item.y + dy } : item,
      ),
    );
  }

  function handleCardPointerUp(event, id, facet) {
    const drag = dragState.current;
    dragState.current = null;
    if (drag && drag.id === id && drag.moved < CLICK_THRESHOLD) {
      setActiveItem(facet);
    }
  }

  useEffect(() => {
    if (!activeItem) return;
    function handleKeyDown(event) {
      if (event.key === "Escape") setActiveItem(null);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeItem]);

  return (
    <div className="about-canvas">
      <div
        className="about-canvas__viewport"
        onPointerDown={handleSurfacePointerDown}
        onPointerMove={handleSurfacePointerMove}
        onPointerUp={handleSurfacePointerUp}
        onPointerCancel={handleSurfacePointerUp}
      >
        <div
          className="about-canvas__surface"
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            transform: `translate(${pan.x}px, ${pan.y}px)`,
          }}
        >
          <div className="about-canvas__intro">
            <h1 className="about-canvas__heading">
              hi, i'm <span className="about-canvas__heading-emphasis">amiel</span>.
            </h1>
            <p className="about-canvas__subtitle">
              ↳ poke around — drag the board, drag a photo, click one to open it
            </p>
          </div>

          {items.map((item) => (
            <div
              key={item.id}
              className="about-canvas__card"
              style={{
                left: item.x,
                top: item.y,
                zIndex: item.z,
                "--card-rotate": `${item.rotate}deg`,
              }}
              onPointerDown={(event) => handleCardPointerDown(event, item.id)}
              onPointerMove={(event) => handleCardPointerMove(event, item.id)}
              onPointerUp={(event) => handleCardPointerUp(event, item.id, item)}
              onPointerCancel={(event) => handleCardPointerUp(event, item.id, item)}
            >
              <CanvasImage src={item.mediaSrc} alt={item.mediaLabel} />
            </div>
          ))}
        </div>
      </div>

      {activeItem && (
        <div
          className="about-canvas__modal-backdrop"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="about-canvas__modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="about-canvas__modal-close"
              aria-label="Close"
              onClick={() => setActiveItem(null)}
            >
              ×
            </button>
            <div className="about-canvas__modal-media">
              <CanvasImage src={activeItem.mediaSrc} alt={activeItem.mediaLabel} />
            </div>
            <div className="about-canvas__modal-body">
              <h2 className="about-canvas__modal-title">{activeItem.mediaLabel}</h2>
              <p className="about-canvas__modal-desc">
                TODO(amiel): add the story behind this one.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AboutCanvasPage;
