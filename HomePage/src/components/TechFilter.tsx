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

const AllTech = 'All';

const buttonAnimations = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 1.0 },
    className: "TechSelectBut"
};

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
                onClick={() => handleFilterChange(AllTech)}
                {...buttonAnimations}
            >
                Все
            </motion.button>
            {uniqueTechnologies.map((tech: string) => (
                <motion.button
                    key={tech}
                    onClick={() => handleFilterChange(tech)}
                    {...buttonAnimations}
                >
                    {tech}
                </motion.button>
            ))}
        </div>
    );
};
