import { Project } from '../types/Project';

export const projects: Project[] = [
    {
        id: 1,
        title: 'HomePage',
        description: 'Описание проекта',
        technologies: ['React', 'TypeScript'],
        link: 'https://github.com/SIVOKHINsa/HomePage',
    },

    {
        id: 2,
        title: 'ToDo',
        description: 'Описание проекта',
        technologies: ['Flutter', 'Dart'],
        link: 'https://github.com/SIVOKHINsa/ToDo',
    },
];

export const uniqueTechnologies: string[] = [
    'All',
    ...new Set(projects.flatMap((project) => project.technologies)),
];
