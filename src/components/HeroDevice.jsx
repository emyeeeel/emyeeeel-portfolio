import "./HeroDevice.css";

function HeroDevice() {
  return (
    <div className="hero-device" aria-hidden="true">
      <div className="hero-device__monitor">
        <span className="hero-device__monitor-highlight" />
        <div className="hero-device__screen">
          <span className="hero-device__glow" />
          <span className="hero-device__screen-shine" />
          <span className="hero-device__cursor">
            &gt; Ready when you are.<span className="hero-device__cursor-blink">_</span>
          </span>
        </div>
        <div className="hero-device__vents">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
        <div className="hero-device__monitor-dots">
          <span className="hero-device__dot" />
          <span className="hero-device__dot" />
          <span className="hero-device__dot hero-device__dot--light" />
        </div>
      </div>

      <span className="hero-device__neck-shadow" />
      <div className="hero-device__neck">
        <span className="hero-device__neck-highlight" />
        <span className="hero-device__neck-seam" />
      </div>

      <div className="hero-device__tower">
        <span className="hero-device__shine" />
        <span className="hero-device__button" />
        <span className="hero-device__slot" />
        <span className="hero-device__badge">386</span>
        <span className="hero-device__led hero-device__led--one" />
        <span className="hero-device__led hero-device__led--two" />
        <span className="hero-device__bay" />
      </div>
      <span className="hero-device__ground-shadow" />
    </div>
  );
}

export default HeroDevice;
