import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import usePrefersDark from '../hooks/usePrefersDark.jsx';

export default function Navbar() {
  const [dark, setDark] = usePrefersDark(false);
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-wrapper">
      <nav className="nav container">
        {/* Brand Name for portfolio */}
        <Link to="/" className="brand">Portfolio</Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/projects">Projects</NavLink></li>
          <li><a href="https://github.com/mufeedha-tm" target="_blank" rel="noreferrer">GitHub</a></li>
        </ul>

        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={() => setDark(d => !d)}
            title={dark ? 'Switch to light' : 'Switch to dark'}
            aria-pressed={dark}
          >
            {dark ? '☀' : '🌙'}
          </button>

          {/* Mobile toggle button */}
          <button
            className="icon-btn mobile-toggle"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mobile-menu container"
          >
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/projects" onClick={() => setOpen(false)}>Projects</Link>
            <a href="https://github.com/mufeedha-tm" target="_blank" rel="noreferrer">GitHub</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
