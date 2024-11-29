import React, { useState } from 'react';
import { Modal } from './Modal';
import '../styles/NewProjectModal.css';

interface NewProjectModalProps {
    onClose: () => void;
    onSubmit: (projectData: { title: string, description: string, technologies: string[], link: string }) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({ onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [link, setLink] = useState('');
    const [errors, setError] = useState<string>('');


    const validate = () => {

        let errorMessage: string = '';

        if (!title || !description || !technologies || !link) {
            errorMessage = 'Заполните все поля!';
        }

        return errorMessage;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validate();
        setError(validationErrors);

        if (Object.keys(validationErrors).length > 0) return; // Если есть ошибки, не отправляем форму

        const newProject = {
            title,
            description,
            technologies: technologies.split(',').map((tech) => tech.trim()),
            link,
        };

        onSubmit(newProject);

        setTitle('');
        setDescription('');
        setTechnologies('');
        setLink('');
        onClose();
    };

    return (
        <Modal onClose={onClose} modalType="new-project-modal ">
            <h3>Добавить новый проект</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Название:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Описание:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="technologies">Технологии (через запятую):</label>
                    <input
                        type="text"
                        id="technologies"
                        value={technologies}
                        onChange={(e) => setTechnologies(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="link">Ссылка на проект:</label>
                    <input
                        type="text"
                        id="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>
                <button className="AddProjectBut" type="submit">Добавить проект</button>
                {errors && <p style={{ color: 'red' }}>{errors}</p>}
            </form>
        </Modal>
    );
};
