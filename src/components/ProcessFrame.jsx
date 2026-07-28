import { forwardRef } from "react";
import "./ProcessFrame.css";

const ProcessFrame = forwardRef(function ProcessFrame({ step, style }, ref) {
  return (
    <div className="process-frame" style={style} ref={ref}>
      {step.image ? (
        <img className="process-frame__media" src={step.image} alt={step.imageAlt} />
      ) : (
        <div className="process-frame__placeholder">
          <span>{step.placeholderLabel ?? step.title}</span>
        </div>
      )}

      <div className="process-frame__scrim" aria-hidden="true" />

      <div className="process-frame__content">
        <span className="process-frame__number">Step {step.number}</span>
        <h3 className="process-frame__heading">{step.title}</h3>
        <p className="process-frame__description">{step.description}</p>
      </div>
    </div>
  );
});

export default ProcessFrame;
