import "./Logotype.css";

function Logotype({ blink = false, className = "" }) {
  return (
    <span className={`logotype${className ? ` ${className}` : ""}`}>
      <span className="logotype__chevron">{"> "}</span>
      <span className="logotype__name">emyeeeel</span>
      <span
        className={`logotype__cursor${blink ? " logotype__cursor--blink" : ""}`}
        aria-hidden="true"
      />
    </span>
  );
}

export default Logotype;
