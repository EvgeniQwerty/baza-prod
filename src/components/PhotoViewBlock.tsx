"use client";

import React, { useState, useCallback, useEffect, useRef, memo } from 'react';
import Image from 'next/image';
import styles from './PhotoViewBlock.module.css';
import Link from 'next/link';

interface Photo {
    id: number;
    src: string;
    srcMobile: string;
    alt: string;
    width: number;
    height: number;
    isLarge?: boolean;
}

interface PhotoViewBlockProps {
    showMoreButton?: boolean;
    showServicesLink?: boolean;
    initialCount?: number;
    photos: Photo[];
    videoSrc: string;
    videoSrcMobile: string;
}

const PhotoItem = memo(({ photo, priority }: { photo: Photo; priority: boolean }) => (
    <div
        className={`${styles.photo__item} ${photo.isLarge ? styles['photo__item_large'] : ''}`}
        data-testid={`photo-item-${photo.id}`}
    >
        <picture>
            <source
                srcSet={photo.srcMobile}
                media="(max-width: 767px)"
                type="image/avif"
            />
            <Image
                src={photo.src}
                alt={photo.alt}
                className={styles.photo__image}
                width={photo.width}
                height={photo.height}
                sizes={photo.isLarge ?
                    "(max-width: 767px) 100vw, 100vw" :
                    "(max-width: 767px) 100vw, 25vw"
                }
                priority={priority}
                loading={priority ? "eager" : "lazy"}
                quality={80}
                placeholder="blur"
                blurDataURL={`${photo.src}?q=10&w=50`}
                unoptimized
            />
        </picture>
    </div>
));

PhotoItem.displayName = 'PhotoItem';

const VideoBlock = memo(({ videoSrc, videoSrcMobile }: { videoSrc: string, videoSrcMobile: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const observerRef = useRef<IntersectionObserver>();

    const initVideo = useCallback(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const source = isMobile ? videoSrcMobile : videoSrc;

        if (videoElement.currentSrc !== source) {
            videoElement.src = source;
        }

        videoElement.muted = true;
        videoElement.playsInline = true;
        videoElement.preload = 'metadata';
        
        videoElement
            .play()
            .catch((err) => console.warn('Автоплей не сработал:', err));
    }, [videoSrc, videoSrcMobile]);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        observerRef.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                initVideo();
            } else {
                videoElement.pause();
            }
        }, { threshold: 0.5 });

        observerRef.current.observe(videoElement);

        return () => {
            observerRef.current?.disconnect();
        };
    }, [initVideo]);

    return (
        <div className={`${styles.photo__item} ${styles['photo__item_large']}`}>
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className={styles.photo__image}
                onError={(e) => console.error('Ошибка загрузки видео:', e)}
            >
                <source src={videoSrcMobile} media="(max-width: 767px)" type="video/webm" />
                <source src={videoSrc} type="video/webm" />
                Ваш браузер не поддерживает видео.
            </video>
        </div>
    );
});

VideoBlock.displayName = 'VideoBlock';

const LoadMoreButton = memo(({ onClick }: { onClick: () => void }) => (
    <button
        className={styles.photo__more}
        onClick={onClick}
        type="button"
        aria-label="Показать больше фотографий"
    >
        Смотреть еще
    </button>
));

LoadMoreButton.displayName = 'LoadMoreButton';

const PhotoViewBlock: React.FC<PhotoViewBlockProps> = ({
    showMoreButton = false,
    showServicesLink = true,
    initialCount = 12,
    photos,
    videoSrc,
    videoSrcMobile
}) => {
    const [visibleCount, setVisibleCount] = useState(initialCount);
    const visiblePhotos = photos.slice(0, visibleCount);

    const handleShowMore = useCallback(() => {
        setVisibleCount((prev) => Math.min(prev + 12, photos.length));
    }, [photos.length]);

    return (
        <section
            className={styles.photo}
            aria-label="Галерея фотографий наших проектов"
            role="region"
        >
            <div className={styles.photo__header}>
                {showServicesLink && (
                    <h2 className={styles.photo__title}>
                        Взгляд изнутри
                    </h2>
                )}
                {!showServicesLink && (
                    <h2 className={styles.photo__title}>
                        Ваши проекты<br />нашими глазами
                    </h2>
                )}
                {showServicesLink && (
                    <Link 
                        href="/services" 
                        className={`${styles.photo__button}`}
                        aria-label="Перейти ко всем услугам"
                    >
                        Услуги
                    </Link>
                )}
            </div>

            <div
                className={styles.photo__grid}
                role="grid"
                aria-live="polite"
            >
                <VideoBlock videoSrc={videoSrc} videoSrcMobile={videoSrcMobile} />

                {visiblePhotos.map((photo, index) => (
                    <PhotoItem
                        key={photo.id}
                        photo={photo}
                        priority={index < 4}
                    />
                ))}
            </div>

            {showMoreButton && visibleCount < photos.length && (
                <LoadMoreButton onClick={handleShowMore} />
            )}
        </section>
    );
};

export default memo(PhotoViewBlock);
