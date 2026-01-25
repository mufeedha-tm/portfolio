import React from 'react';

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-media">
        <img src={project.image} alt={project.title} style={project.style || {}} />
      </div>
      <div className="project-body">
        <h3>{project.title} <span className="muted">• {project.subtitle}</span></h3>
        <p className="muted">{project.description}</p>
        <a className="project-link" href={project.link} target="_blank" rel="noreferrer">Open</a>
      </div>
    </article>
  );
}
