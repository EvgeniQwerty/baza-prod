'use client'
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./AboutHeader.module.css";

export default function AboutHeader() {
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
        <>
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
                    <a
                        className={styles.showreel__button}
                    >
                        Baza «Мы вас видим» <span className={styles.showreel__year}>2024</span>
                    </a>
                </div>
            </div>
            <div className={styles.quote}>
                <h2 className={styles.quote__h2}>
                    «Мы видим ваши переживания, ваш талант и желание. Нам важно дать место, где вы<br />максимально себя проявите. Baza - это место, где талант приобретает выражение»
                </h2>

                <h3 className={styles.quote__h3}>
                    Каждый важен, каждый внес свою лепту в эту историю
                </h3>
            </div>
        </>
    );
}