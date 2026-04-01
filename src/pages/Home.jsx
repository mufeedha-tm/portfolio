import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero.jsx';
import LazySection from '../components/LazySection.jsx';

const About = lazy(() => import('../components/About.jsx'));
const Skills = lazy(() => import('../components/Skills.jsx'));
const Experience = lazy(() => import('../components/Experience.jsx'));
const Projects = lazy(() => import('../components/Projects.jsx'));
const Contact = lazy(() => import('../components/Contact.jsx'));

export default function Home() {
  return (
    <div>
      <Hero />
      <LazySection id="about" minHeight={720} className="lazy-section-anchor">
        <Suspense fallback={null}>
          <About sectionId={undefined} />
        </Suspense>
      </LazySection>
      <LazySection id="skills" minHeight={760} className="lazy-section-anchor">
        <Suspense fallback={null}>
          <Skills sectionId={undefined} />
        </Suspense>
      </LazySection>
      <LazySection id="experience" minHeight={680} className="lazy-section-anchor">
        <Suspense fallback={null}>
          <Experience sectionId={undefined} />
        </Suspense>
      </LazySection>
      <LazySection id="projects" minHeight={920} className="lazy-section-anchor">
        <Suspense fallback={null}>
          <Projects sectionId={undefined} />
        </Suspense>
      </LazySection>
      <LazySection id="contact" minHeight={760} className="lazy-section-anchor">
        <Suspense fallback={null}>
          <Contact sectionId={undefined} />
        </Suspense>
      </LazySection>
    </div>
  );
}
