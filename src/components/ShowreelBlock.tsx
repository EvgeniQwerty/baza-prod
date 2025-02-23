'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import styles from "./ShowreelBlock.module.css";

type ButtonType = 'baza' | 'showreel';
const SLIDE_INTERVAL = 3000;
const TOTAL_SLIDES = 5;
const MOBILE_VIDEO_PATH = '/showreel_media/main_video-mobile.webm';
const DESKTOP_VIDEO_PATH = '/showreel_media/main_video.webm';

export default function ShowreelBlock() {
    const [activeButton, setActiveButton] = useState<ButtonType>('showreel');
    const [currentImage, setCurrentImage] = useState(1);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const observerRef = useRef<IntersectionObserver>();

    const initVideo = useCallback(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const videoPath = isMobile ? MOBILE_VIDEO_PATH : DESKTOP_VIDEO_PATH;

        if (videoElement.src !== videoPath) {
            videoElement.src = videoPath;
        }

        videoElement.preload = 'metadata';
    }, []);

    // Intersection Observer для ленивой загрузки видео
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        observerRef.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                initVideo();
                videoElement.play().catch(console.error);
            }
        }, { threshold: 0.1 });

        observerRef.current.observe(videoElement);

        return () => {
            observerRef.current?.disconnect();
        };
    }, [initVideo]);

    const handleVideoCanPlay = useCallback(() => {
        setIsVideoLoaded(true);
        videoRef.current?.play().catch(console.error);
    }, []);

    useEffect(() => {
        if (isVideoLoaded) return;

        const interval = setInterval(() => {
            setCurrentImage(prev => (prev % TOTAL_SLIDES) + 1);
        }, SLIDE_INTERVAL);

        return () => clearInterval(interval);
    }, [isVideoLoaded]);

    const handleClick = useCallback((buttonType: ButtonType) => {
        setActiveButton(buttonType);
    }, []);

    return (
        <section
            className={styles.showreel}
            aria-label="Видеопрезентация проекта"
            data-video-loaded={isVideoLoaded}
        >
            {!isVideoLoaded && (
                <div
                    className={styles.showreel__slideshow}
                    role="region"
                    aria-live="polite"
                >
                    {Array.from({ length: TOTAL_SLIDES }, (_, i) => i + 1).map((imgNum) => (
                        <picture>
                            <source
                                media="(max-width: 768px)"
                                srcSet={`/showreel_media/imgs/${imgNum}-mobile.avif`}
                                type="image/avif"
                            />
                            <source
                                media="(min-width: 769px)"
                                srcSet={`/showreel_media/imgs/${imgNum}.avif`}
                                type="image/avif"
                            />
                            <img
                                src={`/showreel_media/imgs/${imgNum}.avif`}  // fallback для старых браузеров
                                alt={`Демонстрация проекта - кадр ${imgNum}`}
                                loading={imgNum <= 2 ? 'eager' : 'lazy'}
                                decoding="async"
                                className={`  
                                ${styles.showreel__image} 
                                ${currentImage === imgNum ? styles.image_active : styles.image_inactive}
                            `}
                            />
                        </picture>
                    ))}
                </div>
            )}

            <video
                ref={videoRef}
                className={`${styles.showreel__video} ${isVideoLoaded ? styles.video_visible : ''}`}
                preload="none"
                playsInline
                muted
                loop
                aria-hidden={!isVideoLoaded}
                onCanPlay={handleVideoCanPlay}
                onError={(e) => console.error('Ошибка видео:', e)}
                role="presentation"
            >
            </video>

            {/* Навигация */}
            <nav
                className={styles.showreel__buttons}
                aria-label="Навигация по разделам"
            >
                <Link
                    href="/about"
                    className={`${styles.showreel__button} ${activeButton === 'baza' ? styles.button_active : ''}`}
                    aria-current={activeButton === 'baza' ? 'page' : undefined}
                    prefetch={false}
                >
                    <span>Baza «Мы вас видим»</span>
                </Link>
                <Link
                    href="/projects_media/showreel"
                    className={`${styles.showreel__button} ${activeButton === 'showreel' ? styles.button_active : ''}`}
                    onClick={() => handleClick('showreel')}
                    aria-current={activeButton === 'showreel' ? 'page' : undefined}
                    prefetch={false}
                >
                    <span>Showreel</span>
                </Link>
            </nav>
        </section>
    );
}
