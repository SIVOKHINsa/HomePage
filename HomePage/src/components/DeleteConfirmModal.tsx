import React from 'react';
import { Modal } from './Modal';
import '../styles/DeleteConfirmModal.css';

interface DeleteConfirmModalProps {
    onClose: () => void;
    onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ onClose, onConfirm }) => {
    return (
        <Modal onClose={onClose} modalType="delete-modal">
            <h3>Вы уверены, что хотите удалить этот проект?</h3>
            <button className="DelProjectBut" onClick={onConfirm}>Да, удалить</button>
            <button className="DelProjectBut" onClick={onClose}>Отмена</button>
        </Modal>
    );
};
