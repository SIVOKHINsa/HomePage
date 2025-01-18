import { useState, useEffect, useCallback } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { Project, NewProject } from '../types/Project';
import '../styles/Projects.css';
import { v4 as uuidv4 } from 'uuid';
import { NewProjectModal } from '../components/NewProjectModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { ProjectDetailsModal } from '../components/ProjectModal';
import { TechFilter } from '../components/TechFilter';
import { ProjectList } from '../components/ProjectList';
import { useModal } from '../components/useModal';
import { Spinner } from '../components/LoadingSpinner.tsx';

export const Projects = () => {

    const {
        projects: ProjectsFromStore,
        addProject,
        removeProject,
        uniqueTechnologies,
        status,
        error,
        fetchProjects,
    } = useProjectStore((state) => ({
        projects: state.projects,
        addProject: state.addProject,
        removeProject: state.removeProject,
        uniqueTechnologies: state.uniqueTechnologies,
        status: state.status,
        error: state.error,
        fetchProjects: state.fetchProjects,
    }));

    const [selectedTech, setSelectedTech] = useState<string>('All');
    const { activeModal, openModal, closeModal, projectToDelete, selectedProject } = useModal({ ProjectsFromStore });
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);



    useEffect(() => {
        if (selectedTech === 'All') {
            setFilteredProjects(ProjectsFromStore);
        } else {
            const filtered = ProjectsFromStore.filter((project) =>
                project.technologies.includes(selectedTech)
            );
            setFilteredProjects(filtered);
        }
    }, [selectedTech, ProjectsFromStore]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleSubmitNewProject = useCallback((newProject: NewProject) => {
        const project: Project = {
            id: uuidv4(),
            ...newProject,
        };
        addProject(project);
    }, [addProject]);

    const handleDeleteProject = useCallback((projectId: string) => {
        openModal('deleteConfirm', projectId);
    }, [openModal]);

    const confirmDelete = useCallback(() => {
        if (projectToDelete !== null) {
            removeProject(projectToDelete);
        }
        closeModal();
    }, [projectToDelete, removeProject, closeModal]);

    const cancelDelete = useCallback(() => {
        closeModal();
    }, [closeModal]);

    return (
        <div className="page-container" id="home-container">
            <div className="page-content" id="home-content">

                {status === 'loading' && <Spinner />}
                {status === 'failed' && error && (
                    <div id="error-message" style={{ color: 'red' }}>
                        <p>{error}</p>
                    </div>
                )}

                <TechFilter
                    selectedTech={selectedTech}
                    uniqueTechnologies={uniqueTechnologies}
                    onFilterChange={setSelectedTech}
                    onFilterProjects={setFilteredProjects}
                    allProjects={ProjectsFromStore}
                />
                <h3>Проекты:</h3>
                <ProjectList
                    projects={filteredProjects}
                    onProjectClick={(project) => openModal('projectDetails', project.id)}
                />

                {activeModal === 'deleteConfirm' && (
                    <DeleteConfirmModal
                        onClose={cancelDelete}
                        onConfirm={confirmDelete}
                    />
                )}
                {activeModal === 'projectDetails' && selectedProject && (
                    <ProjectDetailsModal
                        selectedProject={selectedProject}
                        onClose={closeModal}
                        onDelete={handleDeleteProject}
                    />
                )}
                {activeModal === 'newProject' && (
                    <NewProjectModal
                        onClose={closeModal}
                        onSubmit={handleSubmitNewProject}
                    />
                )}
                <div className="DivForButtons">
                    <button className="AddProjectBut" onClick={() => openModal('newProject')}>Добавить проект</button>
                    <button className="AddProjectBut" onClick={fetchProjects}>Загрузить проекты с GIT</button>
                </div>
            </div>
        </div>
    );
};
