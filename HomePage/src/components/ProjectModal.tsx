import React from 'react';
import { Modal } from './Modal';

interface ProjectDetailsModalProps {
    selectedProject: {id: string, title: string, description: string, technologies: string[], link: string };
    onClose: () => void;
    onDelete: (projectId: string) => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ selectedProject, onClose, onDelete }) => {
    return (
        <Modal onClose={onClose} modalType="projectDetails">
            <h3>{selectedProject.title}</h3>
            <p><strong>Описание:</strong> {selectedProject.description}</p>
            <p><strong>Технологии:</strong> {selectedProject.technologies.join(', ')}</p>
            <a
                className="ProjectLink"
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
            >
                Посмотреть проект на GitHub
            </a>
            <button
                className="DelProjectBut"
                onClick={() => onDelete(selectedProject.id)}
            >
                Удалить
            </button>
        </Modal>
    );
};
