'use client';
import { useEffect, useRef } from "react";
import styles from "./IdeaBlock.module.css";

export default function IdeaBlock() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const playVideo = async () => {
            try {
                await videoElement.play();
            } catch (error) {
                console.log("Автовоспроизведение видео заблокировано");
            }
        };

        playVideo();

        return () => {
            if (videoElement) {
                videoElement.pause();
            }
        };
    }, []);

    return (
        <div className={styles.ideablock}>
            <video
                ref={videoRef}
                className={styles.ideablock__video}
                src="/ideas/ideas_video.webm"
                preload="metadata"
                playsInline
                muted
                loop
                aria-label="Фоновое видео с анимацией"
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