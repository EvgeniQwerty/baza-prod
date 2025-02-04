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
    const observerRef = useRef<IntersectionObserver>();

    // Оптимизация загрузки видео
    const initVideo = useCallback(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        videoElement.src = VIDEO_PATH;
        videoElement.preload = 'metadata';
    }, []);

    // Intersection Observer для ленивой загрузки видео
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        observerRef.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                initVideo();
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

    // Слайдшоу с оптимизированными изображениями
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
            {/* Оптимизированное слайд-шоу с современными форматами */}
            {!isVideoLoaded && (
                <div 
                    className={styles.showreel__slideshow}
                    role="region" 
                    aria-live="polite"
                >
                    {Array.from({ length: TOTAL_SLIDES }, (_, i) => i + 1).map((imgNum) => (
                        <Image
                        key={imgNum}
                        src={`/showreel/imgs/${imgNum}.avif`}
                        alt={`Демонстрация проекта - кадр ${imgNum}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={80}
                        priority={imgNum === 1}
                        loading={imgNum <= 2 ? 'eager' : 'lazy'}
                        decoding="async"
                        className={`
                            ${styles.showreel__image} 
                            ${currentImage === imgNum ? styles.image_active : styles.image_inactive}
                        `}
                        unoptimized
                    />
                    ))}
                </div>
            )}

            {/* Оптимизированное видео с отложенной загрузкой */}
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

            {/* Навигация с семантической разметкой */}
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
                    href="/projects/showreel"
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