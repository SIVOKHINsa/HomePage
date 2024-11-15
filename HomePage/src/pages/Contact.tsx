import '../styles/Contact.css';
import React, {useState} from 'react';


export const Contact = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [errors, setError] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const validate = () => {
        let errorMessage: string = '';

        if (!name || !message || !email) {
            errorMessage = 'Заполните все поля!';
        } else if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
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

        setName('');
        setEmail('');
        setMessage('');
        setError('');
        setIsSubmitted(true);
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
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setIsSubmitted(false);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setIsSubmitted(false);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="message">Сообщение:</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                                setIsSubmitted(false);
                            }}
                        />
                    </div>
                    <button id="ContactSendBut" type="submit">Отправить</button>
                    {errors && <p style={{ color: 'red' }}>{errors}</p>}
                    {isSubmitted && <p>Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.</p>}
                </form>
            </div>
        </div>
    );
};