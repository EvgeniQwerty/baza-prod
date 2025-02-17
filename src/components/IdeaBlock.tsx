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
                console.error("Автовоспроизведение видео заблокировано:", error);
            }
        };

        // Убедитесь, что видео без звука
        videoElement.muted = true;

        // Пробуем воспроизвести видео с асинхронной загрузкой
        videoElement.load();

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
                preload="auto"  // Пробуем использовать "auto" вместо "metadata"
                playsInline
                muted
                loop
                aria-label="Фоновое видео с анимацией"
            >
                <source
                    srcSet="/ideas/ideas_video-mobile.webm"
                    type="video/webm"
                    media="(max-width: 768px)"
                />
                <source
                    srcSet="/ideas/ideas_video.webm"
                    type="video/webm"
                    media="(min-width: 769px)"
                />
            </video>
            <p className={styles.ideablock__title}>Мы вас видим</p>
        </div>
    );
}
