"use client"
import React, { useState, useEffect } from 'react';
import styles from "./Header.module.css";
import Burger from "@/svg/burger.svg";
import Logo from "@/svg/logo.svg";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const toggleMenu = () => {
        if (!isMenuOpen) {
            setIsMenuOpen(true);
            setShowOverlay(true);
            setIsClosing(false);
        } else {
            setIsClosing(true);
            setIsMenuOpen(false);
            setTimeout(() => {
                setShowOverlay(false);
                setIsClosing(false);
            }, 500);
        }
    };

    const closeMenu = () => {
        toggleMenu();
    };

    const menuItems = [
        { label: 'О нас', href: '#' },
        { label: 'Проекты', href: '#' },
        { label: 'Услуги', href: '#' },
        { label: 'Контакты', href: '#' },
        { label: 'Showreel', href: '#' }
    ];

    return (
        <header className={styles.header}>
            <div className={styles.header__wrapper}>
                <div 
                    className={`
                        ${styles.header__burger} 
                        ${isMenuOpen ? styles.burger_active : ''}
                    `}
                    onClick={toggleMenu}
                >   
                    <div className={styles.burger__button}>
                        <Burger/>
                    </div>
                    <p className={styles.burger__text}>Menu</p>
                </div>
                <a href="/" className={styles.header__logo}>
                    <Logo/>
                </a>
            </div>

            {/* Оверлей меню */}
            {showOverlay && (
                <div 
                    className={`
                        ${styles.menu__overlay}
                        ${isClosing ? styles.menu__overlay_closing : ''}
                    `}
                    onClick={closeMenu}
                />
            )}

            {/* Выплывающее меню */}
            <nav 
                className={`
                    ${styles.menu} 
                    ${isMenuOpen ? styles.menu_open : ''}
                `}
            >
                <ul className={styles.menu__list}>
                    {menuItems.map((item, index) => (
                        <li key={index} className={styles.menu__item}>
                            <a 
                                href={item.href} 
                                className={styles.menu__link}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}