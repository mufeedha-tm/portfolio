import React from 'react';
import { motion } from 'framer-motion';
import SplitText from './SplitText.jsx';

const journey = [
  {
    period: 'Now',
    title: 'Crafting premium frontend experiences',
    focus: 'React, animation systems, responsive polish',
    copy: 'I am focused on building portfolio and product interfaces that feel cinematic without sacrificing clarity, speed, or structure.',
  },
  {
    period: '2023 - 2024',
    title: 'Self-taught engineering foundation',
    focus: 'HTML, CSS, JavaScript, React fundamentals',
    copy: 'This phase was about mastering layout, interaction patterns, component thinking, and the habits needed to move from ideas to shipped screens.',
  },
  {
    period: 'Before Tech',
    title: 'From literature to logic',
    focus: 'Storytelling, analysis, communication',
    copy: 'That background still shapes my work. It helps me think in narrative, tone, and sequencing, which is why I care so much about first impressions and page flow.',
  },
];

export default function Experience({ sectionId = 'experience' }) {
  return (
    <section id={sectionId} className="experience-premium container">
      <motion.div
        className="experience-premium__header"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.65 }}
      >
        <span className="section-label">Journey</span>
        <h2 className="section-title">
          <SplitText>How the craft evolved.</SplitText>
        </h2>
      </motion.div>

      <div className="experience-premium__list">
        {journey.map((item, index) => (
          <motion.article
            key={item.title}
            className="experience-premium__card"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
          >
            <div className="experience-premium__index">{String(index + 1).padStart(2, '0')}</div>
            <div className="experience-premium__content">
              <div className="experience-premium__meta">
                <span>{item.period}</span>
                <span>{item.focus}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
