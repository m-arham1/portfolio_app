import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ProjectCard from './ProjectCard';
import '../styles/ProjectSection.css';

import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeContext';




export default function ProjectsSection({ projects }) {
  const { darkMode } = useContext(ThemeContext);
  const [projectList, setProjectList] = useState(projects);

  useEffect(() => {
    setProjectList(projects);
  }, [projects]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(projectList);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setProjectList(reordered);
  };

  return (
    <div className={`page-container ${darkMode ? 'dark' : ''}`}>
    <section className="projects" id="projects">
      <h2>My Projects</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="project-list" direction="horizontal">
          {(provided) => (
            <div className="project-list" {...provided.droppableProps} ref={provided.innerRef}>
              {projectList.map((project, index) => (
                <Draggable key={index} draggableId={`project-${index}`} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <ProjectCard
                        title={project.name}
                        description={project.description}
                        image={typeof project.image === 'object' ? URL.createObjectURL(project.image) : project.image}
                        github={project.github}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
    </div>
  );
}
