'use client'
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ShowreelBlock.module.css";
import Link from "next/link";

type ButtonType = 'baza' | 'showreel';

export default function ShowreelBlock() {
    const [activeButton, setActiveButton] = useState<ButtonType>('showreel');
    const [currentImage, setCurrentImage] = useState(1);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Добавляем useEffect для принудительной загрузки видео
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.src = '/showreel/main_video.webm';
            videoRef.current.load(); // Принудительная перезагрузка
            
            // Добавляем обработчики событий
            const videoElement = videoRef.current;
            
            const handleCanPlay = () => {
                setIsVideoLoaded(true);
                videoElement.play().catch(error => {
                    console.error("Ошибка при попытке воспроизведения видео:", error);
                });
            };

            const handleError = (e: Event) => {
                console.error('Ошибка загрузки видео:', e);
            };

            videoElement.addEventListener('canplay', handleCanPlay);
            videoElement.addEventListener('error', handleError);

            // Очистка обработчиков
            return () => {
                videoElement.removeEventListener('canplay', handleCanPlay);
                videoElement.removeEventListener('error', handleError);
            };
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prev => prev === 5 ? 1 : prev + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleClick = (buttonType: ButtonType) => {
        setActiveButton(buttonType);
    };

    // Добавляем консольные логи для отладки
    useEffect(() => {
        // Проверка существования файла через fetch
        fetch('/showreel/main_video.webm')
            .then(response => {
                console.log('Статус ответа:', response.status);
                return response.blob();
            })
            .then(blob => {
                console.log('Размер blob:', blob.size);
            })
            .catch(error => {
                console.error('Ошибка при загрузке видео:', error);
            });
    }, []);

    return (
        <div className={styles.showreel}>
            {/* Слайдшоу изображений */}
            {!isVideoLoaded && (
                <div className={styles.showreel__slideshow}>
                    {[1, 2, 3, 4, 5].map((imgNum) => (
                        <Image 
                            key={imgNum}
                            src={`/showreel/imgs/${imgNum}.png`} 
                            alt={`Showreel image ${imgNum}`} 
                            layout="fill" 
                            objectFit="cover" 
                            quality={100} 
                            className={`
                                ${styles.showreel__image} 
                                ${currentImage === imgNum ? styles.image_active : styles.image_inactive}
                            `}
                            priority
                        />
                    ))}
                </div>
            )}

            {/* Видео */}
            <video
                ref={videoRef}
                preload="auto"
                className={`${styles.showreel__video} ${isVideoLoaded ? styles.video_visible : ''}`}
                playsInline
                muted
                loop
            />

            <div className={styles.showreel__buttons}>
                <Link href="/about"
                    className={`${styles.showreel__button} ${activeButton === 'baza' ? styles.button_active : ''}`}
                >
                    Baza «Мы вас видим» <span className={styles.showreel__year}>2024</span>
                </Link>
                <Link href="/projects/showreel"
                    className={`${styles.showreel__button} ${activeButton === 'showreel' ? styles.button_active : ''}`}
                    onClick={() => handleClick('showreel')}
                >
                    Showreel <span className={styles.showreel__year}>2024</span>
                </Link>
            </div>
        </div>
    );
}