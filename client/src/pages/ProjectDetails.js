import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProject, deleteProject } from "../services/api";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getProject(id)
      .then(setProject)
      .catch(() => setError("Project not found."));
  }, [id]);

  async function handleDelete() {
    if (!window.confirm("Remove this project record?")) return;
    await deleteProject(id);
    navigate("/projects");
  }

  if (error) return <p className="empty-state error">{error}</p>;
  if (!project) return <p className="empty-state">Loading…</p>;

  const tags = project.techStack.split(",").map((t) => t.trim()).filter(Boolean);

  return (
    <div className="page">
      <span className="eyebrow">// project_record</span>
      <div className="detail-card">
        <h1 style={{ fontSize: 26 }}>{project.projectName}</h1>
        <p className="spec-student">by {project.studentName} · Section {project.section}</p>
        <p className="spec-description" style={{ display: "block" }}>{project.description}</p>

        <div className="spec-tags">
          {tags.map((tag, i) => <span className="tag-pill" key={i}>{tag}</span>)}
        </div>

        <div className="detail-actions">
          <a href={project.githubLink} target="_blank" rel="noreferrer" className="btn btn-ghost">◆ GitHub</a>
          {project.demoLink && (
            <a href={project.demoLink} target="_blank" rel="noreferrer" className="btn btn-primary">▸ Live Demo</a>
          )}
          <Link to={`/edit-project/${project._id}`} className="btn btn-ghost">Edit</Link>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}