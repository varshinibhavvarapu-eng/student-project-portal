import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 25px",
      background: "#111827",
      color: "white",
      fontFamily: "Arial"
    }}>

      <div style={{ fontWeight: "bold" }}>
        🎓 Project Portal
      </div>

      <div style={{ display: "flex", gap: "15px", cursor: "pointer" }}>
        <span onClick={() => navigate("/")}>Dashboard</span>
        <span onClick={() => navigate("/add")}>Add</span>
        <span onClick={() => navigate("/projects")}>Projects</span>
      </div>

    </div>
  );
}

export default Navbar;