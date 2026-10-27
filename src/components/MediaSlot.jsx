import { useRef, useState } from "react";
import "./MediaSlot.css";

const isVideo = (src) => /\.(mp4|webm)$/i.test(src);
// Waits on its thumbnail with a play button; the browser buffers the
// video meanwhile, so it starts smoothly when played. Once started it
// has the browser's own controls.
function Video({ media }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    setStarted(true);
    ref.current?.play();
  };

  return (
    <>
      <video
        ref={ref}
        className="media-slot__media"
        src={media.src}
        poster={media.poster}
        aria-label={media.alt}
        controls={started}
        playsInline
        preload="auto"
        onPlay={() => setStarted(true)}
      />
      {!started && (
        <button type="button" className="media-slot__play" onClick={play} aria-label={`Play video: ${media.alt}`}>
          <span className="media-slot__play-badge">
            {media.duration && <span className="media-slot__play-time">{media.duration}</span>}
            <span className="media-slot__play-icon" aria-hidden="true" />
          </span>
        </button>
      )}
    </>
  );
}

// One media slot in a case study: a video or an image once `media.src`
// exists. Until then, `media.placeholder` describes what to make. With a
// `cover` (the project's card artwork), the cover stands in and the brief
// shows over it in `npm run dev` only; without one, the brief shows as a
// dashed box in dev and production shows nothing, so an empty slot can't
// ship.
function MediaSlot({ media, kind, ratio = "16 / 9", cover, className = "" }) {
  const dev = import.meta.env.DEV;

  if (media?.src) {
    return (
      <figure className={`media-slot ${className}`} style={{ "--ratio": ratio }}>
        {isVideo(media.src) ? (
          <Video media={media} />
        ) : (
          <img className="media-slot__media" src={media.src} alt={media.alt} loading="lazy" decoding="async" />
        )}
        {media.caption && <figcaption className="media-slot__caption">{media.caption}</figcaption>}
      </figure>
    );
  }

  const brief = dev && media?.placeholder && (
    <span className="media-slot__kind">
      <span aria-hidden="true">{kind.includes("video") ? "▶" : "▣"}</span> {kind} · placeholder
    </span>
  );

  if (cover) {
    return (
      <figure className={`media-slot media-slot--cover ${className}`}>
        {cover}
        {brief && (
          <figcaption className="media-slot__overlay">
            {brief}
            <span className="media-slot__brief">{media.placeholder}</span>
          </figcaption>
        )}
      </figure>
    );
  }

  if (!brief) return null;

  return (
    <figure className={`media-slot media-slot--placeholder ${className}`} style={{ "--ratio": ratio }}>
      <div className="media-slot__box">
        {brief}
        <p className="media-slot__brief">{media.placeholder}</p>
      </div>
    </figure>
  );
}

export default MediaSlot;
