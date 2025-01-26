import '../styles/Contact.css';
import React, {useState} from 'react';
import { motion } from "framer-motion";


const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;



export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setError] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const validate = () => {
        let errorMessage: string = '';

        if (!formData.name || !formData.message || !formData.email) {
            errorMessage = 'Заполните все поля!';
        } else if (!emailRegex.test(formData.email)) {
            errorMessage = 'Введите корректный email';
        }

        return errorMessage;
    };

    const handleSubmit = (e: React.FormEvent) => {
        setIsSubmitted(false);

        e.preventDefault();
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setFormData({ name: '', email: '', message: '' });
        setError('');
        setIsSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
        setIsSubmitted(false);
    };

    return (
        <div className="page-container" id='home-container'>
            <div className="page-content" id='home-content'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Имя:</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="message">Сообщение:</label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>
                    <motion.button
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 1.0}}
                        id="ContactSendBut"
                        type="submit"
                    >
                        Отправить
                    </motion.button>
                    {errors && <p style={{ color: 'red' }}>{errors}</p>}
                    {isSubmitted && <p>Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.</p>}
                </form>
            </div>
        </div>
    );
};