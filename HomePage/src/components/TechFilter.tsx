import React, { FC } from 'react';
import { Project } from '../types/Project';
import { motion } from "framer-motion";

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
            <motion.button
                className="TechSecetBut"
                onClick={() => handleFilterChange('All')}
                whileHover={{scale: 1.05}}
                whileTap={{scale: 1.0}}
            >
                Все
            </motion.button>
            {uniqueTechnologies.map((tech) => (
                <motion.button
                    className="TechSecetBut"
                    key={tech}
                    onClick={() => handleFilterChange(tech)}
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 1.0}}
                >
                    {tech}
                </motion.button>
            ))}
        </div>
    );
};
