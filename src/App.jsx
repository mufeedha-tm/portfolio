import React, { Suspense, lazy, useEffect, useMemo, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion';
import usePrefersDark from './hooks/usePrefersDark.jsx';
import useUiSound from './hooks/useUiSound.jsx';
import useEnhancedMotion from './hooks/useEnhancedMotion.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const CustomCursor = lazy(() => import('./components/CustomCursor.jsx'));

export default function App() {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const enhancedMotion = useEnhancedMotion();
  const [dark, setDark] = usePrefersDark(true);
  const { playClick } = useUiSound(true);
  const hasMounted = useRef(false);

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
      '/contact': {
        title: 'Contact | Mufeedha TM Portfolio',
        description:
          'Connect with Mufeedha TM for frontend and full stack opportunities, product-focused collaboration, and polished web experience work.',
      },
    }),
    [],
  );

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
    document.body.classList.toggle('enhanced-cursor', enhancedMotion);

    return () => {
      document.body.classList.remove('enhanced-cursor');
    };
  }, [enhancedMotion]);

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

  const pageTransition = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.28, ease: 'easeOut' },
      };

  const renderPage = (element) => (
    <motion.main className="page-shell" {...pageTransition}>
      {element}
    </motion.main>
  );

  return (
    <div className={`app-root${enhancedMotion ? ' app-root--enhanced' : ''}`}>
      {enhancedMotion ? (
        <Suspense fallback={null}>
          <CustomCursor isDesktop={enhancedMotion} />
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
        onToggleTheme={() => {
          playClick('bright');
          setDark((current) => !current);
        }}
        playClick={playClick}
      />

      <Suspense fallback={<div className="route-fallback" aria-hidden="true" />}>
        <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={renderPage(<Home />)} />
          <Route path="/projects" element={renderPage(<ProjectsPage />)} />
          <Route path="/about" element={renderPage(<AboutPage />)} />
          <Route path="/contact" element={renderPage(<ContactPage />)} />
          <Route path="*" element={renderPage(<Home />)} />
        </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </div>
  );
}
