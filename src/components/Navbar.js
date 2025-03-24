import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

import { ThemeContext } from '../components/ThemeContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`page-container ${darkMode ? 'dark' : ''}`}>
    <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
      <div className="navbar-container">
        <div className="logo"><Link to="/">MyPortfolio</Link></div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        {/* <button onClick={toggleTheme} className="theme-toggle-btn">
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button> */}
      </div>
    </nav>
    </div>
  );
}
