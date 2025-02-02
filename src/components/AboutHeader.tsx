'use client'
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./AboutHeader.module.css";

interface VideoPlayerProps {
  onLoad: () => void;
}

const VideoPlayer = ({ onLoad }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        videoElement.src = '/showreel/main_video.webm';
        videoElement.preload = 'metadata';
      }
    }, { threshold: 0.1 });

    observer.observe(videoElement);

    const handleLoadedData = () => {
      onLoad();
      videoElement.play().catch(() => {
        videoElement.muted = true;
        videoElement.play();
      });
    };

    videoElement.addEventListener('loadeddata', handleLoadedData);
    return () => {
      observer.disconnect();
      videoElement.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [onLoad]);

  return (
    <video
      ref={videoRef}
      className={`${styles.showreel__video} ${styles.video_visible}`}
      playsInline
      muted
      loop
      aria-hidden="true"
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
    >
      <source src="/showreel/main_video.webm" type="video/webm" />
      <track kind="metadata" src="/showreel/captions.vtt" default />
    </video>
  );
};

const Slideshow = ({ currentImage }: { currentImage: number }) => (
  <div className={styles.showreel__slideshow} role="presentation">
    {[1, 2, 3, 4, 5].map((imgNum) => {
      const isActive = currentImage === imgNum;
      return (
        <picture key={imgNum} className={styles.image__wrapper}>
          <source
            srcSet={`/showreel/imgs/${imgNum}.avif`}
            type="image/avif"
          />
          <source
            srcSet={`/showreel/imgs/${imgNum}.webp`}
            type="image/webp"
          />
          <Image
            src={`/showreel/imgs/${imgNum}.jpg`}
            alt={isActive ? `Кадр ${imgNum} из шоурила Baza` : ''}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={imgNum === 1}
            quality={85}
            className={`
              ${styles.showreel__image} 
              ${isActive ? styles.image_active : styles.image_inactive}
            `}
            loading={imgNum <= 2 ? 'eager' : 'lazy'}
            decoding={isActive ? 'auto' : 'async'}
            unoptimized 
          />
        </picture>
      );
    })}
  </div>
);

export default function AboutHeader() {
  const [currentImage, setCurrentImage] = useState(1);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (!isVideoLoaded) {
      intervalRef.current = setInterval(() => {
        setCurrentImage(prev => (prev % 5) + 1);
      }, 3000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isVideoLoaded]);

  return (
    <section aria-labelledby="about-heading">
      <div className={styles.showreel}>
        {!isVideoLoaded && <Slideshow currentImage={currentImage} />}
        <VideoPlayer onLoad={handleVideoLoad} />

        <div className={styles.showreel__buttons} role="region" aria-live="polite">
          <h1 id="about-heading" className={styles.showreel__button}>
            Baza «Мы вас видим»
          </h1>
        </div>
      </div>

      <div className={styles.quote} role="article">
        <h2 className={styles.quote__h2}>
          «Мы видим ваши переживания, ваш талант и желание. Нам важно дать место, где вы
          <span aria-hidden="true"> </span>
          <span className="sr-only"> сможете</span>
          максимально себя проявите. Baza - это место, где талант приобретает выражение»
        </h2>

        <h3 className={styles.quote__h3} aria-label="Каждый важен, каждый внес свою лепту в эту историю">
          Каждый важен, каждый внес свою лепту в эту историю
        </h3>
      </div>
    </section>
  );
}