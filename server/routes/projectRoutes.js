const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET all projects (newest first)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects", error: err.message });
  }
});

// GET single project by id
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch project", error: err.message });
  }
});

// POST create a new project
router.post("/", async (req, res) => {
  try {
    const { projectName, studentName, section, techStack, githubLink, demoLink, description } = req.body;

    if (!projectName || !studentName || !section || !techStack || !githubLink || !description) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const newProject = new Project({
      title: projectName,
      studentName,
      department: section,
      technology: techStack,
      githubLink,
      demoLink,
      description,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ message: "Failed to create project", error: err.message });
  }
});

// PUT update a project
router.put("/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update project", error: err.message });
  }
});

// DELETE a project
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete project", error: err.message });
  }
});

module.exports = router;