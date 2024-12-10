import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './VideoBlock.module.css';
import Link from 'next/link';

interface VideoBlockProps {
    folderPath: string;
    name: string;
    org: string;
    type: string;
    typeCode: string;
    year: string;
    imgs: number;
}

const VideoBlock: FC<VideoBlockProps> = ({ folderPath, name, org, type, typeCode, year, imgs }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(1);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isHovered) {
            interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => {
                    const nextIndex = prevIndex < imgs ? prevIndex + 1 : 1;
                    return nextIndex;
                });
            }, 1000); // Длительность показа одного кадра
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isHovered, imgs]);

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
        setIsHovered(false);
        setCurrentImageIndex(1); // Сбрасываем на первый кадр
    };

    return (
        // <Link href={folderPath} className={styles.videoblock__link}>
            <Link href={folderPath}
                className={`${styles.videoblock} ${isHovered ? styles.videoblock_hovered : ''}`}
                data-type={typeCode}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <p className={styles.videoblock__type}>{type}</p>
                <div className={styles.videoblock__imageWrapper}>
                    <Image
                        src={`${folderPath}/${currentImageIndex}.png`}
                        alt={name}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        className={`${styles.videoblock__image}`}
                    />
                </div>
                <div className={styles.videoblock__buttons}>
                    <a className={styles.videoblock__button}>
                        {name} <span className={styles.videoblock__year}>{year}</span>
                    </a>
                    <p className={styles.videoblock__org}>{org}</p>
                </div>
            </Link>
        // </Link>
    );
};

export default VideoBlock;
