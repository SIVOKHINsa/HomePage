import React, { FC } from 'react';
import { Project } from '../types/Project';

interface TechFilterProps {
    selectedTech: string;
    uniqueTechnologies: string[];
    onFilterChange: (tech: string) => void;
    onFilterProjects: (filteredProjects: Project[]) => void;
    allProjects: Project[];
}

export const TechFilter: FC<TechFilterProps> = ({ selectedTech, uniqueTechnologies, onFilterChange, onFilterProjects, allProjects }) => {
    const handleFilterChange = (tech: string) => {
        onFilterChange(tech);
        const filtered = allProjects.filter((project) =>
            tech === 'All' ? true : project.technologies.includes(tech)
        );
        onFilterProjects(filtered);
    };

    return (
        <div>
            <h3>Фильтр по технологиям:</h3>
            <button className="TechSecetBut" onClick={() => handleFilterChange('All')}>
                Все
            </button>
            {uniqueTechnologies.map((tech) => (
                <button
                    className="TechSecetBut"
                    key={tech}
                    onClick={() => handleFilterChange(tech)}
                >
                    {tech}
                </button>
            ))}
        </div>
    );
};
