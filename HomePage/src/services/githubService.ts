import axios from 'axios';
import { Project } from '../types/Project';
import { v4 as uuidv4 } from "uuid";

const GITHUB_API_URL = 'https://api.github.com';

export const fetchRepos = async (username: string, token?: string): Promise<Project[]> => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`, {
            headers: token ? { Authorization: `token ${token}` } : {},
        });

        const repos = response.data;

        const projects: Project[] = repos.map((repo: any) => ({
            id: uuidv4(),
            title: repo.name,
            description: repo.description || 'Нет описания',
            technologies: extractTechnologies(repo),
            link: repo.html_url,
        }));

        return projects;
    } catch (error) {
        console.error('Ошибка при получении репозиториев:', error);
        return [];
    }
};


const extractTechnologies = (repo: any): string[] => {
    const technologies: string[] = [];

    if (repo.language) {
        technologies.push(repo.language);
    }

    return technologies;
};
