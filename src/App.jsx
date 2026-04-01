import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion';
import usePrefersDark from './hooks/usePrefersDark.jsx';
import useActiveSection from './hooks/useActiveSection.jsx';
import useUiSound from './hooks/useUiSound.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const CustomCursor = lazy(() => import('./components/CustomCursor.jsx'));

const SECTION_IDS = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

export default function App() {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const [dark, setDark] = usePrefersDark(true);
  const { soundEnabled, setSoundEnabled, playClick } = useUiSound(false);
  const [isBooting, setIsBooting] = useState(true);
  const hasMounted = useRef(false);
  const activeSection = useActiveSection(SECTION_IDS, location.pathname === '/');

  const pageSeo = useMemo(
    () => ({
      '/': {
        title: 'Mufeedha TM | Full Stack Developer Portfolio',
        description:
          'Portfolio of Mufeedha TM, a full stack developer creating polished React interfaces, responsive layouts, modern web applications, and product-focused digital experiences.',
      },
      '/projects': {
        title: 'Projects | Mufeedha TM Portfolio',
        description:
          'Selected full stack and frontend projects by Mufeedha TM, including AI platforms, responsive React applications, and polished product-style interfaces.',
      },
      '/about': {
        title: 'About | Mufeedha TM Portfolio',
        description:
          'Learn more about Mufeedha TM, a full stack developer from Malappuram, Kerala, blending visual craft, responsive design, and modern web engineering.',
      },
    }),
    [],
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsBooting(false);
    }, prefersReducedMotion ? 0 : 650);

    return () => window.clearTimeout(timeoutId);
  }, [prefersReducedMotion]);

  useEffect(() => {
    document.body.classList.toggle('loading', isBooting);
    return () => document.body.classList.remove('loading');
  }, [isBooting]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return undefined;
    }

    const root = document.documentElement;
    root.classList.add('theme-transition');

    const timeoutId = window.setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 450);

    return () => {
      window.clearTimeout(timeoutId);
      root.classList.remove('theme-transition');
    };
  }, [dark]);

  useEffect(() => {
    const currentSeo = pageSeo[location.pathname] ?? pageSeo['/'];
    const canonicalUrl = `${window.location.origin}${location.pathname}${location.hash}`;

    document.title = currentSeo.title;

    const applyMeta = (selector, value) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute('content', value);
      }
    };

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    }

    applyMeta('meta[name="description"]', currentSeo.description);
    applyMeta('meta[property="og:title"]', currentSeo.title);
    applyMeta('meta[property="og:description"]', currentSeo.description);
    applyMeta('meta[property="og:url"]', canonicalUrl);
    applyMeta('meta[name="twitter:title"]', currentSeo.title);
    applyMeta('meta[name="twitter:description"]', currentSeo.description);
  }, [location.hash, location.pathname, pageSeo]);

  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    if (!location.hash) {
      if (window.scrollY > 40) {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
      return;
    }

    const targetId = location.hash.slice(1);
    const scrollToHash = window.setTimeout(() => {
      const element = document.getElementById(targetId);
      if (!element) {
        return;
      }

      const targetTop = element.getBoundingClientRect().top + window.scrollY - 108;
      window.scrollTo({ top: targetTop, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }, 50);

    return () => window.clearTimeout(scrollToHash);
  }, [location.hash, location.pathname, prefersReducedMotion]);

  const isDesktop = typeof window !== 'undefined' && window.innerWidth > 768;

  const pageTransition = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 30, filter: 'blur(14px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, y: -24, filter: 'blur(10px)' },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      };

  const renderPage = (element) => (
    <motion.main className="page-shell" {...pageTransition}>
      {element}
    </motion.main>
  );

  return (
    <div className="app-root">
      {!isBooting && isDesktop && !prefersReducedMotion ? (
        <Suspense fallback={null}>
          <CustomCursor isDesktop />
        </Suspense>
      ) : null}
      
      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'var(--gradient-primary)',
          transformOrigin: '0%',
          zIndex: 1000
        }}
      />

      {/* Global Floating Blobs */}
      <div className="blob-shape blob-1"></div>
      <div className="blob-shape blob-2"></div>
      
      <Navbar
        dark={dark}
        activeSection={activeSection}
        soundEnabled={soundEnabled}
        onToggleTheme={() => {
          playClick('bright');
          setDark((current) => !current);
        }}
        onToggleSound={() => {
          setSoundEnabled((current) => {
            const next = !current;
            if (!current) {
              window.setTimeout(() => playClick('bright'), 0);
            }
            return next;
          });
        }}
        playClick={playClick}
      />
      
      <AnimatePresence mode="wait">
        {isBooting && <LoadingScreen key="loading-screen" />}
      </AnimatePresence>

      <Suspense fallback={<div className="route-fallback" aria-hidden="true" />}>
        <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={renderPage(<Home />)} />
          <Route path="/projects" element={renderPage(<ProjectsPage />)} />
          <Route path="/about" element={renderPage(<AboutPage />)} />
          <Route path="*" element={renderPage(<Home />)} />
        </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </div>
  );
}
