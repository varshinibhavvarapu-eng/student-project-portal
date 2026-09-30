import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-mark small">SP</span>
          <span>Student Project Portal</span>
        </div>
        <p className="footer-note">
          Built for showcasing student work — projects, stacks, and demos in one place.
        </p>
        <p className="footer-copy">© {year} Student Project Portal. All records stored securely.</p>
      </div>
    </footer>
  );
}