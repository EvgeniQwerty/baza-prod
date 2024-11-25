'use client';
import { useEffect, useRef } from "react";
import styles from "./IdeaBlock.module.css";

export default function IdeaBlock() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load(); // Принудительно загружаем видео
            videoRef.current.play().catch((error) => {
                console.error("Ошибка при воспроизведении видео:", error);
            });
        }
    }, []);

    return (
        <div className={styles.ideablock}>
            <video
                ref={videoRef}
                className={styles.ideablock__video}
                src="/ideas/ideas_video.webm" // Путь к вашему видео
                preload="auto"
                playsInline
                muted
                loop
            />
            <p className={styles.ideablock__title}>Мы<br />вас<br />видим</p>
            <div className={styles.ideablock__title_mobile}>
                <p className={`${styles.ideablock__text_mobile} ${styles.ideablock__text_mobile_first}`}>Мы</p>
                <p className={`${styles.ideablock__text_mobile} ${styles.ideablock__text_mobile_second}`}>вас</p>
                <p className={`${styles.ideablock__text_mobile} ${styles.ideablock__text_mobile_third}`}>видим</p>
            </div>
        </div>
    );
}
