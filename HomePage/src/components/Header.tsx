import '../styles/header.css';

export const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><a href="/">Главная</a></li>
          <li><a href="/about">Обо мне</a></li>
          <li><a href="/skills">Навыки</a></li>
          <li><a href="/projects">Проекты</a></li>
          <li><a href="/contact">Связаться</a></li>
        </ul>
      </nav>
    </header>
  );
};
