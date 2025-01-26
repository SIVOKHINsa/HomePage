import React from 'react';
import { Link } from 'react-router-dom';

const menuItems = [
    { label: 'Главная', path: '/' },
    { label: 'Обо мне', path: '/about' },
    { label: 'Навыки', path: '/skills' },
    { label: 'Проекты', path: '/projects' },
    { label: 'Связаться', path: '/contact' }
];



export const Menu = ({ menuBoxClass = "", menuItemClass = "" }) => (
    <ul className={menuBoxClass}>
        {menuItems.map(item => (
            <li key={item.path}>
                <Link className={menuItemClass} to={item.path}>
                    {item.label}
                </Link>
            </li>
        ))}
    </ul>
);

