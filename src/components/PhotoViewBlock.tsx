"use client"
import React, { useState } from 'react';
import styles from './PhotoViewBlock.module.css';

interface Photo {
    id: number;
    src: string;
    alt?: string;
    isLarge?: boolean;
}

interface PhotoViewBlockProps {
    showMoreButton?: boolean;
    initialCount?: number;
}

const photos = [
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

const PhotoViewBlock: React.FC<PhotoViewBlockProps> = ({
    showMoreButton = false,
    initialCount = 9
}) => {
    const [visibleCount, setVisibleCount] = useState(initialCount);
    const visiblePhotos = photos.slice(0, visibleCount);

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 9);
    };

    return (
        <div className={styles.photo}>
            <h2 className={styles.photo__title}>Ваши проекты нашими глазами</h2>

            <div className={styles.photo__grid}>
                {visiblePhotos.map((photo, index) => (
                    <div
                        key={photo.id}
                        className={`${styles.photo__item} ${photo.isLarge ? styles['photo__item_large'] : ''
                            }`}
                    >
                        <img
                            src={photo.src}
                            alt={photo.alt || `Photo ${index + 1}`}
                            className={styles.photo__image}
                        />
                    </div>
                ))}
            </div>

            {showMoreButton && visibleCount < photos.length && (
                <button
                    className={styles.photo__more}
                    onClick={handleShowMore}
                >
                    Смотреть еще
                </button>
            )}
        </div>
    );
};

export default PhotoViewBlock;