import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../services/api";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);

  const totalProjects = projects.length;
  const sections = new Set(projects.map((p) => p.section)).size;
  const withDemo = projects.filter((p) => p.demoLink).length;

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Student Project Portal</h1>
          <p>
            Submit your project, browse what every section has built, and jump straight to the
            repo or live demo — all in one place.
          </p>
          <div className="hero-buttons">
            <button onClick={() => navigate("/add-project")}>+ Add Project</button>
            <button className="secondary" onClick={() => navigate("/projects")}>
              Browse Projects
            </button>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="card">
          <h2>{totalProjects}</h2>
          <p>Projects Logged</p>
        </div>
        <div className="card">
          <h2>{sections}</h2>
          <p>Sections Represented</p>
        </div>
        <div className="card">
          <h2>{withDemo}</h2>
          <p>Live Demos Linked</p>
        </div>
      </section>
    </>
  );
}