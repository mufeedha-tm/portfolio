import React, { Suspense, lazy, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Eye, GitBranch, ExternalLink, Server } from 'lucide-react';
import interviewIq from '../assets/interview-iq.svg';
import taskFlow from '../assets/task-flow.svg';
import majestic from '../assets/majestic-optimized.jpg';
import beauty from '../assets/beauty-optimized.jpg';
import expenseTracker from '../assets/expense-tracker.svg';
import TiltCard from './TiltCard.jsx';
import SplitText from './SplitText.jsx';
import MagneticButton from './MagneticButton.jsx';

const ProjectModal = lazy(() => import('./ProjectModal.jsx'));

const projectsData = [
  {
    id: '01',
    title: 'Interview IQ',
    subtitle: 'AI Interview Platform built to simulate real interview environments.',
    category: 'Full Stack',
    year: '2025',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST APIs', 'AI Integration'],
    description:
      'A full-stack AI-powered interview preparation platform with secure authentication, role-based question generation, and real-time practice sessions.',
    fullDescription:
      'Interview IQ is a full-stack AI-powered interview preparation platform that simulates real interview environments. It combines secure JWT authentication, dynamic question generation based on roles, REST API architecture, and an interactive frontend designed to help users practice technical interviews in real time.',
    impact: ['Secure authentication flow', 'Dynamic AI-assisted question generation', 'Full Stack Flagship Project'],
    image: interviewIq,
    link: 'https://interview-iq-ruddy-one.vercel.app',
    backend: 'https://interviewiq-backend-lzdm.onrender.com',
    github: 'https://github.com/mufeedha-tm/interview-iq',
    featured: true,
    badge: 'Full Stack Flagship Project',
  },
  {
    id: '02',
    title: 'Expense Tracker',
    subtitle: 'Responsive expense management with real-time updates and clean state flow.',
    category: 'Frontend',
    year: '2025',
    tech: ['React', 'JavaScript', 'Context API', 'CSS'],
    description:
      'A responsive expense management application for tracking income and expenses with smooth updates, dynamic state handling, and a clean UI.',
    fullDescription:
      'Expense Tracker is a responsive expense management application that allows users to track income and expenses with real-time updates. It focuses on clear data presentation, efficient state handling with Context API, and a streamlined interface that feels smooth across devices.',
    impact: ['Context-driven state updates', 'Responsive financial dashboard', 'Smooth everyday user flow'],
    image: expenseTracker,
    link: 'https://expense-tracker-sage-phi.vercel.app',
    github: 'https://github.com/mufeedha-tm/expense-tracker',
    contain: true,
  },
  {
    id: '03',
    title: 'Task Flow',
    subtitle: 'A productivity-focused task manager with persistent local workflow.',
    category: 'Frontend',
    year: '2025',
    tech: ['React', 'JavaScript', 'CSS', 'Local Storage'],
    description:
      'A task management application built around task creation, completion tracking, and persistent storage with a clean, focused interface.',
    fullDescription:
      'Task Flow is a productivity-focused task management application featuring task creation, completion tracking, and persistent local storage. It is designed with a clean UI and smooth interactions to support more efficient day-to-day workflow management.',
    impact: ['Persistent local storage', 'Task-focused interaction flow', 'Productivity-first UI'],
    image: taskFlow,
    link: 'https://task-flow-pro-lovat.vercel.app',
    github: 'https://github.com/mufeedha-tm/taskFlow-pro',
    contain: true,
  },
  {
    id: '04',
    title: 'Beauty Product UI',
    subtitle: 'Modern beauty product showcase with polished, responsive presentation.',
    category: 'Frontend',
    year: '2025',
    tech: ['React', 'JavaScript', 'CSS', 'Responsive Design'],
    description:
      'A visually appealing beauty product showcase with responsive layouts, interactive UI components, and smooth navigation.',
    fullDescription:
      'Beauty Product UI is a modern showcase website designed to present products through responsive layouts, interactive components, and smooth user navigation. The focus is on clean presentation, front-end composition, and a polished experience across devices.',
    impact: ['Responsive interface design', 'Interactive UI components', 'Clean product presentation'],
    image: beauty,
    link: 'https://react-work-kohl.vercel.app',
    github: 'https://github.com/mufeedha-tm/react-work',
  },
  {
    id: '05',
    title: 'Majestic Pearl',
    subtitle: 'Elegant responsive website with strong structure and visual polish.',
    category: 'Frontend',
    year: '2025',
    tech: ['HTML', 'CSS', 'JavaScript'],
    description:
      'A fully responsive static website designed with elegant UI, structured layouts, and visually engaging presentation.',
    fullDescription:
      'Majestic Pearl is a fully responsive static website built with HTML, CSS, and JavaScript. It focuses on clean design principles, smooth navigation, and structured layouts that create a visually engaging browsing experience.',
    impact: ['Elegant static frontend build', 'Responsive layout execution', 'Clean visual composition'],
    image: majestic,
    link: 'https://mufeedha-tm.github.io/Majestic---Pearl/',
    github: 'https://github.com/mufeedha-tm/Majestic---Pearl',
  },
];

const filters = ['All', 'Full Stack', 'Frontend'];

export default function Projects({ sectionId = 'projects' }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projectsData.filter((project) =>
    activeFilter === 'All' ? true : project.category === activeFilter,
  );

  return (
    <section id={sectionId} className="projects-premium container">
      <motion.div
        className="projects-premium__header"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.65 }}
      >
        <div>
          <span className="section-label">Selected Work</span>
          <h2 className="section-title projects-premium__title">
            <SplitText>Projects that lead with impression and hold up in detail.</SplitText>
          </h2>
        </div>
        <p className="projects-premium__deck">
          Each project is framed like a case study, with a stronger point of view, clearer outcomes, and a visual treatment that feels closer to product work than portfolio filler.
        </p>
      </motion.div>

      <div className="projects-premium__filters">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`projects-premium__filter${activeFilter === filter ? ' is-active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="projects-premium__list">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              layout
              className={`project-case${project.featured ? ' is-featured' : ''}`}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <TiltCard maxRotate={project.featured ? 1.8 : 2.6}>
                <div
                  className="project-case__shell hover-target"
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                >
                  {project.badge ? <div className="project-case__badge">{project.badge}</div> : null}
                  <div className="project-case__meta">
                    <span>{project.id}</span>
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>

                  <div className="project-case__body">
                    <div className="project-case__media">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        sizes={project.featured ? '(max-width: 900px) 100vw, 54vw' : '(max-width: 900px) 100vw, 46vw'}
                        style={project.contain ? { objectFit: 'contain', padding: '3rem', background: 'rgba(255,255,255,0.92)' } : undefined}
                      />
                    </div>

                    <div className="project-case__content">
                      <div className="project-case__headline">
                        <div>
                          <h3>{project.title}</h3>
                          <p className="project-case__subtitle">{project.subtitle}</p>
                        </div>
                        <button
                          type="button"
                          className="project-case__modal-trigger"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedProject(project);
                          }}
                        >
                          Case Study
                        </button>
                      </div>

                      <p className="project-case__description">{project.description}</p>

                      <div className="project-case__impact">
                        {project.impact.map((item) => (
                          <span key={item} className="project-case__impact-item">
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="skills-container project-case__tech">
                        {project.tech.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className="skill-tag project-case__tag"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.28, delay: techIndex * 0.04 }}
                            whileHover={{ y: -4, scale: 1.03 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      <div className="project-case__actions">
                        <span className="project-case__preview">
                          <Eye size={15} />
                          Preview
                        </span>
                        <MagneticButton
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-primary"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <ExternalLink size={16} /> Live
                        </MagneticButton>

                        {project.github ? (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="project-case__source"
                            onClick={(event) => event.stopPropagation()}
                          >
                            <GitBranch size={16} />
                            GitHub
                          </a>
                        ) : null}

                        {project.backend ? (
                          <a
                            href={project.backend}
                            target="_blank"
                            rel="noreferrer"
                            className="project-case__source"
                            onClick={(event) => event.stopPropagation()}
                          >
                            <Server size={16} />
                            Backend
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      <Suspense fallback={null}>
        <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
      </Suspense>
    </section>
  );
}
