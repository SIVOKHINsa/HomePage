import React, { ReactNode } from 'react';

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
    modalType: string;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose, modalType }) => {

    const modalId = `${modalType}`;

    return (
        <div className="modal" id={modalId}>
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};
