import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness, Mail, Sparkles, UserRound } from 'lucide-react';
import Hero from '../components/Hero.jsx';
import MagneticButton from '../components/MagneticButton.jsx';

const routeCards = [
  {
    title: 'Selected Work',
    copy: 'Step into full stack and frontend case studies that feel presented like product launches, not simple screenshots.',
    route: '/projects',
    meta: 'Flagship builds',
    icon: BriefcaseBusiness,
  },
  {
    title: 'About & Craft',
    copy: 'See the thinking behind the work, the design instincts I bring, and the technical path shaping me as a full stack developer.',
    route: '/about',
    meta: 'Story + skills',
    icon: UserRound,
  },
  {
    title: 'Contact',
    copy: 'A dedicated recruiter-ready page with direct channels, current availability, and a focused invitation to connect.',
    route: '/contact',
    meta: 'Open to roles',
    icon: Mail,
  },
];

const featuredMoments = [
  {
    name: 'Interview IQ',
    type: 'Full Stack flagship',
    detail: 'AI interview platform with secure auth, role-based question generation, and real-time practice.',
  },
  {
    name: 'Task Flow',
    type: 'Frontend productivity',
    detail: 'Clean task management with persistent local workflow and smooth interaction pacing.',
  },
  {
    name: 'Beauty Product UI',
    type: 'Visual presentation',
    detail: 'Responsive product storytelling with polished layouts and strong interface composition.',
  },
];

export default function Home() {
  return (
    <div>
      <Hero />

      <section className="home-portal container">
        <motion.div
          className="page-hero page-hero--compact"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
        >
          <span className="section-label">Portfolio Atlas</span>
          <h2 className="page-hero__title">A multi-page portfolio designed like a curated digital identity.</h2>
          <p className="page-hero__copy">
            Instead of placing everything in one long scroll, each page has a clear role: work, story, and contact all have space to feel intentional.
          </p>
        </motion.div>

        <div className="home-portal__grid">
          {routeCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                className="portal-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="portal-card__meta">
                  <span>{card.meta}</span>
                  <Icon size={18} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <MagneticButton to={card.route} className="portal-card__link">
                  Explore Page <ArrowRight size={16} />
                </MagneticButton>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="container home-moments">
        <div className="home-moments__shell">
          <div className="home-moments__intro">
            <span className="section-label">Quick Preview</span>
            <h2 className="section-title">A few standout moments from the work.</h2>
          </div>

          <div className="home-moments__list">
            {featuredMoments.map((item, index) => (
              <motion.article
                key={item.name}
                className="home-moments__card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <span className="home-moments__type">{item.type}</span>
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
              </motion.article>
            ))}
          </div>

          <div className="home-moments__cta">
            <Sparkles size={18} />
            <span>Built to feel sharper than a standard portfolio template.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
