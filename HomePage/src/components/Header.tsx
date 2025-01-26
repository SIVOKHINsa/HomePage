import '../styles/header.css';
import React, { useState } from 'react';
import {useTheme} from '../context/ThemeContext';
import lightThemeIcon from '../assets/LightTheme.svg';
import DarkThemeIcon from '../assets/DarkTheme.svg';
import {Menu} from "./Menu.tsx";



export const Header = () => {
    const {theme, toggleTheme} = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header>
            <div className="theme-toggle" onClick={toggleTheme}>
                {theme === 'light' ? (
                    <img
                        src={lightThemeIcon}
                        alt="Day Mode"
                        className="icon"
                    />
                ) : (
                    <img
                        src={DarkThemeIcon}
                        alt="Night Mode"
                        className="icon"
                    />
                )}
            </div>
            <nav>
                <Menu/>
            </nav>
            <div className="hamburger-menu">
                <input
                    id="menu__toggle"
                    type="checkbox"
                    checked={isMenuOpen}
                    onChange={e => setIsMenuOpen(e.target.checked)}
                />
                <label className="menu__btn" htmlFor="menu__toggle">
                    <span></span>
                </label>
                {isMenuOpen && <Menu menuBoxClass="menu__box" menuItemClass="menu__item" />}
            </div>
        </header>
    );
};
