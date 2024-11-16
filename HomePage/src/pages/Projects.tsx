import { useState } from 'react';
import { projects, uniqueTechnologies} from '../data/projects';
import { Project } from '../types/Project';
import '../styles/Projects.css';

export const Projects = () => {
    const [selectedTech, setSelectedTech] = useState<string>('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleFilterChange = (tech: string) => {
        setSelectedTech(tech);
    };

    const filteredProjects = projects.filter((project) =>
        selectedTech === 'All' ? true : project.technologies.includes(selectedTech)
    );


    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };


    return (
        <div className="page-container" id="home-container">
            <div className="page-content" id="home-content">
                <div>
                    <h3>Фильтр по технологиям:</h3>
                    {uniqueTechnologies.map((tech) => (
                        <button className="TechSecetBut" key={tech} onClick={() => handleFilterChange(tech)}>
                            {tech}
                        </button>
                    ))}
                </div>
                <h3> Проекты:</h3>
                <ul className="ProjectsListUl">
                    {filteredProjects.map((project: Project) => (
                        <li className="ProjectsListlI" key={project.id} onClick={() => handleProjectClick(project)}>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <p><strong>Технологии:</strong> {project.technologies.join(', ')}</p>
                            <a className="ProjectLink" href={project.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                Посмотреть проект
                            </a>
                        </li>
                    ))}
                </ul>
                {selectedProject && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close-button" onClick={handleCloseModal}>&times;</span>
                            <h3>{selectedProject.title}</h3>
                            <p><strong>Описание:</strong> {selectedProject.description}</p>
                            <p><strong>Технологии:</strong> {selectedProject.technologies.join(', ')}</p>
                            <a className="ProjectLink" href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                                Посмотреть проект на GitHub
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
