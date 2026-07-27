import { useState } from "react";
import { Link } from "react-router-dom";
import MediaWithFallback from "./MediaWithFallback.jsx";
import "./WorkPreviewCard.css";

function WorkPreviewCard({ project }) {
  const [mediaErrored, setMediaErrored] = useState(false);
  const tags = project.tag
    .split("/")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const logoBgStyle = {
    backgroundImage: `url(${project.logoBg}), linear-gradient(160deg, #1c1c22, #0a0a0d)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <Link to={`/work/${project.slug}`} className="work-preview-card">
      <div className="work-preview-card__logo" style={logoBgStyle}>
        <img
          src={project.logo}
          alt=""
          className="work-preview-card__logo-img"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      {/* <div
        className="work-preview-card__logo"
        style={{
          backgroundImage: `url(${project.project_logo_bg}), linear-gradient(160deg, #1c1c22, #0a0a0d)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      /> */}

      {project.project_preview && !mediaErrored && (
        <div className="work-preview-card__preview">
          <MediaWithFallback
            src={project.project_preview}
            alt=""
            label={project.mediaLabel}
            className="work-preview-card__media"
            placeholderClassName="work-preview-card__placeholder"
            onError={() => setMediaErrored(true)}
          />
        </div>
      )}

      <span className="work-preview-card__arrow" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="25"
          height="25"
        >
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </span>

      <div className="work-preview-card__footer">
        <div className="work-preview-card__brand">
          <span className="work-preview-card__title">{project.title}</span>
        </div>
        <div className="work-preview-card__tags">
          {tags.map((tag) => (
            <span key={tag} className="work-preview-card__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default WorkPreviewCard;
