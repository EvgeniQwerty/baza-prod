'use client';
import { useEffect, useRef } from "react";
import styles from "./IdeaBlock.module.css";
import Link from "next/link";

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

        videoElement.muted = true;

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
                preload="auto"
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
            <p className={styles.ideablock__title}>
                <Link
                    href="/about"
                    className={styles.ideablock__link}
                    prefetch={false}>Мы вас видим
                </Link>
            </p>
        </div>
    );
}
