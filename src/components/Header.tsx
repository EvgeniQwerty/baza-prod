import styles from "./Header.module.css";
import Burger from "@/svg/burger.svg"
import Image from "next/image";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.header__wrapper}>
            <div className={styles.header__burger}>   
                <a href="/" className={styles.burger__button}><Burger/></a>
                <p className={styles.burger__text}>Menu</p>
            </div>
                <a href="/" className={styles.header__logo}><Image src="/logo.png" alt="Logo" width={96} height={32} /></a>
            </div>
        </header>
    )
}