import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container small">
        <p>© {new Date().getFullYear()} Mufeedha TM • Frontend Developer</p>
        <p className="muted">Built with React • Modern UI design</p>
      </div>
    </footer>
  );
}
