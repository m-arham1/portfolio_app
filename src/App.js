import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';

import Navbar from './components/Navbar';
import DataEntryPage from './components/DataEntryPage';
import PortfolioPage from './components/PortfolioPage';
import AboutPage from './components/AboutSection';
import ProjectsPage from './components/ProjectSection';
import ContactPage from './components/ContactSection';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<DataEntryPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
