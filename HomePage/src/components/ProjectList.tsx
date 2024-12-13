import React from 'react';
import { Project } from '../types/Project';

interface ProjectListProps {
    projects: Project[];
    onProjectClick: (project: Project) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects, onProjectClick }) => {
    return (
        <ul className="ProjectsListUl">
            {projects.map((project) => (
                <li
                    className="ProjectsListlI"
                    key={project.id}
                    onClick={() => onProjectClick(project)}
                >
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <p><strong>Технологии:</strong> {project.technologies.join(', ')}</p>
                    <a
                        className="ProjectLink"
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Посмотреть проект
                    </a>
                </li>
            ))}
        </ul>
    );
};
