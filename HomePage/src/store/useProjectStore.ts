import { create } from 'zustand';
import { Project } from '../types/Project';
import { projects, uniqueTechnologies } from '../data/projects.ts';


const loadProjectsFromStorage = (): Project[] => {
    try {
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
            return JSON.parse(storedProjects);
        }
    } catch (error) {
        console.error('Ошибка при загрузке проектов:', error);
    }
    return projects;
};


const loadUniqueTechnologiesFromStorage = (): string[] => {
    try {
        const storedTechnologies = localStorage.getItem('uniqueTechnologies');
        if (storedTechnologies) {
            return JSON.parse(storedTechnologies);
        }
    } catch (error) {
        console.error('Ошибка при загрузке технологий:', error);
    }
    return uniqueTechnologies;
};


interface ProjectStore {
    projects: Project[];
    uniqueTechnologies: string[];
    setUniqueTechnologies: (technologies: string[]) => void;
    addProject: (project: Project) => void;
    removeProject: (projectId: number) => void;
}


export const useProjectStore = create<ProjectStore>((set) => ({
    projects: loadProjectsFromStorage(),
    uniqueTechnologies: loadUniqueTechnologiesFromStorage(),
    setUniqueTechnologies: (technologies) => {
        localStorage.setItem('uniqueTechnologies', JSON.stringify(technologies));
        set({ uniqueTechnologies: technologies });
    },
    addProject: (project) => set((state) => {
        const newProjects = [...state.projects, project];
        const newTechnologiesSet = new Set([
            ...state.uniqueTechnologies,
            ...project.technologies
        ]);
        const newTechnologies = Array.from(newTechnologiesSet);

        localStorage.setItem('projects', JSON.stringify(newProjects));
        localStorage.setItem('uniqueTechnologies', JSON.stringify(newTechnologies));

        return { projects: newProjects, uniqueTechnologies: newTechnologies };
    }),
    removeProject: (projectId) => set((state) => {
        const newProjects = state.projects.filter(project => project.id !== projectId);

        const remainingTechnologies = state.projects
            .filter(project => project.id !== projectId)
            .flatMap(project => project.technologies);

        const newTechnologiesSet = new Set(remainingTechnologies);
        const newTechnologies = Array.from(newTechnologiesSet);

        localStorage.setItem('projects', JSON.stringify(newProjects));
        localStorage.setItem('uniqueTechnologies', JSON.stringify(newTechnologies));

        return { projects: newProjects, uniqueTechnologies: newTechnologies };
    }),
}));
