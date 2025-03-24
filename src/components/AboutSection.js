import React, { useContext } from 'react';
import '../styles/AboutSection.css';
import { ThemeContext } from '../components/ThemeContext';

export default function AboutSection({ profilePicture, about, skills, interests }) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <section className={`about ${darkMode ? 'dark' : ''}`} id="about">
      <h2>About Me</h2>
      <div className="about-content">
        {profilePicture &&<img src={profilePicture} alt="Profile" className="about-img" />}
        <div className="about-text">
          <p>{about}</p>
          <h4>Skills:</h4>
          <ul>{skills.split(',').map((skill, i) => <li key={i}>{skill.trim()}</li>)}</ul>
          <h4>Interests:</h4>
          <p>{interests}</p>
        </div>
      </div>
    </section>
  );
}

