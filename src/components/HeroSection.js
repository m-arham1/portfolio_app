import React from 'react';
import '../styles/HeroSection.css';

import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeContext';




export default function HeroSection({ name, bio }) {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className={`page-container ${darkMode ? 'dark' : ''}`}>
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>Hello, I'm <span>{name}</span></h1>
        <p>{bio}</p>
        <a href="#projects" className="cta-button">View My Work</a>
      </div>
    </section>
    </div>
  );
}
