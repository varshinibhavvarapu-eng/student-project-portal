import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../services/api";
import "./AddProject.css";

const initialForm = {
  projectName: "", studentName: "", section: "", techStack: "",
  githubLink: "", demoLink: "", description: "",
};

export default function AddProject() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: "" });
    try {
      await createProject(form);
      setStatus({ loading: false, error: "", success: "Project saved to the database." });
      setForm(initialForm);
      setTimeout(() => navigate("/projects"), 900);
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: "" });
    }
  }

  return (
    <div className="page">
      <span className="eyebrow">// new_record</span>
      <h1>Add a project</h1>
      <p className="hero-sub">Fill in the spec sheet below. It's saved straight to the portal's database.</p>

      <form className="spec-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="projectName">Project name</label>
            <input id="projectName" name="projectName" value={form.projectName} onChange={handleChange} placeholder="e.g. Smart Attendance Tracker" required />
          </div>
          <div className="field">
            <label htmlFor="studentName">Student name</label>
            <input id="studentName" name="studentName" value={form.studentName} onChange={handleChange} placeholder="e.g. Varshini K" required />
          </div>
          <div className="field">
            <label htmlFor="section">Section</label>
            <input id="section" name="section" value={form.section} onChange={handleChange} placeholder="e.g. CSE-B" required />
          </div>
          <div className="field">
            <label htmlFor="techStack">Technology used</label>
            <input id="techStack" name="techStack" value={form.techStack} onChange={handleChange} placeholder="e.g. React, Node.js, MongoDB" required />
          </div>
          <div className="field">
            <label htmlFor="githubLink">GitHub repository link</label>
            <input id="githubLink" name="githubLink" type="url" value={form.githubLink} onChange={handleChange} placeholder="https://github.com/username/repo" required />
          </div>
          <div className="field">
            <label htmlFor="demoLink">Live demo link (optional)</label>
            <input id="demoLink" name="demoLink" type="url" value={form.demoLink} onChange={handleChange} placeholder="https://your-demo-url.com" />
          </div>
          <div className="field field-full">
            <label htmlFor="description">Project description</label>
            <textarea id="description" name="description" rows={5} value={form.description} onChange={handleChange} placeholder="What does the project do, what problem does it solve, and how does it work?" required />
          </div>
        </div>

        {status.error && <p className="form-message error">{status.error}</p>}
        {status.success && <p className="form-message success">{status.success}</p>}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={status.loading}>
            {status.loading ? "Saving…" : "Save Project"}
          </button>
        </div>
      </form>
    </div>
  );
}