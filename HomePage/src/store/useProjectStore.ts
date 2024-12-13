import { create } from 'zustand';
import { Project } from '../types/Project';
import { projects, uniqueTechnologies } from '../data/projects.ts';
import { fetchRepos } from '../services/githubService.ts';
import { token, username} from '../data/TokenAndUsername.ts'


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
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    uniqueTechnologies: string[];
    setUniqueTechnologies: (technologies: string[]) => void;
    addProject: (project: Project) => void;
    removeProject: (projectId: string) => void;
    fetchProjects: () => Promise<void>;
}


const updateLocalStorage = (projects: Project[], uniqueTechnologies: string[]) => {
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem('uniqueTechnologies', JSON.stringify(uniqueTechnologies));
};

export const useProjectStore = create<ProjectStore>((set) => ({
    projects: loadProjectsFromStorage(),
    status: 'idle',
    error: null,
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

        updateLocalStorage(newProjects, newTechnologies);

        return { projects: newProjects, uniqueTechnologies: newTechnologies };
    }),
    removeProject: (projectId) => set((state) => {
        const newProjects = state.projects.filter(project => project.id !== projectId);

        const remainingTechnologies = state.projects
            .filter(project => project.id !== projectId)
            .flatMap(project => project.technologies);

        const newTechnologiesSet = new Set(remainingTechnologies);
        const newTechnologies = Array.from(newTechnologiesSet);

        updateLocalStorage(newProjects, newTechnologies);

        return { projects: newProjects, uniqueTechnologies: newTechnologies };
    }),
    fetchProjects: async () => {
        set({ status: 'loading' });

        try {

            const fetchedProjects = await fetchRepos(username, token);

            set((state) => {
                const newProjects = [
                    ...state.projects,
                    ...fetchedProjects.filter(
                        (newProject) => !state.projects.some((existingProject) => existingProject.title === newProject.title)
                    )
                ];

                const allTechnologies = new Set([
                    ...state.uniqueTechnologies,
                    ...fetchedProjects.flatMap((project) => project.technologies)
                ]);
                const uniqueTechnologies = Array.from(allTechnologies);

                updateLocalStorage(newProjects, uniqueTechnologies);

                return { projects: newProjects, uniqueTechnologies };
            });
            set({ status: 'succeeded' });
        } catch (error: any) {
            set({ status: 'failed', error: error.message });
        }
    },
}));
