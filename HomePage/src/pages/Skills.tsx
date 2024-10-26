import React from 'react';
import '../styles/Skills.css';


export const Skills: React.FC = () => {
  return (
    <div className="page-container" id='skills-container'>
      <div className="page-content" id='skills-content'>
          <h2>Мои навыки</h2>
          <ul>
            <li>TypeScript</li>
            <li>React</li>
            <li>Python</li>
            <li>SQL</li>
          </ul>
        </div>
    </div>
  );
};

