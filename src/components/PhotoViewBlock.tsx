"use client"

import React, { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import styles from './PhotoViewBlock.module.css';
import { Suspense } from 'react';

interface Photo {
    id: number;
    src: string;
    alt: string;
    isLarge?: boolean;
}

interface PhotoViewBlockProps {
    showMoreButton?: boolean;
    initialCount?: number;
}

const photos: Photo[] = [
    {
        id: 1,
        src: '/services/photos/002.jpg',
        alt: 'Work'
    },
    {
        id: 2,
        src: '/services/photos/063.jpg',
        alt: 'Work'
    },
    {
        id: 3,
        src: '/services/photos/070.jpg',
        alt: 'Work'
    },
    {
        id: 4,
        src: '/services/photos/121.jpg',
        alt: 'Work'
    },
    {
        id: 5,
        src: '/services/photos/134.jpg',
        alt: 'Work',
        isLarge: true
    },
    {
        id: 6,
        src: '/services/photos/063.jpg',
        alt: 'Work'
    },
    {
        id: 7,
        src: '/services/photos/070.jpg',
        alt: 'Work'
    },
    {
        id: 8,
        src: '/services/photos/121.jpg',
        alt: 'Work'
    },
    {
        id: 9,
        src: '/services/photos/134.jpg',
        alt: 'Work',
    },
    {
        id: 10,
        src: '/services/photos/002.jpg',
        alt: 'Work',
        isLarge: true
    },
    {
        id: 11,
        src: '/services/photos/002.jpg',
        alt: 'Work'
    },
    {
        id: 12,
        src: '/services/photos/063.jpg',
        alt: 'Work'
    },
    {
        id: 13,
        src: '/services/photos/070.jpg',
        alt: 'Work'
    },
    {
        id: 14,
        src: '/services/photos/121.jpg',
        alt: 'Work'
    },
    {
        id: 15,
        src: '/services/photos/134.jpg',
        alt: 'Work',
        isLarge: true
    },
    {
        id: 16,
        src: '/services/photos/063.jpg',
        alt: 'Work'
    },
    {
        id: 17,
        src: '/services/photos/070.jpg',
        alt: 'Work'
    },
    {
        id: 18,
        src: '/services/photos/121.jpg',
        alt: 'Work'
    },
    {
        id: 19,
        src: '/services/photos/134.jpg',
        alt: 'Work',
    },
    {
        id: 20,
        src: '/services/photos/002.jpg',
        alt: 'Work',
        isLarge: true
    },
];

// Мемоизированный компонент для отдельной фотографии
const PhotoItem = memo(({ photo, index }: { photo: Photo; index: number }) => (
    <div
        className={`${styles.photo__item} ${photo.isLarge ? styles['photo__item_large'] : ''}`}
        data-testid={`photo-item-${index}`}
    >
        <Image
            src={photo.src}
            alt={photo.alt}
            className={styles.photo__image}
            fill
            sizes={photo.isLarge ? 
                "(max-width: 767px) 100vw, 100vw" : 
                "(max-width: 767px) 100vw, 25vw"}
            priority={index < 4} // Приоритетная загрузка первых 4 изображений
            loading={index < 4 ? "eager" : "lazy"}
            quality={75}
        />
    </div>
));

PhotoItem.displayName = 'PhotoItem';

// Компонент кнопки "Показать ещё"
const LoadMoreButton = memo(({ onClick, className }: { onClick: () => void; className: string }) => (
    <button
        className={className}
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
    initialCount = 9
}) => {
    const [visibleCount, setVisibleCount] = useState(initialCount);
    const visiblePhotos = photos.slice(0, visibleCount);

    const handleShowMore = useCallback(() => {
        setVisibleCount(prevCount => prevCount + 9);
    }, []);

    return (
        <section 
            className={styles.photo}
            aria-label="Галерея фотографий наших проектов"
        >
            <h2 className={styles.photo__title}>
                Ваши проекты нашими глазами
            </h2>

            <Suspense fallback={<div className={styles.photo__loading}>Загрузка галереи...</div>}>
                <div 
                    className={styles.photo__grid}
                    role="grid"
                >
                    {visiblePhotos.map((photo, index) => (
                        <PhotoItem
                            key={photo.id}
                            photo={photo}
                            index={index}
                        />
                    ))}
                </div>
            </Suspense>

            {showMoreButton && visibleCount < photos.length && (
                <LoadMoreButton
                    className={styles.photo__more}
                    onClick={handleShowMore}
                />
            )}
        </section>
    );
};

export default memo(PhotoViewBlock);