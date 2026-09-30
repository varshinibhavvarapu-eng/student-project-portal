import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects, deleteProject } from "../services/api";
import ViewProjects from "./ViewProjects";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => { load(); }, []);

  function load() {
    setLoading(true);
    getProjects()
      .then((data) => setProjects(data))
      .catch(() => setError("Could not reach the server. Is the backend running on port 5000?"))
      .finally(() => setLoading(false));
  }

  async function handleDelete(id) {
    if (!window.confirm("Remove this project record?")) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Could not delete the project. Try again.");
    }
  }

  const filtered = projects.filter((p) => {
    const q = query.toLowerCase();
    return (
      (p.title || p.projectName || "").toLowerCase().includes(q) ||
      (p.studentName || "").toLowerCase().includes(q) ||
      (p.department || p.section || "").toLowerCase().includes(q) ||
      (p.technology || p.techStack || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="page">
      <span className="eyebrow">// all_records</span>
      <h1>All projects</h1>
      <p className="hero-sub">Live data pulled straight from the database.</p>

      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search by project, student, section, or tech…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="result-count">{filtered.length} result{filtered.length !== 1 && "s"}</span>
      </div>

      {error && <p className="empty-state error">{error}</p>}
      {!error && loading && <p className="empty-state">Loading records…</p>}
      {!error && !loading && filtered.length === 0 && (
        <p className="empty-state">No matching projects. <Link to="/add-project">Add a new one →</Link></p>
      )}

      <ViewProjects projects={filtered} onDelete={handleDelete} />
    </div>
  );
}