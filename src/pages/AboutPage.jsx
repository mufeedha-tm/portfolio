import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import Experience from '../components/Experience.jsx';
import MagneticButton from '../components/MagneticButton.jsx';

export default function AboutPage() {
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
          <span className="section-label">About</span>
          <h1 className="page-hero__title">A full stack developer shaped by visual storytelling and product-minded execution.</h1>
          <p className="page-hero__copy">
            This page focuses on how I think, what I build, and why my work aims to feel both visually elevated and technically dependable.
          </p>
        </motion.div>
      </section>

      <About />
      <Skills />
      <Experience />

      <section className="container">
        <div className="cta-panel">
          <div>
            <span className="section-label">Next Move</span>
            <h2 className="cta-panel__title">Interested in the work behind the introduction?</h2>
            <p className="cta-panel__copy">
              Move into the projects page to see the strongest case studies, or head to contact if you want to start a conversation directly.
            </p>
          </div>
          <div className="btn-row">
            <MagneticButton to="/projects" className="btn-primary">View Projects</MagneticButton>
            <MagneticButton to="/contact" className="btn-ghost">Contact Me</MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
