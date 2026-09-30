import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProject, updateProject } from "../services/api";
import "./AddProject.css";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });

  useEffect(() => {
    getProject(id)
      .then(setForm)
      .catch(() => setStatus({ loading: false, error: "Could not load this project.", success: "" }));
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: "" });
    try {
      await updateProject(id, form);
      setStatus({ loading: false, error: "", success: "Changes saved." });
      setTimeout(() => navigate(`/projects/${id}`), 900);
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: "" });
    }
  }

  if (!form) return <p className="empty-state">{status.error || "Loading…"}</p>;

  return (
    <div className="page">
      <span className="eyebrow">// edit_record</span>
      <h1>Edit project</h1>
      <p className="hero-sub">Update the details below and save.</p>

      <form className="spec-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="projectName">Project name</label>
            <input id="projectName" name="projectName" value={form.projectName} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="studentName">Student name</label>
            <input id="studentName" name="studentName" value={form.studentName} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="section">Section</label>
            <input id="section" name="section" value={form.section} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="techStack">Technology used</label>
            <input id="techStack" name="techStack" value={form.techStack} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="githubLink">GitHub repository link</label>
            <input id="githubLink" name="githubLink" type="url" value={form.githubLink} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="demoLink">Live demo link (optional)</label>
            <input id="demoLink" name="demoLink" type="url" value={form.demoLink} onChange={handleChange} />
          </div>
          <div className="field field-full">
            <label htmlFor="description">Project description</label>
            <textarea id="description" name="description" rows={5} value={form.description} onChange={handleChange} required />
          </div>
        </div>

        {status.error && <p className="form-message error">{status.error}</p>}
        {status.success && <p className="form-message success">{status.success}</p>}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={status.loading}>
            {status.loading ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}