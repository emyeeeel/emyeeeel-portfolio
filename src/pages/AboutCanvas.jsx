import { useEffect, useLayoutEffect, useRef, useState } from "react";
import aboutFacets from "../data/aboutFacets.js";
import "./AboutCanvas.css";

const CANVAS_WIDTH = 2400;
const CANVAS_HEIGHT = 1600;
const CLICK_THRESHOLD = 6;

// The intro heading sits at this point of the canvas. INTRO_TOP_RATIO must
// match .about-canvas__intro's `top` percentage in AboutCanvas.css.
const INTRO_TOP_RATIO = 0.45;
const CENTER_X = CANVAS_WIDTH / 2;
const CENTER_Y = CANVAS_HEIGHT * INTRO_TOP_RATIO;

// Room kept clear around the heading, between photos, at the screen edges
// and under the fixed nav bar.
const TEXT_GAP = 28;
const CARD_GAP = 14;
const EDGE = 16;
const NAV_BAND = 72;
const STEP = 12;

// Opening view: the heading centred in the space below the nav bar.
function initialPan(viewW, viewH) {
  return {
    x: Math.round(viewW / 2 - CENTER_X),
    y: Math.round(NAV_BAND + (viewH - NAV_BAND) / 2 - CENTER_Y),
  };
}

// Places the photos in a ring as close to the heading as they'll fit,
// without covering it or each other. It measures the real sizes first:
//   view  — the visible board, { w, h }
//   card  — one polaroid, { w, h }
//   intro — the heading block, { w, h }
// Each photo gets its own direction around the heading (so the ring is
// even), then takes the nearest free spot that's on screen. When the
// screen runs out of free spots, photos overlap each other (as little as
// possible) rather than leaving the screen. They never cover the heading.
function layoutAround(view, card, intro) {
  const count = aboutFacets.length;
  const pan = initialPan(view.w, view.h);
  // Rotated cards stick out a little past their box.
  const slack = Math.ceil(card.w * 0.1);
  const cw = card.w + slack * 2;
  const ch = card.h + slack * 2;

  const text = {
    x: CENTER_X - intro.w / 2 - TEXT_GAP,
    y: CENTER_Y - intro.h / 2 - TEXT_GAP,
    w: intro.w + TEXT_GAP * 2,
    h: intro.h + TEXT_GAP * 2,
  };
  const hits = (a, b, gap = 0) =>
    a.x < b.x + b.w + gap && b.x < a.x + a.w + gap && a.y < b.y + b.h + gap && b.y < a.y + a.h + gap;

  // Scale distances to the screen's shape, so the ring is wide on wide
  // screens and tall on tall ones.
  const rx = Math.max(view.w / 2, 1);
  const ry = Math.max(view.h / 2, 1);

  function candidates(bounds) {
    const list = [];
    for (let y = bounds.top; y <= bounds.bottom - ch; y += STEP) {
      for (let x = bounds.left; x <= bounds.right - cw; x += STEP) {
        const box = { x, y, w: cw, h: ch };
        if (hits(box, text)) continue;
        const dx = (x + cw / 2 - CENTER_X) / rx;
        const dy = (y + ch / 2 - CENTER_Y) / ry;
        list.push({ box, dist: Math.hypot(dx, dy), angle: Math.atan2(dy, dx) });
      }
    }
    return list;
  }

  const onScreen = candidates({
    left: -pan.x + EDGE,
    right: -pan.x + view.w - EDGE,
    top: -pan.y + NAV_BAND,
    bottom: -pan.y + view.h - EDGE,
  });
  const belowScreen = candidates({
    left: -pan.x + EDGE,
    right: -pan.x + view.w - EDGE,
    top: -pan.y + NAV_BAND,
    bottom: Math.min(CANVAS_HEIGHT, -pan.y + view.h * 1.6),
  });

  const placed = [];
  const start = Math.random() * Math.PI * 2;
  const angleGap = (a, b) => {
    const d = Math.abs(a - b) % (Math.PI * 2);
    return d > Math.PI ? Math.PI * 2 - d : d;
  };

  // How much of `box` is covered by photos already placed (0 = none).
  function covered(box) {
    let area = 0;
    for (const p of placed) {
      const w = Math.min(box.x + box.w, p.x + p.w) - Math.max(box.x, p.x);
      const h = Math.min(box.y + box.h, p.y + p.h) - Math.max(box.y, p.y);
      if (w > 0 && h > 0) area += w * h;
    }
    return area / (box.w * box.h);
  }

  // Nearest on-screen spot in the photo's direction; with `allowOverlap`,
  // spots on other photos are allowed but cost more the more they cover.
  function pick(list, target, allowOverlap) {
    let best = null;
    let bestScore = Infinity;
    for (const c of list) {
      let score = c.dist + angleGap(c.angle, target) * 0.6;
      if (allowOverlap) score += covered(c.box) * 4;
      else if (placed.some((p) => hits(c.box, p, CARD_GAP))) continue;
      if (score < bestScore) {
        bestScore = score;
        best = c;
      }
    }
    return best;
  }

  return aboutFacets.map((facet, index) => {
    const target = start + (index * Math.PI * 2) / count;
    // On a screen too short for any spot, fall back to the nearest spot
    // just below it rather than stacking every photo in one place.
    const spot =
      pick(onScreen, target, false) ?? pick(onScreen, target, true) ?? pick(belowScreen, target, true);
    const box = spot ? spot.box : { x: CENTER_X + 600, y: CENTER_Y, w: cw, h: ch };
    placed.push(box);
    return {
      ...facet,
      id: index,
      x: box.x + slack,
      y: box.y + slack,
      rotate: Math.random() * 16 - 8,
      z: index + 1,
    };
  });
}

// The photo before/after `current` in `list`, wrapping around the ends.
function neighbour(list, current, direction) {
  if (!current) return current;
  const next = (current.id + direction + list.length) % list.length;
  return list.find((item) => item.id === next) ?? current;
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
    document.title = "emyeeeel — about";
  }, []);

  // Photos start unplaced; the layout below measures the screen, a card
  // and the heading, then rings the photos around the heading.
  const [items, setItems] = useState(() =>
    aboutFacets.map((facet, index) => ({ ...facet, id: index, x: 0, y: 0, rotate: 0, z: index + 1 })),
  );
  const [laidOut, setLaidOut] = useState(false);
  const [pan, setPan] = useState(() =>
    initialPan(typeof window === "undefined" ? 1280 : window.innerWidth, 800),
  );
  const viewportRef = useRef(null);
  const introRef = useRef(null);
  // Once someone drags the board or a photo, a resize no longer reshuffles.
  const touched = useRef(false);

  useLayoutEffect(() => {
    function arrange() {
      const view = viewportRef.current;
      const intro = introRef.current;
      const card = view?.querySelector(".about-canvas__card");
      if (!view || !intro || !card) return;
      const size = { w: view.clientWidth, h: view.clientHeight };
      setPan(initialPan(size.w, size.h));
      setItems(
        layoutAround(
          size,
          { w: card.offsetWidth, h: card.offsetHeight },
          { w: intro.offsetWidth, h: intro.offsetHeight },
        ),
      );
      setLaidOut(true);
    }
    arrange();
    let timer;
    function onResize() {
      if (touched.current) return;
      clearTimeout(timer);
      timer = setTimeout(arrange, 200);
    }
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  const [activeItem, setActiveItem] = useState(null);
  const zCounter = useRef(aboutFacets.length + 1);
  const closeButtonRef = useRef(null);
  const openerRef = useRef(null);
  const panState = useRef(null);
  const dragState = useRef(null);

  function handleSurfacePointerDown(event) {
    if (event.target.closest(".about-canvas__card")) return;
    touched.current = true;
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
    touched.current = true;
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

  function openItem(facet, opener) {
    openerRef.current = opener;
    setActiveItem(facet);
  }

  function closeItem() {
    setActiveItem(null);
    openerRef.current?.focus();
  }

  // Step to the previous/next photo without closing the viewer.
  function stepItem(direction) {
    setActiveItem((current) => neighbour(items, current, direction));
  }

  function handleCardPointerUp(event, id, facet) {
    const drag = dragState.current;
    dragState.current = null;
    if (drag && drag.id === id && drag.moved < CLICK_THRESHOLD) {
      openItem(facet, event.currentTarget);
    }
  }

  function handleCardKeyDown(event, facet) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openItem(facet, event.currentTarget);
    }
  }

  // Latest photo list for the keyboard handler below.
  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    if (!activeItem) return;
    closeButtonRef.current?.focus();
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setActiveItem(null);
        openerRef.current?.focus();
      } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        const direction = event.key === "ArrowRight" ? 1 : -1;
        setActiveItem((current) => neighbour(itemsRef.current, current, direction));
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeItem]);

  return (
    <>
    <div className="about-canvas">
      <div
        className="about-canvas__viewport"
        ref={viewportRef}
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
          <div className="about-canvas__intro" ref={introRef}>
            <h1 className="about-canvas__heading">
              hi, i'm <span className="about-canvas__heading-emphasis">amiel</span>.
            </h1>
            <p className="about-canvas__subtitle">
              ↳ poke around — drag the board, drag a photo, click one to open it.
            </p>
          </div>

          {items.map((item) => (
            <div
              key={item.id}
              className={`about-canvas__card${laidOut ? "" : " is-unplaced"}`}
              role="button"
              tabIndex={0}
              aria-label={"Open photo: " + item.mediaLabel}
              onKeyDown={(event) => handleCardKeyDown(event, item)}
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
              <CanvasImage src={item.mediaSrc} alt="" />
            </div>
          ))}
        </div>
      </div>

      {activeItem && (
        <div
          className="about-canvas__modal-backdrop"
          onClick={closeItem}
        >
          {/* Photo viewer: a terminal-style window with the photo in a
              polaroid frame, like the board's cards. Sized to the screen,
              so it never scrolls. */}
          <div
            className="about-canvas__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-canvas-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="about-canvas__modal-bar">
              <p className="about-canvas__modal-path" aria-hidden="true">
                <span className="about-canvas__modal-mark">&gt;</span> open ~/about/
                <span className="about-canvas__modal-file">
                  {activeItem.mediaSrc.split("/").pop()}
                </span>
              </p>
              <button
                type="button"
                ref={closeButtonRef}
                className="about-canvas__modal-close"
                aria-label="Close photo"
                onClick={closeItem}
              >
                <span className="about-canvas__modal-esc" aria-hidden="true">
                  esc
                </span>
                <span className="about-canvas__modal-x" aria-hidden="true">
                  ×
                </span>
              </button>
            </div>

            <div className="about-canvas__modal-content" key={activeItem.id}>
              <figure className="about-canvas__modal-photo">
                <CanvasImage src={activeItem.mediaSrc} alt={activeItem.mediaLabel} />
              </figure>

              <div className="about-canvas__modal-body">
                <p className="about-canvas__modal-count">
                  {String(activeItem.id + 1).padStart(2, "0")}
                  <span> / {String(items.length).padStart(2, "0")}</span>
                </p>
                <h2 className="about-canvas__modal-title" id="about-canvas-modal-title">
                  {activeItem.mediaLabel}
                </h2>
                {activeItem.story && (
                  <p className="about-canvas__modal-desc">{activeItem.story}</p>
                )}
                {activeItem.link && (
                  <a
                    href={activeItem.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-canvas__modal-link"
                  >
                    {activeItem.link.label} <span aria-hidden="true">↗</span>
                  </a>
                )}

                <div className="about-canvas__modal-nav">
                  <button
                    type="button"
                    className="about-canvas__modal-step"
                    onClick={() => stepItem(-1)}
                    aria-label="Previous photo"
                  >
                    <span aria-hidden="true">←</span>
                  </button>
                  <button
                    type="button"
                    className="about-canvas__modal-step"
                    onClick={() => stepItem(1)}
                    aria-label="Next photo"
                  >
                    <span aria-hidden="true">→</span>
                  </button>
                  <span className="about-canvas__modal-hint" aria-hidden="true">
                    or use ← → keys
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    </>
  );
}

export default AboutCanvasPage;
