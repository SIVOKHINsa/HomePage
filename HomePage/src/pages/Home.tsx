import React from 'react';
import '../styles/Home.css';


export const Home: React.FC = () => {
  return (
    <div className="page-container" id='home-container'>
      <div className="page-content" id='home-content'>
          <h2>Привет, я Сергей Сивохин</h2>
          <p>Добро пожаловать на мой HomePage!</p>
      </div>
    </div>
  );
};

