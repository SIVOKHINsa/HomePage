import { create } from 'zustand';
import { projectsSchema, uniqueTechnologiesSchema } from '../data/ZodSchemas.ts';
import { z } from 'zod';
import { persist, devtools } from 'zustand/middleware';
import { Project } from '../types/Project';
import { projects, uniqueTechnologies } from '../data/projects.ts';
import { fetchRepos } from '../services/githubService.ts';
import { token, username} from '../data/TokenAndUsername.ts'


const loadFromStorage = <T>(key: string, defaultValue: T, schema: z.ZodSchema<T>): T => {
    try {
        const rawData = localStorage.getItem(key);
        if (rawData) {
            const parsedData = JSON.parse(rawData);
            return schema.parse(parsedData);
        }
    } catch (error) {
        console.error(`Ошибка загрузки ключа "${key}":`, error);
    }
    return defaultValue;
};


interface ProjectStore {
    projects: Project[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    uniqueTechnologies: string[];
    addProject: (project: Project) => void;
    removeProject: (projectId: string) => void;
    fetchProjects: () => Promise<void>;
}


const updateLocalStorage = (projects: Project[], uniqueTechnologies: string[]) => {
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem('uniqueTechnologies', JSON.stringify(uniqueTechnologies));
};


export const useProjectStore = create<ProjectStore>()(
    devtools(
        persist(
            (set) => ({
                projects: loadFromStorage('projects', projects, projectsSchema),
                uniqueTechnologies: loadFromStorage('uniqueTechnologies', uniqueTechnologies, uniqueTechnologiesSchema),
                status: 'idle',
                error: null,
                addProject: (project) => set((state) => {
                    const newProjects = [...state.projects, project];
                    const newTechnologiesSet = new Set([
                        ...state.uniqueTechnologies,
                        ...project.technologies,
                    ]);
                    const newTechnologies = Array.from(newTechnologiesSet);

                    updateLocalStorage(newProjects, newTechnologies);

                    return { projects: newProjects, uniqueTechnologies: newTechnologies };
                }),
                removeProject: (projectId) => set((state) => {
                    const newProjects = state.projects.filter((project) => project.id !== projectId);

                    const remainingTechnologies = state.projects
                        .filter((project) => project.id !== projectId)
                        .flatMap((project) => project.technologies);

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
                                    (newProject) =>
                                        !state.projects.some(
                                            (existingProject) =>
                                                existingProject.title === newProject.title
                                        )
                                ),
                            ];

                            const allTechnologies = new Set([
                                ...state.uniqueTechnologies,
                                ...fetchedProjects.flatMap((project) => project.technologies),
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
            }),
            {
                name: 'project-store',
            }
        ),
        {
            name: 'Project Store DevTools',
        }
    )
);