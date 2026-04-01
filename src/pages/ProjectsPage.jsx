import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Projects from '../components/Projects.jsx';
import MagneticButton from '../components/MagneticButton.jsx';

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="editorial-page">
      <section className="container">
        <motion.div
          className="page-hero"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <span className="section-label">Projects</span>
          <h1 className="page-hero__title">Case studies presented with more clarity, atmosphere, and product confidence.</h1>
          <p className="page-hero__copy">
            This page is dedicated to the work itself, with flagship presentation, focused project breakdowns, and a cleaner stage for each build to stand out.
          </p>
        </motion.div>
      </section>

      <Projects />

      <section className="container">
        <div className="cta-panel">
          <div>
            <span className="section-label">Collaboration</span>
            <h2 className="cta-panel__title">If one of these builds fits your team’s direction, let’s talk.</h2>
            <p className="cta-panel__copy">
              I’m open to frontend and full stack opportunities where product quality, strong interfaces, and clean execution matter.
            </p>
          </div>
          <div className="btn-row">
            <MagneticButton to="/contact" className="btn-primary">Start a Conversation</MagneticButton>
            <MagneticButton to="/about" className="btn-ghost">Read My Story</MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
