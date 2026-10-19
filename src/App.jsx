import { useCallback, useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import PageWipe from "./components/PageWipe.jsx";
import BootLoader from "./components/BootLoader.jsx";
import Cursor from "./components/Cursor.jsx";
import useReducedMotion from "./hooks/useReducedMotion.js";
import scrollToSection from "./hooks/scrollToSection.js";
import Home from "./pages/Home.jsx";
import WorkIndexPage from "./pages/WorkIndex.jsx";
import CaseStudy from "./pages/CaseStudy.jsx";
import AboutCanvasPage from "./pages/AboutCanvas.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";
import NotFound from "./pages/NotFound.jsx";

const BOOT_KEY = "emyeeeel-booted";

// The boot sequence is a first-impression moment, not a toll on every
// page load: play it once per browser session.
function shouldBoot() {
  try {
    return sessionStorage.getItem(BOOT_KEY) !== "1";
  } catch {
    return true;
  }
}

function markBooted() {
  try {
    sessionStorage.setItem(BOOT_KEY, "1");
  } catch {
    // storage unavailable — the loader simply plays again next time
  }
}

const COVER_MS = 190;
const HOLD_MS = 70;
const REVEAL_MS = 190;

function App() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const [displayLocation, setDisplayLocation] = useState(location);
  const displayLocationRef = useRef(location);
  const [stage, setStage] = useState("idle");
  const timers = useRef([]);
  const [booting, setBooting] = useState(shouldBoot);

  const finishBoot = useCallback(() => {
    markBooted();
    setBooting(false);
  }, []);

  function updateDisplayLocation(loc) {
    displayLocationRef.current = loc;
    setDisplayLocation(loc);
  }

  useEffect(() => {
    const current = displayLocationRef.current;
    if (location.pathname === current.pathname) {
      // Same page, different query or hash (e.g. /work?tag=React): show it
      // right away — the wipe is only for moving between pages.
      if (location.search !== current.search || location.hash !== current.hash) {
        updateDisplayLocation(location);
      }
      return;
    }

    if (reducedMotion) {
      updateDisplayLocation(location);
      return;
    }

    // The timer list lives for the component's lifetime; take it once so
    // the cleanup below clears the same list it was given.
    const pending = timers.current;
    pending.forEach(clearTimeout);
    setStage("covering");

    const t1 = setTimeout(() => {
      updateDisplayLocation(location);
      setStage("held");

      const t2 = setTimeout(() => {
        setStage("revealing");

        const t3 = setTimeout(() => {
          setStage("idle");
        }, REVEAL_MS);
        timers.current.push(t3);
      }, HOLD_MS);
      timers.current.push(t2);
    }, COVER_MS);
    timers.current.push(t1);

    return () => pending.forEach(clearTimeout);
  }, [location, reducedMotion]);

  const scrolledPathRef = useRef(null);

  useEffect(() => {
    const pageChanged = scrolledPathRef.current !== displayLocation.pathname;
    scrolledPathRef.current = displayLocation.pathname;

    if (displayLocation.hash) {
      const id = displayLocation.hash.slice(1);
      if (document.getElementById(id)) {
        // A beat later, so the page has laid out (and the browser's own
        // jump to the anchor on a direct load is done) before scrolling.
        const timer = setTimeout(() => scrollToSection(id), 120);
        return () => clearTimeout(timer);
      }
    }
    // Only reset scroll for a new page — not when a filter changes the
    // query string on the page the visitor is already reading.
    if (pageChanged) window.scrollTo(0, 0);
  }, [displayLocation]);

  return (
    <>
      {booting && <BootLoader onDone={finishBoot} />}
      <Cursor />
      {!reducedMotion && <PageWipe stage={stage} />}
      <Routes location={displayLocation}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkIndexPage />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/about" element={<AboutCanvasPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
