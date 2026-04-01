import React, { useEffect } from 'react';
import About from '../components/About.jsx';
import Experience from '../components/Experience.jsx';
import Contact from '../components/Contact.jsx';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '100px' }}>
      <About />
      <Experience />
      <Contact />
    </div>
  );
}