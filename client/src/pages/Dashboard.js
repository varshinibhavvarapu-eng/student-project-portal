import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/api";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch(() => setError("Could not reach the server. Is the backend running on port 5000?"))
      .finally(() => setLoading(false));
  }, []);

  const totalProjects = projects.length;
  const sections = new Set(projects.map((p) => p.section)).size;
  const withDemo = projects.filter((p) => p.demoLink).length;

  return (
    <div className="page">
      <span className="eyebrow">// dashboard</span>
      <h1>Overview</h1>
      <p className="hero-sub">A quick look at everything logged so far.</p>

      <section className="stats-strip">
        <div className="stat-block">
          <span className="stat-number">{loading ? "—" : totalProjects}</span>
          <span className="stat-label">Projects Logged</span>
        </div>
        <div className="stat-block">
          <span className="stat-number">{loading ? "—" : sections}</span>
          <span className="stat-label">Sections Represented</span>
        </div>
        <div className="stat-block">
          <span className="stat-number">{loading ? "—" : withDemo}</span>
          <span className="stat-label">Live Demos Linked</span>
        </div>
      </section>

      <div className="section-heading">
        <h2>Recently added</h2>
        <Link to="/projects" className="link-arrow">See all →</Link>
      </div>

      {error && <p className="empty-state error">{error}</p>}
      {!error && loading && <p className="empty-state">Loading records…</p>}
      {!error && !loading && projects.length === 0 && (
        <p className="empty-state">No projects logged yet. <Link to="/add-project">Add the first one →</Link></p>
      )}

      <div className="recent-list">
        {projects.slice(0, 5).map((p) => (
          <Link to={`/projects/${p._id}`} className="recent-row" key={p._id}>
            <span className="recent-row-name">{p.projectName}</span>
            <span className="recent-row-meta">{p.studentName} · Sec {p.section}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}