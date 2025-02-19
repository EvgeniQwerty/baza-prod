'use client'
import { useState, useEffect, useRef, useCallback } from "react";
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
      className={styles.showreel__video}
      playsInline
      muted
      loop
      aria-hidden="true"
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
    >
      <source
        src="/showreel/main_video-mobile.webm"
        type="video/webm"
        media="(max-width: 768px)"
      />
      <source
        src="/showreel/main_video.webm"
        type="video/webm"
        media="(min-width: 769px)"
      />
    </video>
  );
};

const Slideshow = ({ currentImage }: { currentImage: number }) => (
  <div className={styles.showreel__slideshow} role="presentation">
    {[1, 2, 3, 4, 5].map((imgNum) => {
      const isActive = currentImage === imgNum;
      return (
        <picture key={imgNum}>
          <source
            media="(max-width: 768px)"
            srcSet={`/showreel/imgs/${imgNum}-mobile.avif`}
            type="image/avif"
          />
          <source
            media="(min-width: 769px)"
            srcSet={`/showreel/imgs/${imgNum}.avif`}
            type="image/avif"
          />
          <img
            src={`/showreel/imgs/${imgNum}.avif`} // Фолбэк для старых браузеров
            alt={isActive ? `Кадр ${imgNum} из шоурила Baza` : ''}
            className={`
              ${styles.showreel__image} 
              ${isActive ? styles.image_active : styles.image_inactive}
            `}
            loading={imgNum <= 2 ? 'eager' : 'lazy'}
            decoding={isActive ? 'auto' : 'async'}
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
            «Мы вас видим»
          </h1>
        </div>
      </div>

      <div className={styles.quote} role="article">
        <div className={styles.quote__left}>
          <h4 className={`${styles.quote__h4} ${styles.quote__h4_accent}`}>Мы взяли свои страхи, свою силу, свою страсть и создали этот ролик 
          как визуальное выражение того, кем мы являемся. </h4>
          <h4 className={styles.quote__h4}>Этот процесс помогает нам лучше понять, как раскрывать вас.</h4>
        </div> 
        <div className={styles.quote__right}>
          <h3 className={styles.quote__h3}>Мы видим ваши<br/>переживания, талант<br/>и желание<br/>самовыражаться</h3>
        </div>   
      </div>
    </section>
  );
}
