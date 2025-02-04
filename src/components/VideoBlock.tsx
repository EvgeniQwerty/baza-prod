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

  const imageSrc = useMemo(() => `${folderPath}/${currentImageIndex}.png`, [folderPath, currentImageIndex]);

  return (
    <Link 
      href={folderPath}
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
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="100vw"
          quality={75}
          priority={false}
          className={styles.videoblock__image}
          unoptimized
        />
      </div>
      
      <div className={styles.videoblock__buttons}>
        <p className={styles.videoblock__type}>{type}</p>
        <span 
          className={styles.videoblock__button}
          tabIndex={0}
          role="button"
        >
          {name}
        </span>
      </div>
    </Link>
  );
};

export default VideoBlock;
