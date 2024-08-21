'use client'
import { useState } from "react";
import Image from "next/image";
import styles from "./ShowreelBlock.module.css";

type ButtonType = 'baza' | 'showreel';

export default function ShowreelBlock() {
    const [activeButton, setActiveButton] = useState<ButtonType>('showreel'); // начально активная кнопка

    const handleClick = (buttonType: ButtonType) => {
        setActiveButton(buttonType); // обновляем активную кнопку
    };

    return (
        <div className={styles.showreel}>
            <Image src="/showreel-img.png" alt="Showreel image" layout="fill" objectFit="cover" quality={100} className={styles.showreel__image}></Image>
            <div className={styles.showreel__buttons}>
                <a 
                    className={`${styles.showreel__button} ${activeButton === 'baza' ? styles.button_active : ''}`} 
                    onClick={() => handleClick('baza')}
                >
                    Baza кампейн <span className={styles.showreel__year}>2024</span>
                </a>
                <a 
                    className={`${styles.showreel__button} ${activeButton === 'showreel' ? styles.button_active : ''}`} 
                    onClick={() => handleClick('showreel')}
                >
                    Showreel <span className={styles.showreel__year}>2024</span>
                </a>
            </div>
        </div>
    );
}