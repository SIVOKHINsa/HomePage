import {useState, useEffect, useCallback} from 'react';
import {useProjectStore} from '../store/useProjectStore';
import {Project, NewProject} from '../types/Project';
import '../styles/Projects.css';
import {v4 as uuidv4} from 'uuid';
import {NewProjectModal} from '../components/NewProjectModal';
import {DeleteConfirmModal} from '../components/DeleteConfirmModal';
import {ProjectDetailsModal} from '../components/ProjectModal';
import {TechFilter} from '../components/TechFilter';
import {ProjectList} from '../components/ProjectList';
import {useModal} from '../components/useModal';
import {Spinner} from '../components/LoadingSpinner.tsx';


export const Projects = () => {

    const ProjectsFromStore = useProjectStore((state) => state.projects);
    const addProject = useProjectStore((state) => state.addProject);
    const removeProject = useProjectStore((state) => state.removeProject);
    const uniqueTechnologies = useProjectStore((state) => state.uniqueTechnologies);
    const status = useProjectStore((state) => state.status);
    const error = useProjectStore((state) => state.error);
    const fetchProjects = useProjectStore((state) => state.fetchProjects);

    const [selectedTech, setSelectedTech] = useState<string>('All');
    const {activeModal, openModal, closeModal, projectToDelete, selectedProject} = useModal({ProjectsFromStore});
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);


    const handleFilterChange = useCallback((tech: string) => {
        setSelectedTech(tech);
    }, []);

    const handleFilterProjects = useCallback((filtered: Project[]) => {
        setFilteredProjects(filtered);
    }, []);

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

    const FetchProjectsFromGIT = () => {
        fetchProjects();
    };

    useEffect(() => {
        FetchProjectsFromGIT();
    }, []);


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

                {status === 'loading' && <Spinner/>}
                {status === 'failed' && error && (
                    <div id="error-message" style={{ color: 'red' }}>
                        <p>{error}</p>
                    </div>
                )}

                <TechFilter
                    selectedTech={selectedTech}
                    uniqueTechnologies={uniqueTechnologies}
                    onFilterChange={handleFilterChange}
                    onFilterProjects={handleFilterProjects}
                    allProjects={ProjectsFromStore}
                />
                <h3>Проекты:</h3>
                <ProjectList projects={filteredProjects}
                             onProjectClick={(project) => openModal('projectDetails', project.id)}/>

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
                    <button className="AddProjectBut" onClick={FetchProjectsFromGIT}>Загрузить проекты с GIT</button>
                </div>
            </div>
        </div>
    );
};