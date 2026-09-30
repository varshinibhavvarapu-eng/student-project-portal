const BASE_URL = "http://localhost:5000/api/projects";

export async function getProjects() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to load projects");
  return res.json();
}

export async function getProject(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to load project");
  return res.json();
}

export async function createProject(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create project");
  }
  return res.json();
}

export async function updateProject(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to update project");
  }
  return res.json();
}

export async function deleteProject(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete project");
  return res.json();
}