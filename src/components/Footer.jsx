import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer footer-premium">
      <div className="footer-premium__brand">
        <div className="brand">
          Mufeedha TM<span className="accent-dot"></span>
        </div>
        <p className="footer-premium__note">
          Full stack developer from Malappuram, Kerala, building premium web experiences with polished UI, responsive systems, and modern product-focused engineering.
        </p>
      </div>

      <div className="footer-premium__links">
        <a href="/projects">Projects</a>
        <a href="/about">About</a>
        <a href="/#contact">Contact</a>
        <a href="https://github.com/mufeedha-tm" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/mufeedha-tm" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>

      <div className="footer-premium__meta">&copy; {currentYear} Mufeedha TM</div>
    </footer>
  );
}
