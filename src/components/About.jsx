import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive Design', 'Git'];

  return (
    <section className="section" id="about">
      <div className="container">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title">
          About
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }} className="lead">
          I moved from a BA English background into frontend development because I love designing interfaces that are
          easy to use and pleasant to look at. I build component-driven UI with a focus on accessibility, responsive layouts,
          and maintainable code. I'm currently learning the MERN stack and building projects that demonstrate real-world UI flows.
        </motion.p>
        <motion.div className="skills" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}>
          {skills.map(skill => (
            <span key={skill} className="skill">{skill}</span>
          ))}
        </motion.div>
        <motion.div style={{ marginTop: 18 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }}>
          <p className="about-extra">
            I enjoy turning design ideas into interactive pages. Semantic HTML, clear component boundaries,
            and scalable styles are my priority. Feel free to check my GitHub for projects and experiments.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
