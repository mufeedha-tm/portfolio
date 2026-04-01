import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Moon, Sun, GitBranch, ExternalLink } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function Navbar({
  dark,
  onToggleTheme,
  playClick,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const nextY = window.scrollY;
      setScrolled(nextY > 24);
      setHidden(nextY > 160 && nextY > lastY);
      lastY = nextY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', route: '/' },
    { label: 'Work', route: '/projects' },
    { label: 'About', route: '/about' },
    { label: 'Contact', route: '/contact' },
  ];

  const handleBrandClick = (event) => {
    event.preventDefault();
    playClick?.('bright');
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className={`nav-wrapper${scrolled ? ' is-scrolled' : ''}${hidden && !menuOpen ? ' is-hidden' : ''}`}>
      <div className="nav">
        <NavLink to="/" className="brand" onClick={handleBrandClick}>
          <img src={logo} alt="Mufeedha Logo" className="logo" />
          Mufeedha<span className="accent-dot"></span>
        </NavLink>
        
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.route}
                className={({ isActive }) => `nav-link-btn${isActive ? ' active' : ''}`}
                onClick={() => {
                  playClick?.('soft');
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={onToggleTheme}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="https://github.com/mufeedha-tm"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
            aria-label="Visit GitHub profile"
            title="Visit GitHub profile"
            onClick={() => playClick?.('soft')}
          >
            <GitBranch size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/mufeedha-tm"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
            aria-label="Visit LinkedIn profile"
            title="Visit LinkedIn profile"
            onClick={() => playClick?.('soft')}
          >
            <ExternalLink size={18} />
          </a>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              playClick?.('bright');
              setMenuOpen(false);
              navigate('/contact');
            }}
          >
            Let's Talk <ArrowRight size={16} />
          </button>
          <button
            type="button"
            className="icon-btn mobile-toggle"
            onClick={() => {
              playClick?.('soft');
              setMenuOpen(!menuOpen);
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.route}
                className={({ isActive }) => `mobile-menu-link${isActive ? ' active' : ''}`}
                onClick={() => {
                  playClick?.('soft');
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
