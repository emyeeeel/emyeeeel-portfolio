import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import PageWipe from "./components/PageWipe.jsx";
import Cursor from "./components/Cursor.jsx";
import useReducedMotion from "./hooks/useReducedMotion.js";
import Home from "./pages/Home.jsx";
import WorkIndexPage from "./pages/WorkIndex.jsx";
import CaseStudy from "./pages/CaseStudy.jsx";
import AboutPage from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

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

  function updateDisplayLocation(loc) {
    displayLocationRef.current = loc;
    setDisplayLocation(loc);
  }

  useEffect(() => {
    if (location.pathname === displayLocationRef.current.pathname) return;

    if (reducedMotion) {
      updateDisplayLocation(location);
      window.scrollTo(0, 0);
      return;
    }

    timers.current.forEach(clearTimeout);
    setStage("covering");

    const t1 = setTimeout(() => {
      updateDisplayLocation(location);
      window.scrollTo(0, 0);
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

    return () => timers.current.forEach(clearTimeout);
  }, [location, reducedMotion]);

  return (
    <>
      <Cursor />
      {!reducedMotion && <PageWipe stage={stage} />}
      <Routes location={displayLocation}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkIndexPage />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
