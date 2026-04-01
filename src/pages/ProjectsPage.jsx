import React, { useEffect } from 'react';
import Projects from '../components/Projects.jsx';
import Contact from '../components/Contact.jsx'; // Include contact at the bottom

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '100px' }}>
      <Projects />
      <Contact />
    </div>
  );
}