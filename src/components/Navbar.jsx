import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

function getScrollBehavior() {
  if (typeof window === 'undefined') {
    return 'auto';
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

export default function Navbar({
  dark,
  activeSection,
  soundEnabled,
  onToggleTheme,
  onToggleSound,
  playClick,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
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

  const isHome = location.pathname === '/';

  const navItems = [
    { label: 'Work', sectionId: 'projects', route: '/projects' },
    { label: 'About', sectionId: 'about', route: '/about' },
    { label: 'Contact', sectionId: 'contact', route: '/#contact' },
  ];

  const handleSectionNavigation = (sectionId) => {
    playClick?.('soft');
    setMenuOpen(false);

    if (isHome) {
      const element = document.getElementById(sectionId);
      if (!element) {
        return;
      }

      const targetTop = element.getBoundingClientRect().top + window.scrollY - 108;
      window.scrollTo({ top: targetTop, behavior: getScrollBehavior() });
      return;
    }

    navigate(`/#${sectionId}`);
  };

  const handleBrandClick = (event) => {
    event.preventDefault();
    playClick?.('bright');
    setMenuOpen(false);

    if (isHome) {
      window.scrollTo({ top: 0, behavior: getScrollBehavior() });
      return;
    }

    navigate('/');
  };

  return (
    <nav className={`nav-wrapper${scrolled ? ' is-scrolled' : ''}${hidden && !menuOpen ? ' is-hidden' : ''}`}>
      <div className="nav">
        <NavLink to="/" className="brand" onClick={handleBrandClick}>
          Mufeedha<span className="accent-dot"></span>
        </NavLink>
        
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.label}>
              {isHome ? (
                <button
                  type="button"
                  className={`nav-link-btn${activeSection === item.sectionId ? ' active' : ''}`}
                  onClick={() => handleSectionNavigation(item.sectionId)}
                >
                  {item.label}
                </button>
              ) : (
                <NavLink
                  to={item.route}
                  className={({ isActive }) =>
                    item.route.startsWith('/#')
                      ? 'nav-link-btn'
                      : `nav-link-btn${isActive ? ' active' : ''}`
                  }
                  onClick={() => {
                    playClick?.('soft');
                    setMenuOpen(false);
                  }}
                >
                  {item.label}
                </NavLink>
              )}
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
          <button
            type="button"
            className="icon-btn sound-toggle"
            aria-label={soundEnabled ? 'Disable interface sounds' : 'Enable interface sounds'}
            title={soundEnabled ? 'Disable interface sounds' : 'Enable interface sounds'}
            onClick={onToggleSound}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button type="button" className="btn-primary" onClick={() => handleSectionNavigation('contact')}>
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
              <button 
                key={item.label}
                type="button"
                className={`mobile-menu-link${activeSection === item.sectionId ? ' active' : ''}`}
                onClick={() => handleSectionNavigation(item.sectionId)}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
