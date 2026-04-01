import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SplitText from './SplitText.jsx';
import MagneticButton from './MagneticButton.jsx';

const proofCards = [
  {
    title: 'Design-Led Full Stack Thinking',
    copy: 'I care about how a product looks, feels, and flows, then I support that experience with clean implementation across both frontend and backend layers.',
  },
  {
    title: 'Product Clarity',
    copy: 'I build portfolio and product experiences that communicate value quickly, so the work feels professional, purposeful, and easy to trust.',
  },
  {
    title: 'Professional Execution',
    copy: 'From responsive UI systems to API-backed applications, I aim for builds that feel reliable, polished, and ready for real users.',
  },
];

const strengths = ['Full stack development', 'React and modern JavaScript', 'Responsive UI systems', 'Node.js and backend workflows'];

export default function About({ sectionId = 'about' }) {
  return (
    <section id={sectionId} className="about-premium container">
      <div className="about-premium__grid">
        <motion.div
          className="about-premium__intro"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.65 }}
        >
          <span className="section-label">Perspective</span>
          <h2 className="section-title about-premium__title">
            <SplitText>Attractive, professional products built with both visual taste and technical depth.</SplitText>
          </h2>

          <p className="lead about-premium__lead">
            I'm Mufeedha TM, a full stack developer from Malappuram, Kerala, focused on building digital products that feel polished, modern, and thoughtfully engineered.
          </p>

          <p className="about-premium__body">
            I enjoy turning ideas into complete web experiences, from visually engaging interfaces to the application logic behind them. My work centers on React, JavaScript,
            Node.js, responsive design, and clean product structure that helps every project feel professional instead of ordinary.
          </p>

          <div className="about-premium__strengths">
            {strengths.map((strength) => (
              <span key={strength} className="about-premium__strength-pill">
                {strength}
              </span>
            ))}
          </div>

          <div className="btn-row about-premium__actions">
            <MagneticButton to="/projects" className="btn-primary">
              See the Work <ArrowUpRight size={16} />
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          className="about-premium__proof"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          <div className="about-premium__metric">
            <span className="about-premium__metric-value">Full Stack</span>
            <span className="about-premium__metric-copy">
              I build experiences that combine attractive frontend presentation with practical, scalable engineering underneath.
            </span>
          </div>

          <div className="about-premium__proof-grid">
            {proofCards.map((card) => (
              <article key={card.title} className="about-premium__proof-card">
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
