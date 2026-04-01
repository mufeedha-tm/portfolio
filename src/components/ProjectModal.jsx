import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, GitBranch, Server } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(5, 5, 5, 0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
      >
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '1000px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <button 
            onClick={onClose} 
            className="icon-btn" 
            style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: 'none' }}
          >
            <X size={24} />
          </button>

          <div style={{ width: '100%', height: '400px', overflow: 'hidden', background: 'var(--bg-base)', position: 'relative' }}>
            <img 
              src={project.image} 
              alt={project.title} 
              loading="eager"
              decoding="async"
              sizes="(max-width: 1000px) 100vw, 1000px"
              style={{ width: '100%', height: '100%', objectFit: project.contain ? 'contain' : 'cover', padding: project.contain ? '2rem' : '0' }}
            />
            {/* Modal Image Overlay Gradient */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, var(--bg-surface), transparent)' }}></div>
          </div>

          <div style={{ padding: '3rem' }}>
            <span className="section-label" style={{ marginBottom: '1rem' }}>{project.category}</span>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{project.title}</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
              {project.fullDescription || project.description}
            </p>

            <div className="skills-container" style={{ marginBottom: '3rem' }}>
              {project.tech.map(t => <span key={t} className="skill-tag">{t}</span>)}
            </div>

            <div className="btn-row">
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" className="btn-primary">
                  Live View <ExternalLink size={18} />
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="btn-ghost">
                  <GitBranch size={18} /> Source Code
                </a>
              )}
              {project.backend && (
                <a href={project.backend} target="_blank" rel="noreferrer" className="btn-ghost">
                  <Server size={18} /> Backend API
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
