import React, { useContext } from 'react';
import '../styles/ProjectCard.css';
import { ThemeContext } from '../components/ThemeContext';

export default function ProjectCard({ title, description, image, github }) {
  const { darkMode } = useContext(ThemeContext);

  const imageSrc =
    image && typeof image === 'object'
      ? URL.createObjectURL(image)
      : image;

  return (
    <div className={`page-container ${darkMode ? 'dark' : ''}`}>
      <div className="project-card">
        {imageSrc && <img src={imageSrc} alt={title} />}
        <div className="project-info">
          <h3>{title}</h3>
          <p>{description}</p>

          {/* ✅ GitHub link */}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              View on GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
