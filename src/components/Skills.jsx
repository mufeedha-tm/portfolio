import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SplitText from './SplitText.jsx';

const skillCategories = [
  {
    title: 'Frontend Architecture',
    skills: ['React', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3 / SASS', 'Framer Motion', 'GSAP', 'Next.js']
  },
  {
    title: 'Backend & Data',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'GraphQL', 'Mongoose']
  },
  {
    title: 'Tooling & Workflow',
    skills: ['Git & GitHub', 'Webpack / Vite', 'Responsive Design', 'Figma', 'UI/UX Principles', 'Vercel']
  }
];

export default function Skills({ sectionId = 'skills' }) {
  const prefersReducedMotion = useReducedMotion();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { type: 'spring', stiffness: 200, damping: 20 } 
    }
  };

  return (
    <section id={sectionId} className="container" style={{ position: 'relative' }}>
      
      <div className="glow" style={{ width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 60%)', left: '80%', top: '50%' }}></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '4rem' }}
      >
        <span className="section-label" style={{ color: 'var(--accent-purple)' }}>Arsenal</span>
        <h2 className="section-title">
          <SplitText>Technical Expertise</SplitText>
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        {skillCategories.map((category, idx) => (
          <motion.div 
            key={category.title}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'var(--glass-blur)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Inner subtle glow based on index */}
            <div style={{
              position: 'absolute', top: 0, right: 0, width: '150px', height: '150px',
              background: idx === 0 ? 'rgba(121, 40, 202, 0.1)' : idx === 1 ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255, 0, 128, 0.1)',
              filter: 'blur(40px)', borderRadius: '50%', pointerEvents: 'none'
            }}></div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', fontFamily: 'var(--font-display)' }}>
              {category.title}
            </h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {category.skills.map((skill) => (
                <motion.div
                  key={skill}
                  variants={itemVariants}
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px var(--accent-cyan)', borderColor: 'var(--accent-cyan)' }}
                    className="hover-target"
                    style={{
                      background: 'var(--bg-base)',
                      border: '1px solid var(--border-strong)',
                      padding: '0.8rem 1.5rem',
                      borderRadius: '100px',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      cursor: 'none',
                      transition: 'border-color 0.3s'
                    }}
                  >
                    {skill}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
