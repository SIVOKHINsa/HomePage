import { z } from 'zod';

export const projectSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    link: z.string().url(),
});


export const projectsSchema = z.array(projectSchema);


export const uniqueTechnologiesSchema = z.array(z.string());
