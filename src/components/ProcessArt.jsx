// Line illustrations for the working-approach steps, drawn in the site's
// palette: ink outlines on a bone panel (the colour of the hero's retro
// computer), with coral, lime and periwinkle accents.
const INK = "#101014";
const PAPER = "#fbf9f5";
const CORAL = "#ff4d36";
const LIME = "#d8ff3e";
const PERI = "#a5abf2";
const MONO = "JetBrains Mono, Consolas, monospace";

const stroke = { stroke: INK, strokeWidth: 2.5, strokeLinejoin: "round", strokeLinecap: "round" };

// 01 — a workflow map with the pain point flagged.
function MapArt() {
  const node = (x, y, fill = PAPER) => (
    <g>
      <rect x={x} y={y} width="74" height="36" rx="9" fill={fill} {...stroke} />
      <rect x={x + 12} y={y + 11} width="40" height="5" rx="2.5" fill={INK} opacity="0.75" />
      <rect x={x + 12} y={y + 21} width="26" height="5" rx="2.5" fill={INK} opacity="0.35" />
    </g>
  );
  return (
    <>
      <defs>
        <marker id="art-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M1 1 9 5 1 9" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <path d="M96 48h34" {...stroke} fill="none" markerEnd="url(#art-arrow)" />
      <path d="M59 66v46" {...stroke} fill="none" markerEnd="url(#art-arrow)" />
      <path d="M96 138h34" {...stroke} fill="none" markerEnd="url(#art-arrow)" />
      <path d="M173 66v46" {...stroke} fill="none" strokeDasharray="2 7" />
      {node(22, 30)}
      {node(136, 30)}
      {node(22, 120)}
      {node(136, 120, CORAL)}
      {/* the step where the hours pile up */}
      <circle cx="208" cy="120" r="12" fill={LIME} {...stroke} />
      <path d="M208 113v8M208 126v.5" stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
    </>
  );
}

// 02 — a signed-off scope, and a baseline to beat.
function ScopeArt() {
  const row = (y, state) => (
    <g>
      <rect
        x="46"
        y={y}
        width="15"
        height="15"
        rx="4"
        fill={state === "in" ? LIME : PAPER}
        {...stroke}
      />
      {state === "in" ? (
        <path d={`M49.5 ${y + 8} 52.5 ${y + 11} 57.5 ${y + 4.5}`} fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d={`M50 ${y + 4}l7 7M57 ${y + 4}l-7 7`} stroke={INK} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      )}
      <rect x="72" y={y + 5} width={state === "in" ? 96 : 70} height="5" rx="2.5" fill={INK} opacity={state === "in" ? 0.7 : 0.25} />
    </g>
  );
  return (
    <>
      <rect x="30" y="18" width="180" height="112" rx="11" fill={PAPER} {...stroke} />
      <rect x="46" y="32" width="64" height="7" rx="3.5" fill={INK} />
      {row(52, "in")}
      {row(74, "in")}
      {row(96, "out")}
      {/* baseline bar with a target marker */}
      <rect x="30" y="152" width="180" height="14" rx="7" fill={PAPER} {...stroke} />
      <rect x="31.5" y="153.5" width="118" height="11" rx="5.5" fill={CORAL} />
      <path d="M150 144v30" {...stroke} />
      <text x="30" y="192" fontFamily={MONO} fontSize="11" fill={INK}>
        baseline
      </text>
      <text x="210" y="192" fontFamily={MONO} fontSize="11" fill={INK} textAnchor="end" opacity="0.6">
        target
      </text>
    </>
  );
}

// 03 — code in a window, with the tests passing.
function BuildArt() {
  const line = (x, y, w, fill, opacity = 1) => (
    <rect x={x} y={y} width={w} height="6" rx="3" fill={fill} opacity={opacity} />
  );
  return (
    <>
      <rect x="22" y="16" width="196" height="128" rx="11" fill={INK} {...stroke} />
      <circle cx="39" cy="31" r="4" fill={CORAL} />
      <circle cx="51" cy="31" r="4" fill={LIME} />
      <circle cx="63" cy="31" r="4" fill={PERI} />
      <path d="M22 44h196" stroke="#2a2a30" strokeWidth="1.5" />
      {line(38, 56, 58, PERI)}
      {line(102, 56, 44, "#f2efe9", 0.6)}
      {line(50, 72, 70, LIME)}
      {line(126, 72, 36, "#f2efe9", 0.45)}
      {line(62, 88, 46, CORAL)}
      {line(114, 88, 56, "#f2efe9", 0.45)}
      {line(50, 104, 40, PERI)}
      {line(38, 120, 22, "#f2efe9", 0.6)}
      {/* test result */}
      <rect x="22" y="158" width="138" height="30" rx="15" fill={LIME} {...stroke} />
      <path d="M36 173.5 41 178.5 49 168.5" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="58" y="177.5" fontFamily={MONO} fontSize="11.5" fill={INK}>
        tests passed
      </text>
    </>
  );
}

// 04 — docs handed over, and a before-and-after.
function HandoverArt() {
  return (
    <>
      {/* README page with a folded corner */}
      <path d="M150 20h40l18 18v62a6 6 0 0 1-6 6h-52a6 6 0 0 1-6-6V26a6 6 0 0 1 6-6Z" fill={PAPER} {...stroke} />
      <path d="M190 20v18h18" fill="none" {...stroke} />
      <rect x="156" y="48" width="36" height="5" rx="2.5" fill={INK} opacity="0.75" />
      <rect x="156" y="62" width="44" height="5" rx="2.5" fill={INK} opacity="0.35" />
      <rect x="156" y="76" width="30" height="5" rx="2.5" fill={INK} opacity="0.35" />
      {/* before → after */}
      <path d="M22 168h112" {...stroke} />
      <rect x="34" y="56" width="36" height="112" rx="5" fill={INK} {...stroke} />
      <rect x="90" y="134" width="36" height="34" rx="5" fill={CORAL} {...stroke} />
      <path d="M78 52c30 0 30 40 30 72" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 6" />
      <path d="m102 118 6 8 6-8" fill="none" {...stroke} />
      <text x="52" y="188" fontFamily={MONO} fontSize="11" fill={INK} textAnchor="middle">
        before
      </text>
      <text x="108" y="188" fontFamily={MONO} fontSize="11" fill={INK} textAnchor="middle">
        after
      </text>
    </>
  );
}

const ART = { map: MapArt, scope: ScopeArt, build: BuildArt, handover: HandoverArt };

function ProcessArt({ name, label }) {
  const Art = ART[name];
  if (!Art) return null;
  return (
    <svg viewBox="0 0 240 200" role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
      <Art />
    </svg>
  );
}

export default ProcessArt;
