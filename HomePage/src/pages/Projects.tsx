import React, { useState } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { Project } from '../types/Project';
import '../styles/Projects.css';

export const Projects = () => {
    const [selectedTech, setSelectedTech] = useState<string>('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [NewProjectModal, setNewProjectModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [technologies, setTechnologies] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
    const [projectToDelete, setProjectToDelete] = useState<number | null>(null);


    const addProject = useProjectStore((state) => state.addProject);
    const removeProject = useProjectStore((state) => state.removeProject);
    const ProjectsFromStore = useProjectStore((state) => state.projects);
    const uniqueTechnologies = useProjectStore((state) => state.uniqueTechnologies);

    const handleFilterChange = (tech: string) => {
        setSelectedTech(tech);
    };

    const filteredProjects = ProjectsFromStore.filter((project) =>
        selectedTech === 'All' ? true : project.technologies.includes(selectedTech)
    );

    const handleOpenNewProjectModal = () => {
        setNewProjectModal(true);
    };

    const handleCloseNewProjectModal = () => {
        setNewProjectModal(false);
    };

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    const handleSubmitNewProject = (e: React.FormEvent) => {
        e.preventDefault();

        const newProject: Project = {
            id: ProjectsFromStore.length + 1,
            title,
            description,
            technologies: technologies.split(',').map((tech) => tech.trim()),
            link,
        };

        addProject(newProject);

        setTitle('');
        setDescription('');
        setTechnologies('');
        setLink('');

        handleCloseNewProjectModal();
    };

    const handleDeleteProject = (projectId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setShowDeleteConfirm(true);
        setProjectToDelete(projectId);
    };

    const confirmDelete = () => {
        if (projectToDelete !== null) {
            removeProject(projectToDelete);
        }
        setShowDeleteConfirm(false);
        setProjectToDelete(null);
        handleCloseModal();
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setProjectToDelete(null);
    };

    return (
        <div className="page-container" id="home-container">
            <div className="page-content" id="home-content">
                <div>
                    <h3>Фильтр по технологиям:</h3>
                    <button
                        className="TechSecetBut"
                        onClick={() => handleFilterChange('All')}
                    >
                        All
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
                                onClick={(e) => e.stopPropagation()}
                            >
                                Посмотреть проект
                            </a>
                        </li>
                    ))}
                </ul>

                {showDeleteConfirm && (
                    <div className="modal" id="delete-modal">
                        <div className="modal-content">
                            <span className="close-button" onClick={cancelDelete}>&times;</span>
                            <h3>Вы уверены, что хотите удалить этот проект?</h3>
                            <button className="DelProjectBut" onClick={confirmDelete}>Да, удалить</button>
                            <button className="DelProjectBut" onClick={cancelDelete}>Отмена</button>
                        </div>
                    </div>
                )}
                {selectedProject && (
                    <div className="modal" id="project-modal">
                        <div className="modal-content">
                            <span className="close-button" onClick={handleCloseModal}>&times;</span>
                            <h3>{selectedProject.title}</h3>
                            <p><strong>Описание:</strong> {selectedProject.description}</p>
                            <p><strong>Технологии:</strong> {selectedProject.technologies.join(', ')}</p>
                            <a
                                className="ProjectLink"
                                href={selectedProject.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Посмотреть проект на GitHub
                            </a>
                            <button
                                className="DelProjectBut"
                                onClick={(e) => handleDeleteProject(selectedProject.id, e)}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                )}

                {NewProjectModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close-button" onClick={handleCloseNewProjectModal}>&times;</span>
                            <h3>Добавить новый проект</h3>
                            <form onSubmit={handleSubmitNewProject}>
                                <div className="form-group">
                                    <label htmlFor="title">Название:</label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Описание:</label>
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="technologies">Технологии (через запятую):</label>
                                    <input
                                        type="text"
                                        id="technologies"
                                        value={technologies}
                                        onChange={(e) => setTechnologies(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="link">Ссылка на проект:</label>
                                    <input
                                        type="text"
                                        id="link"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                    />
                                </div>
                                <button className="AddProjectBut" type="submit">Добавить проект</button>
                            </form>
                        </div>
                    </div>
                )}
                <button className="AddProjectBut" onClick={handleOpenNewProjectModal}>Добавить проект</button>
            </div>
        </div>
    );
};
