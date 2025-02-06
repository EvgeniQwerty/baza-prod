"use client";

import React, { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import styles from './PhotoViewBlock.module.css';

interface Photo {
    id: number;
    src: string;
    srcMobile: string; // Добавляем свойство для мобильной версии
    alt: string;
    width: number;
    height: number;
    isLarge?: boolean;
}

interface PhotoViewBlockProps {
    showMoreButton?: boolean;
    initialCount?: number;
}

// Оптимизированный массив фотографий с уникальными данными
const photos: Photo[] = [
    {
        id: 1,
        src: '/services/photos/1.avif',
        srcMobile: '/services/photos/1-mobile.avif', // Мобильная версия
        alt: 'Work',
        width: 1200,
        height: 800
    },
    {
        id: 2,
        src: '/services/photos/2.avif',
        srcMobile: '/services/photos/2-mobile.avif', // Мобильная версия
        alt: 'Work',
        width: 1200,
        height: 800
    },
    {
        id: 3,
        src: '/services/photos/3.avif',
        srcMobile: '/services/photos/3-mobile.avif', // Мобильная версия
        alt: 'Work',
        width: 1200,
        height: 800
    },
    {
        id: 4,
        src: '/services/photos/4.avif',
        srcMobile: '/services/photos/4-mobile.avif', // Мобильная версия
        alt: 'Work',
        width: 1200,
        height: 800
    },
    {
        id: 5,
        src: '/services/photos/5.avif',
        srcMobile: '/services/photos/5-mobile.avif', // Мобильная версия
        alt: 'Work',
        width: 1200,
        height: 800
    }
].map((photo, index) => ({
    ...photo,
    isLarge: index % 5 === 0 // Автоматическое определение больших фото
}));

const PhotoItem = memo(({ photo, priority }: { photo: Photo; priority: boolean }) => (
    <div
        className={`${styles.photo__item} ${photo.isLarge ? styles['photo__item_large'] : ''}`}
        data-testid={`photo-item-${photo.id}`}
    >
        <picture>
            {/* Добавляем источник для мобильной версии */}
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
    initialCount = 12
}) => {
    const [visibleCount, setVisibleCount] = useState(initialCount);
    const visiblePhotos = photos.slice(0, visibleCount);

    const handleShowMore = useCallback(() => {
        setVisibleCount(prev => Math.min(prev + 12, photos.length));
    }, []);

    return (
        <section 
            className={styles.photo}
            aria-label="Галерея фотографий наших проектов"
            role="region"
        >
            <h2 className={styles.photo__title}>
                Ваши проекты нашими глазами
            </h2>

            <div 
                className={styles.photo__grid}
                role="grid"
                aria-live="polite"
            >
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
