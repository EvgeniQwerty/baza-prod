"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from "./Header.module.css";
import Burger from "@/svg/burger.svg";
import Logo from "@/svg/logo.svg";

const menuItems = [
    { label: 'О нас', href: '/about' },
    { label: 'Проекты', href: '/projects' },
    { label: 'Услуги', href: '/services' },
    { label: 'Контакты', href: '/contacts' },
    { label: 'Showreel', href: '/projects/showreel' }
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const toggleMenu = useCallback(() => {
        if (!isMenuOpen) {
            setIsMenuOpen(true);
            setIsAnimating(true);
        } else {
            startClosingAnimation();
        }
    }, [isMenuOpen]);

    const startClosingAnimation = useCallback(() => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsMenuOpen(false);
            setIsAnimating(false);
        }, 500);
    }, []);

    const handleLinkClick = useCallback(() => {
        if (isMenuOpen) startClosingAnimation();
    }, [isMenuOpen, startClosingAnimation]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMenuOpen) startClosingAnimation();
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isMenuOpen, startClosingAnimation]);

    return (
        <header className={styles.header}>
            <div className={styles.header__wrapper}>
                <button
                    className={`${styles.header__burger} ${isMenuOpen ? styles.burger_active : ''}`}
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-label="Меню навигации"
                >
                    <div className={styles.burger__button}>
                        <Burger aria-hidden="true" />
                    </div>
                    <p className={styles.burger__text}>Menu</p>
                </button>
                
                <Link 
                    href="/" 
                    className={styles.header__logo}
                    aria-label="Главная страница"
                    prefetch={false}
                >
                    <Logo className={styles.logo} aria-hidden="true" />
                </Link>
            </div>

            {/* Оверлей меню */}
            {isMenuOpen && (
                <div
                    className={`${styles.menu__overlay} ${isAnimating ? styles.menu__overlay_closing : ''}`}
                    onClick={startClosingAnimation}
                    role="presentation"
                    aria-hidden="true"
                />
            )}

            {/* Выплывающее меню */}
            <nav
                className={`${styles.menu} ${isMenuOpen ? styles.menu_open : ''} ${isAnimating ? styles.menu_closing : ''}`}
                aria-label="Основная навигация"
            >
                <ul className={styles.menu__list}>
                    {menuItems.map((item, index) => (
                        <li key={item.href} className={styles.menu__item}>
                            <Link
                                href={item.href}
                                className={styles.menu__link}
                                onClick={handleLinkClick}
                                prefetch={false}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}