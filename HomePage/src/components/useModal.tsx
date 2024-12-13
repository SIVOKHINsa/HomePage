import { useState, useCallback } from 'react';
import { Project } from '../types/Project';

type ModalType = 'newProject' | 'deleteConfirm' | 'projectDetails' | null;

interface UseModalProps {
    ProjectsFromStore: Project[];
}

export const useModal = ({ ProjectsFromStore }: UseModalProps) => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const openModal = useCallback((modalType: ModalType, projectId?: string) => {
        setActiveModal(modalType);
        if (modalType === 'deleteConfirm' && projectId) {
            setProjectToDelete(projectId);
        }
        if (modalType === 'projectDetails' && projectId) {
            const project = ProjectsFromStore.find((p) => p.id === projectId) || null;
            setSelectedProject(project);
        }
    }, [ProjectsFromStore]);

    const closeModal = useCallback(() => {
        setActiveModal(null);
        setProjectToDelete(null);
        setSelectedProject(null);
    }, []);

    return { activeModal, openModal, closeModal, projectToDelete, selectedProject };
};
