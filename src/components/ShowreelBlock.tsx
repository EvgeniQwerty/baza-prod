'use client'

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ShowreelBlock.module.css";

type ButtonType = 'baza' | 'showreel';
const SLIDE_INTERVAL = 3000;
const TOTAL_SLIDES = 5;
const VIDEO_PATH = '/showreel/main_video.webm';

export default function ShowreelBlock() {
    const [activeButton, setActiveButton] = useState<ButtonType>('showreel');
    const [currentImage, setCurrentImage] = useState(1);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Мемоизируем обработчики событий
    const handleVideoCanPlay = useCallback(() => {
        setIsVideoLoaded(true);
        videoRef.current?.play().catch(error => {
            console.error("Video playback error:", error);
        });
    }, []);

    const handleVideoError = useCallback((error: Event) => {
        console.error('Video loading error:', error);
        setIsVideoLoaded(false);
    }, []);

    // Инициализация видео
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        videoElement.src = VIDEO_PATH;
        videoElement.load();

        videoElement.addEventListener('canplay', handleVideoCanPlay);
        videoElement.addEventListener('error', handleVideoError);

        return () => {
            videoElement.removeEventListener('canplay', handleVideoCanPlay);
            videoElement.removeEventListener('error', handleVideoError);
        };
    }, [handleVideoCanPlay, handleVideoError]);

    // Слайдшоу
    useEffect(() => {
        if (isVideoLoaded) return; // Останавливаем слайдшоу если видео загружено

        const interval = setInterval(() => {
            setCurrentImage(prev => prev === TOTAL_SLIDES ? 1 : prev + 1);
        }, SLIDE_INTERVAL);

        return () => clearInterval(interval);
    }, [isVideoLoaded]);

    const handleClick = useCallback((buttonType: ButtonType) => {
        setActiveButton(buttonType);
    }, []);

    return (
        <section 
            className={styles.showreel}
            aria-label="Showreel presentation"
        >
            {/* Слайдшоу с ленивой загрузкой для неактивных изображений */}
            {!isVideoLoaded && (
                <div 
                    className={styles.showreel__slideshow}
                    role="region"
                    aria-label="Project images slideshow"
                >
                    {Array.from({ length: TOTAL_SLIDES }, (_, i) => i + 1).map((imgNum) => (
                        <Image 
                            key={imgNum}
                            src={`/showreel/imgs/${imgNum}.png`} 
                            alt={`Project showcase image ${imgNum}`} 
                            fill
                            sizes="100vw"
                            quality={85}
                            priority={imgNum === 1} // Приоритетная загрузка только для первого изображения
                            loading={imgNum === 1 ? 'eager' : 'lazy'}
                            className={`
                                ${styles.showreel__image} 
                                ${currentImage === imgNum ? styles.image_active : styles.image_inactive}
                            `}
                        />
                    ))}
                </div>
            )}

            {/* Видео с оптимизированными атрибутами */}
            <video
                ref={videoRef}
                preload="metadata"
                className={`${styles.showreel__video} ${isVideoLoaded ? styles.video_visible : ''}`}
                playsInline
                muted
                loop
                aria-label="Showreel video"
                role="presentation"
            />

            {/* Навигационные кнопки */}
            <nav className={styles.showreel__buttons} aria-label="Project navigation">
                <Link 
                    href="/about"
                    className={`${styles.showreel__button} ${activeButton === 'baza' ? styles.button_active : ''}`}
                    aria-current={activeButton === 'baza' ? 'page' : undefined}
                >
                    <span>Baza «Мы вас видим»</span>
                    <time className={styles.showreel__year} dateTime="2024">2024</time>
                </Link>
                <Link 
                    href="/projects/showreel"
                    className={`${styles.showreel__button} ${activeButton === 'showreel' ? styles.button_active : ''}`}
                    onClick={() => handleClick('showreel')}
                    aria-current={activeButton === 'showreel' ? 'page' : undefined}
                >
                    <span>Showreel</span>
                    <time className={styles.showreel__year} dateTime="2024">2024</time>
                </Link>
            </nav>
        </section>
    );
}