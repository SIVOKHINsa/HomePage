import axios, { AxiosInstance }  from 'axios';
import { Project, GitHubRepo } from '../types/Project';
import { v4 as uuidv4 } from "uuid";

const githubApi: AxiosInstance = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Accept: 'application/vnd.github.v3+json',
    },
});


export const fetchRepos = async (username: string, token?: string): Promise<Project[]> => {
    try {
        const headers = token ? { Authorization: `token ${token}` } : {};
        const response = await githubApi.get<GitHubRepo[]>(`/users/${username}/repos`, { headers });


        const repos = response.data;

        const projects: Project[] = repos.map((repo: GitHubRepo) => ({
            id: uuidv4(),
            title: repo.name,
            description: repo.description || 'Нет описания',
            technologies: extractTechnologies(repo),
            link: repo.html_url,
        }));

        return projects;
    } catch (error) {
        console.error('Ошибка при получении репозиториев:', error);
        throw new Error('Не удалось загрузить репозитории GitHub');
    }
};

const extractTechnologies = (repo: GitHubRepo): string[] => {
    const technologies: string[] = [];

    if (repo.language) {
        technologies.push(repo.language);
    }

    return technologies;
};
