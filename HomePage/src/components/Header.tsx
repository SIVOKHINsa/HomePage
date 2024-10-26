import React from 'react';
import '../styles/header.css'; 

export const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><a href="/">Главная</a></li>
          <li><a href="/about">Обо мне</a></li>
          <li><a href="/skills">Навыки</a></li>
          <li><a href="/projects">Проекты</a></li>
        </ul>
      </nav>
    </header>
  );
};
