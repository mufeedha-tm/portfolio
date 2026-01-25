import React from 'react';
import { motion } from 'framer-motion';
import profile from '../assets/profile.jpg';

export default function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img src={profile} alt="Mufeedha" className="hero-profile" />
        <div className="hero-text">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Hello, I'm <span className="accent">Mufeedha</span>
          </motion.h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Frontend Developer • MERN learner • UI-focused
          </motion.p>
          <motion.p
            className="hero-desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            I transform ideas into elegant, responsive interfaces using React. I focus on accessibility, clean design, and practical code.
          </motion.p>
          <motion.div
            className="btn-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <a className="btn-primary" href="/projects">See my work</a>
            <a className="btn-ghost" href="https://github.com/mufeedha-tm" target="_blank" rel="noreferrer">GitHub</a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
