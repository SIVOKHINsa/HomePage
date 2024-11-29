import React, { useState, useCallback  } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { Project } from '../types/Project';
import '../styles/Projects.css';
import { v4 as uuidv4 } from 'uuid';
import { NewProjectModal } from '../components/NewProjectModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { ProjectDetailsModal } from '../components/ProjectModal';

export const Projects = () => {
    const [selectedTech, setSelectedTech] = useState<string>('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [newProjectModalVisible, setNewProjectModalVisible] = useState<boolean>(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

    const addProject = useProjectStore((state) => state.addProject);
    const removeProject = useProjectStore((state) => state.removeProject);
    const ProjectsFromStore = useProjectStore((state) => state.projects);
    const uniqueTechnologies = useProjectStore((state) => state.uniqueTechnologies);

    const handleFilterChange = useCallback((tech: string) => {
        setSelectedTech(tech);
    }, []);

    const filteredProjects = ProjectsFromStore.filter((project) =>
        selectedTech === 'All' ? true : project.technologies.includes(selectedTech)
    );

    const handleOpenNewProjectModal = useCallback(() => {
        setNewProjectModalVisible(true);
    }, []);

    const handleCloseNewProjectModal = useCallback(() => {
        setNewProjectModalVisible(false);
    }, []);

    const handleProjectClick = useCallback((project: Project) => {
        setSelectedProject(project);
    }, []);

    const handleCloseProjectModal = useCallback(() => {
        setSelectedProject(null);
    }, []);

    const handleSubmitNewProject = useCallback((newProject: { title: string; description: string; technologies: string[]; link: string }) => {
        const projectWithId: Project = {
            id: uuidv4(),
            ...newProject,
        };
        addProject(projectWithId);
    }, []);

    const handleDeleteProject = useCallback((projectId: string) => {
        setShowDeleteConfirm(true);
        setProjectToDelete(projectId);
    }, []);

    const confirmDelete = useCallback(() => {
        if (projectToDelete !== null) {
            removeProject(projectToDelete); // Передаем projectId в removeProject
        }
        setShowDeleteConfirm(false);
        setProjectToDelete(null);
        handleCloseProjectModal();
    }, [projectToDelete, removeProject, handleCloseProjectModal]);

    const cancelDelete = useCallback(() => {
        setShowDeleteConfirm(false);
        setProjectToDelete(null);
    }, []);

    return (
        <div className="page-container" id="home-container">
            <div className="page-content" id="home-content">
                <div>
                    <h3>Фильтр по технологиям:</h3>
                    <button
                        className="TechSecetBut"
                        onClick={() => handleFilterChange('All')}
                    >
                        Все
                    </button>
                    {uniqueTechnologies.map((tech) => (
                        <button
                            className="TechSecetBut"
                            key={tech}
                            onClick={() => handleFilterChange(tech)}
                        >
                            {tech}
                        </button>
                    ))}
                </div>
                <h3>Проекты:</h3>
                <ul className="ProjectsListUl">
                    {filteredProjects.map((project: Project) => (
                        <li
                            className="ProjectsListlI"
                            key={project.id}
                            onClick={() => handleProjectClick(project)}
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
                {showDeleteConfirm && (
                    <DeleteConfirmModal
                        onClose={cancelDelete}
                        onConfirm={confirmDelete}
                    />
                )}
                {selectedProject && (
                    <ProjectDetailsModal
                        selectedProject={selectedProject}
                        onClose={handleCloseProjectModal}
                        onDelete={handleDeleteProject}
                    />
                )}
                {newProjectModalVisible && (
                    <NewProjectModal
                        onClose={handleCloseNewProjectModal}
                        onSubmit={handleSubmitNewProject}
                    />
                )}
                <button className="AddProjectBut" onClick={handleOpenNewProjectModal}>Добавить проект</button>
            </div>
        </div>
    );
};