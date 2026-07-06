import { useEffect, useState } from "react";

const SECTION_IDS = ["hero-section", "work", "about", "experience"];

function useSectionProgress(enabled) {
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!enabled) return;

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = elements.indexOf(entry.target);
            if (idx !== -1) setCurrent(idx + 1);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return { current, total: SECTION_IDS.length };
}

export default useSectionProgress;
