import '../styles/header.css';
import {useTheme} from '../context/ThemeContext';


export const Header = () => {
    const {theme, toggleTheme} = useTheme();


    return (
        <header>
            <div className="theme-toggle" onClick={toggleTheme}>
                {theme === 'light' ? (
                    <img
                        src="src/assets/LightTheme.svg"
                        alt="Day Mode"
                        className="icon"
                    />
                ) : (
                    <img
                        src="/src/assets/DarkTheme.svg"
                        alt="Night Mode"
                        className="icon"
                    />
                )}
            </div>
            <nav>
                <ul>
                    <li><a href="/">Главная</a></li>
                    <li><a href="/about">Обо мне</a></li>
                    <li><a href="/skills">Навыки</a></li>
                    <li><a href="/projects">Проекты</a></li>
                    <li><a href="/contact">Связаться</a></li>
                </ul>
            </nav>
            <div className="hamburger-menu">
                <input id="menu__toggle" type="checkbox"/>
                <label className="menu__btn" htmlFor="menu__toggle">
                    <span></span>
                </label>

                <ul className="menu__box">
                    <li><a className="menu__item" href="/">Главная</a></li>
                    <li><a className="menu__item" href="/about">Обо мне</a></li>
                    <li><a className="menu__item" href="/skills">Навыки</a></li>
                    <li><a className="menu__item" href="/projects">Проекты</a></li>
                    <li><a className="menu__item" href="/contact">Связаться</a></li>
                </ul>
            </div>
        </header>
    );
};
