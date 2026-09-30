import React from "react";
import { Link } from "react-router-dom";

export default function ViewProjects({ projects, onDelete }) {
  if (projects.length === 0) return null;

  return (
    <div className="card-grid">
      {projects.map((p) => {
        const tags = (p.technology || p.techStack || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        return (
          <article className="spec-card" key={p._id}>
            <div className="spec-card-header">
              <span className="spec-stamp">SEC {p.department || p.section || "N/A"}</span>
              <span className="spec-id">#{p._id.slice(-6).toUpperCase()}</span>
            </div>

            <Link to={`/projects/${p._id}`}>
              <h3 className="spec-title">{p.title || p.projectName || "Untitled Project"}</h3>
            </Link>
            <p className="spec-student">by {p.studentName}</p>
            <p className="spec-description">{p.description}</p>

            <div className="spec-tags">
              {tags.map((tag, i) => (
                <span className="tag-pill" key={i}>{tag}</span>
              ))}
            </div>

            <div className="spec-footer">
              <a href={p.githubLink} target="_blank" rel="noreferrer" className="spec-link github">◆ GitHub</a>
              {p.demoLink ? (
                <a href={p.demoLink} target="_blank" rel="noreferrer" className="spec-link demo">▸ Live Demo</a>
              ) : (
                <span className="spec-link disabled">No demo</span>
              )}
              {onDelete && (
                <button className="spec-link delete" onClick={() => onDelete(p._id)}>✕ Remove</button>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}