import useScrollVelocity from "../hooks/useScrollVelocity.js";
import "./Marquee.css";

const AWARDS_TEXT =
  "1st of 38 teams — Paagi ✦ 2nd place — Taiwan MOE DSP contest ✦ TEEP research — (STUST) Tainan, Taiwan ✦ IPBL 2025 — Osaka, Japan ✦ SpoonFull @ 智慧雨林 AI 健康照護 產學交流媒合會 — CHUMT, Tainan ✦ SpoonFull @ ICBET 2026 — Bali, Indonesia ✦";

function Marquee() {
  const velocityRef = useScrollVelocity();

  return (
    <div className="marquee" aria-label="Awards" ref={velocityRef}>
      <span className="visually-hidden">{AWARDS_TEXT}</span>
      <div className="marquee__track" aria-hidden="true">
        <span className="marquee__item">{AWARDS_TEXT}</span>
        <span className="marquee__item">{AWARDS_TEXT}</span>
      </div>
    </div>
  );
}

export default Marquee;
