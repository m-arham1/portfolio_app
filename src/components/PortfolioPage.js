import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectSection';
import ContactForm from '../components/ContactSection';
import Footer from '../components/Footer';

import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeContext';




export default function PortfolioPage() {
  const { darkMode } = useContext(ThemeContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('portfolioData');
    if (data) {
      setProfileData(JSON.parse(data));
    }
  }, []);

  if (!profileData) return <p>Loading...</p>;

  return (
    <div>
    <div className={`page-container ${darkMode ? 'dark' : ''}`}>
      <HeroSection name={profileData.name} bio={profileData.bio} />
      <AboutSection
        profilePicture={profileData.profilePicture}
        about={profileData.about}
        skills={profileData.skills}
        interests={profileData.interests}
      />
      <ProjectsSection projects={profileData.projects} />
      <ContactForm />
      <Footer socialLinks={profileData.socialLinks} />
      </div>
    </div>
    
  );
}
