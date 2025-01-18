export interface Project  {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    link: string;
}

export interface NewProject{
    title: string;
    description: string;
    technologies: string[];
    link: string;
}

export interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    language: string | null;
    html_url: string;
}