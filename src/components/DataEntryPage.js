import React, { useState, useEffect } from 'react';
import '../styles/DataEntryPage.css';
import { FaInstagram, FaFacebook, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeContext';




export default function DataEntryForm() {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    about: '',
    skills: '',
    interests: '',
    profilePicture: null,
    socialLinks: [],
    projects: [],
  });

  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [socialURL, setSocialURL] = useState('');
  const [projectData, setProjectData] = useState({ name: '', description: '', image: null, github: '' });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profilePicture: e.target.files[0] }));
  };

  const handleProjectImageChange = (e) => {
    setProjectData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleProjectInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const addProject = () => {
    if (projectData.name && projectData.description && projectData.github) {
      setFormData((prev) => ({
        ...prev,
        projects: [...prev.projects, projectData],
      }));
      setProjectData({ name: '', description: '', image: null, github: '' });
    }
  };

  const addSocialLink = () => {
    if (selectedPlatform && socialURL) {
      setFormData((prev) => ({
        ...prev,
        socialLinks: [...prev.socialLinks, { platform: selectedPlatform, url: socialURL }],
      }));
      setSelectedPlatform('');
      setSocialURL('');
    }
  };

  const platformIcons = {
    instagram: <FaInstagram className="icon" />,
    facebook: <FaFacebook className="icon" />,
    twitter: <FaTwitter className="icon" />,
    github: <FaGithub className="icon" />,
    linkedin: <FaLinkedin className="icon" />,
  };

  const handleSubmit = async () => {
    const profileBase64 = formData.profilePicture
      ? await toBase64(formData.profilePicture)
      : null;

    const updatedProjects = await Promise.all(
      formData.projects.map(async (project) => ({
        ...project,
        image: project.image ? await toBase64(project.image) : null,
      }))
    );

    const finalData = { ...formData, profilePicture: profileBase64, projects: updatedProjects };
    localStorage.setItem('portfolioData', JSON.stringify(finalData));
    navigate('/portfolio');
  };

  return (
    
    <div className={`form-container ${darkMode ? 'dark' : ''}`}>
      
      <h2>User Profile Entry</h2>

      {/* Basic Info */}
      <div className="form-group">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
        <input name="bio" placeholder="Bio" value={formData.bio} onChange={handleInputChange} />
        <textarea name="about" placeholder="About" value={formData.about} onChange={handleInputChange} />
        <input name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleInputChange} />
        <input name="interests" placeholder="Interests" value={formData.interests} onChange={handleInputChange} />
      </div>

      {/* Profile Picture */}
      <div className="form-group">
        <label>Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      {/* Social Links */}
      <div className="form-group">
        <label>Add Social Link</label>
        <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
          <option value="">Select Platform</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
          <option value="github">GitHub</option>
          <option value="linkedin">LinkedIn</option>
        </select>
        <input placeholder="Social Media URL" value={socialURL} onChange={(e) => setSocialURL(e.target.value)} />
        <button onClick={addSocialLink}>Add Social Link</button>
        <ul>
          {formData.socialLinks.map((link, index) => (
            <li key={index} className="social-link">
              {platformIcons[link.platform]} {link.platform}: {link.url}
            </li>
          ))}
        </ul>
      </div>

      {/* Project Entry */}
      <div className="form-group">
        <label>Project Details</label>
        <input name="name" placeholder="Project Name" value={projectData.name} onChange={handleProjectInputChange} />
        <textarea name="description" placeholder="Project Description" value={projectData.description} onChange={handleProjectInputChange} />
        <input name="github" placeholder="GitHub Link" value={projectData.github} onChange={handleProjectInputChange} />
        <input type="file" accept="image/*" onChange={handleProjectImageChange} />
        <button onClick={addProject}>Add Project</button>
        <ul>
          {formData.projects.map((project, index) => (
            <li key={index}>
              <strong>{project.name}</strong>: {project.description} (<a href={project.github} target="_blank" rel="noreferrer">GitHub</a>)
            </li>
          ))}
        </ul>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>Submit</button>
    </div>
    
  );
}
