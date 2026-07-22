import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logotype from "../components/Logotype.jsx";
import "./NotFound.css";

function NotFound() {
  const [glitchKey, setGlitchKey] = useState(0);

  useEffect(() => {
    document.title = "emyeeeel — 404";
  }, []);

  return (
    <div className="not-found">
      <div className="not-found__noise" aria-hidden="true" />

      <header className="not-found__header">
        <Link to="/" className="not-found__logo" aria-label="emyeeeel — home">
          <Logotype />
        </Link>
      </header>

      <main className="not-found__main">
        <p className="not-found__eyebrow">error 404</p>
        <h1
          key={glitchKey}
          className="not-found__title"
          data-text="Signal lost."
          onMouseEnter={() => setGlitchKey((key) => key + 1)}
        >
          Signal lost.
        </h1>
        <p className="not-found__hint">
          ↳ this address doesn't exist, or the connection dropped somewhere
          between here and there.
        </p>
        <Link to="/" className="not-found__cta">
          go home
        </Link>
      </main>
    </div>
  );
}

export default NotFound;
