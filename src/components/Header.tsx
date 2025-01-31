"use client";
import React, { useState } from 'react';
import Link from 'next/link';
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
        setIsClosing(true);
        setIsMenuOpen(false);
        setTimeout(() => {
            setShowOverlay(false);
            setIsClosing(false);
        }, 500);
    };

    const menuItems = [
        { label: 'О нас', href: '/about' },
        { label: 'Проекты', href: '/projects' },
        { label: 'Услуги', href: '/services' },
        { label: 'Контакты', href: '/contacts' },
        { label: 'Showreel', href: '/projects/showreel' }
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
                        <Burger />
                    </div>
                    <p className={styles.burger__text}>Menu</p>
                </div>
                <a href="/" className={styles.header__logo}>
                        <Logo className={styles.logo} />
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
                            <Link
                                href={item.href}
                                className={styles.menu__link}
                                onClick={closeMenu}
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
