import { Project } from '../types/Project';
import {v4 as uuidv4} from "uuid";

export const projects: Project[] = [
    {
        id: uuidv4(),
        title: 'HomePage',
        description: 'Описание проекта',
        technologies: ['React', 'TypeScript'],
        link: 'https://github.com/SIVOKHINsa/HomePage',
    },
    {
        id: uuidv4(),
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

