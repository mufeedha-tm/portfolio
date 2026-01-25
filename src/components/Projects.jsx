import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard.jsx';
import majestic from '../assets/majestic.png';
import beauty from '../assets/beauty.png';
import githubImg from '../assets/github.png';

const projects = [
  { id: 1, title: 'Majestic Pearl', subtitle: 'Resort Website', description: 'A beautiful resort website focusing on imagery and booking CTAs.', image: majestic, link: 'https://mufeedha-tm.github.io/Majestic---Pearl/' },
  { id: 2, title: 'Beauty Products', subtitle: 'React Demo', description: 'A React project for showcasing beauty products and components.', image: beauty, link: 'https://react-work-kohl.vercel.app/' },
  { id: 3, title: 'GitHub', subtitle: 'Code samples', description: 'My GitHub repository list and small experiments.', image: githubImg, link: 'https://github.com/mufeedha-tm' }
];

export default function Projects() {
  return (
    <section id="projects" className="section bg-alt">
      <div className="container">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title">
          Selected Projects
        </motion.h2>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <motion.div key={p.id} whileHover={{ y: -6 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i }}>
              <ProjectCard project={{
                ...p,
                image: p.title === 'GitHub' ? githubImg : p.image,
                style: p.title === 'GitHub' ? { height: '120px', objectFit: 'contain' } : {}
              }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
