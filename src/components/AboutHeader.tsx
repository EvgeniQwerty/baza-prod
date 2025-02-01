'use client'
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./AboutHeader.module.css";

interface VideoPlayerProps {
  onLoad: () => void;
}

// Выносим видеоплеер в отдельный компонент для лучшей производительности
const VideoPlayer = ({ onLoad }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = videoRef.current;
    videoElement.src = '/showreel/main_video.webm';
    
    const handleCanPlay = () => {
      onLoad();
      videoElement.play().catch(error => 
        console.error("Video playback error:", error)
      );
    };

    videoElement.addEventListener('canplay', handleCanPlay);
    return () => videoElement.removeEventListener('canplay', handleCanPlay);
  }, [onLoad]);

  return (
    <video
      ref={videoRef}
      preload="auto"
      className={`${styles.showreel__video} ${styles.video_visible}`}
      playsInline
      muted
      loop
      aria-hidden="true"
    />
  );
};

// Выносим слайдшоу в отдельный компонент
const Slideshow = ({ currentImage }: { currentImage: number }) => (
  <div className={styles.showreel__slideshow} role="presentation">
    {[1, 2, 3, 4, 5].map((imgNum) => (
      <Image
        key={imgNum}
        src={`/showreel/imgs/${imgNum}.png`}
        alt={`Кадр ${imgNum} из шоурила Baza`}
        fill
        sizes="100vw"
        priority={imgNum === 1}
        quality={85}
        className={`
          ${styles.showreel__image} 
          ${currentImage === imgNum ? styles.image_active : styles.image_inactive}
        `}
        unoptimized 
      />
    ))}
  </div>
);

export default function AboutHeader() {
  const [currentImage, setCurrentImage] = useState(1);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev % 5) + 1);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section aria-label="О нас">
      <div className={styles.showreel}>
        {!isVideoLoaded && <Slideshow currentImage={currentImage} />}
        <VideoPlayer onLoad={handleVideoLoad} />

        <div className={styles.showreel__buttons}>
          <h1 className={styles.showreel__button}>
            Baza «Мы вас видим»
          </h1>
        </div>
      </div>

      <div className={styles.quote}>
        <h2 className={styles.quote__h2}>
          «Мы видим ваши переживания, ваш талант и желание. Нам важно дать место, где вы
          <span className="sr-only"> </span>максимально себя проявите. Baza - это место, где талант приобретает выражение»
        </h2>

        <h3 className={styles.quote__h3}>
          Каждый важен, каждый внес свою лепту в эту историю
        </h3>
      </div>
    </section>
  );
}