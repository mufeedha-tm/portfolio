import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Blocks, Code, Sparkles } from 'lucide-react';
import profile from '../assets/profile-optimized.jpg';
import TiltCard from './TiltCard.jsx';
import MagneticButton from './MagneticButton.jsx';
import useEnhancedMotion from '../hooks/useEnhancedMotion.jsx';

const roles = ['Full Stack Product Experiences', 'Premium React Interfaces', 'Modern MERN-Driven Builds'];
const signals = ['Full stack thinking', 'Polished, responsive execution', 'Professional project storytelling'];
const spotlight = ['Interview IQ', 'Task Flow', 'Majestic Pearl'];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const enhancedMotion = useEnhancedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], enhancedMotion ? [0, 120] : [0, 0]);
  const opacity = useTransform(scrollY, [0, 520], enhancedMotion ? [1, 0.45] : [1, 1]);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || !enhancedMotion) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, [enhancedMotion, prefersReducedMotion]);

  return (
    <section className="hero hero-premium" id="home">
      <div className="hero-premium__grid container">
        <motion.div
          className="hero-premium__content"
          style={{ opacity }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-premium__eyebrow">
            <span className="section-label">Full Stack Developer</span>
            <span className="hero-premium__availability">Open to full stack and frontend roles where polished UI, scalable architecture, and product-quality execution matter.</span>
          </div>

          <h1 className="hero-premium__title">
            Full stack products with
            <span> premium visual impact.</span>
          </h1>

          <div className="hero-premium__role-band" aria-live="polite">
            <span className="hero-premium__role-label">Currently shaping</span>
            <div className="hero-premium__role-track">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  className="hero-premium__role-text"
                  initial={{ opacity: 0, y: enhancedMotion ? 20 : 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: enhancedMotion ? -20 : 0 }}
                  transition={{ duration: enhancedMotion ? 0.35 : 0.15, ease: 'easeOut' }}
                >
                  {roles[roleIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <p className="hero-premium__copy">
            I am Mufeedha TM, a full stack developer from Malappuram, Kerala, building modern web experiences with React, JavaScript, Node.js, and thoughtful interaction design.
            I focus on products that feel visually refined on the surface and well-structured underneath, so recruiters and teams see both creativity and engineering confidence immediately.
          </p>

          <div className="btn-row hero-premium__actions">
            <MagneticButton to="/projects" className="btn-primary">
              View Selected Work <ArrowUpRight size={18} />
            </MagneticButton>
            <MagneticButton to="/contact" className="btn-ghost">
              Start a Conversation
            </MagneticButton>
          </div>

          <div className="hero-premium__signals">
            {signals.map((signal) => (
              <div key={signal} className="hero-premium__signal-card">
                <Sparkles size={16} />
                <span>{signal}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero-premium__visual"
          style={{ y }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-premium__frame">
            <TiltCard maxRotate={4}>
              <div className="hero-premium__portrait-card">
                <div className="hero-premium__portrait-shell">
                  <img
                    className="hero-premium__portrait"
                    src={profile}
                    alt="Portrait of Mufeedha TM"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    sizes="(max-width: 768px) 82vw, 420px"
                  />
                  <div className="hero-premium__floating-chip hero-premium__floating-chip--left">
                    <Code size={16} />
                    React + Motion
                  </div>
                  <div className="hero-premium__floating-chip hero-premium__floating-chip--right">
                    <Blocks size={16} />
                    Built for impact
                  </div>
                </div>
              </div>
            </TiltCard>

            <div className="hero-premium__insight-grid">
              <div className="hero-premium__insight-card">
                <span className="hero-premium__insight-label">Selected Projects</span>
                <div className="hero-premium__insight-list">
                  {spotlight.map((item, index) => (
                    <div key={item} className="hero-premium__insight-item">
                      <span className="hero-premium__insight-index">{String(index + 1).padStart(2, '0')}</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-premium__insight-card hero-premium__insight-card--accent">
                <span className="hero-premium__insight-label">Why it lands</span>
                <p>
                  Strong hierarchy, tactile motion, and project storytelling that reads like product work, not coursework.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
