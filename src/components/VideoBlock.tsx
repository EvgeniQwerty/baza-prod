import { FC, useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './VideoBlock.module.css';

interface VideoBlockProps {
  folderPath: string;
  name: string;
  org: string;
  type: string;
  typeCode: string;
  year: string;
  imgs: number;
}

const VideoBlock: FC<VideoBlockProps> = ({
  folderPath,
  name,
  org,
  type,
  typeCode,
  year,
  imgs
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(1);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setCurrentImageIndex(1);
  }, []);

  useEffect(() => {
    if (!isHovered) return;
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex < imgs ? prevIndex + 1 : 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isHovered, imgs]);

  const imageSrc = useMemo(() => `${folderPath}/${currentImageIndex}.avif`, [folderPath, currentImageIndex]);

  return (
    <Link
      href={folderPath.replace('_media', '')}
      className={`${styles.videoblock} ${isHovered ? styles.videoblock_hovered : ''}`}
      data-type={typeCode}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`${name} ${type} проект ${year}`}
      role="article"
    >
      <div
        className={styles.videoblock__imageWrapper}
        role="img"
        aria-label={`Изображение проекта ${name}`}
      >
        <picture>
          {/* Для мобильных устройств */}
          <source srcSet={imageSrc.replace('.avif', '-mobile.avif')} media="(max-width: 768px)" />
          <img
            src={imageSrc}
            alt={name}
            className={styles.videoblock__image}
            loading="lazy"
          />
        </picture>
      </div>


      <div className={styles.videoblock__buttons}>
        <span
          className={styles.videoblock__button}
          tabIndex={0}
          role="button"
        >
          {name}
        </span>
        <p className={styles.videoblock__type}>{type}</p>
      </div>
    </Link>
  );
};

export default VideoBlock;
