import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  useEffect(() => {
    document.title = "emyeeeel — 404";
  }, []);

  return (
    <div className="not-found">
      <p className="not-found__code">404 — nothing here</p>
      <Link to="/" className="not-found__link">
        ← home
      </Link>
    </div>
  );
}

export default NotFound;
