import "./BrandMarks.css";

// Project logos rebuilt as live text and SVG, so a case study cover can show
// them at any size without the blur of an enlarged PNG. A cover picks one
// with `mark: "<key>"`.

// SpoonFull: Poppins letters, with the two o's drawn as the logo's own
// glyphs: a ring with a plus cut out, and a teal disc with a spoon cut out.
function SpoonFullMark() {
  return (
    <span className="mark-spoonfull" role="img" aria-label="SpoonFull">
      <span className="mark-spoonfull__bold" aria-hidden="true">
        sp
      </span>
      <svg
        className="mark-spoonfull__o"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <mask id="mark-spoonfull-plus">
          <rect width="100" height="100" fill="#fff" />
          <rect x="33" y="11" width="34" height="78" rx="9" fill="#000" />
          <rect x="11" y="33" width="78" height="34" rx="9" fill="#000" />
        </mask>
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="var(--mark-light)"
          mask="url(#mark-spoonfull-plus)"
        />
      </svg>
      <svg
        className="mark-spoonfull__o"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <mask id="mark-spoonfull-spoon">
          <rect width="100" height="100" fill="#fff" />
          <ellipse
            cx="46"
            cy="42"
            rx="19"
            ry="27"
            transform="rotate(-24 46 42)"
            fill="#000"
          />
          <path
            d="M57 64 L86 100"
            stroke="#000"
            strokeWidth="11"
            strokeLinecap="round"
          />
        </mask>
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="var(--mark-teal)"
          mask="url(#mark-spoonfull-spoon)"
        />
      </svg>
      <span className="mark-spoonfull__bold" aria-hidden="true">
        n
      </span>
      <span className="mark-spoonfull__light" aria-hidden="true">
        full
      </span>
    </span>
  );
}

const MARKS = {
  spoonfull: SpoonFullMark,
};

function BrandMark({ name }) {
  const Mark = MARKS[name];
  return Mark ? <Mark /> : null;
}

export default BrandMark;
