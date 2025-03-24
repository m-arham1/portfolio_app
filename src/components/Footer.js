import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import '../styles/Footer.css';
import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeContext';





export default function Footer({ socialLinks }) {
  const { darkMode } = useContext(ThemeContext);
  const icons = {
    github: <FaGithub />,
    linkedin: <FaLinkedin />,
    twitter: <FaTwitter />,
    instagram: <FaInstagram />,
    facebook: <FaFacebook />
  };

  return (
    <div className={`page-container ${darkMode ? 'dark' : ''}`}>
    <footer className="footer">
      <div className="social-icons">
        {socialLinks.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}>
            {icons[link.platform]}
          </a>
        ))}
      </div>
      <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
    </footer>
    </div>
  );
}
