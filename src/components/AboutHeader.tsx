'use client'
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./AboutHeader.module.css";

interface VimeoPlayerProps {
  onLoad: () => void;
}

const VimeoPlayer = ({ onLoad }: VimeoPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleLoad = () => {
      onLoad();
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleLoad);
      }
    };
  }, [onLoad]);

  return (
    <div className={styles.showreel__video}>
      <iframe
        ref={iframeRef}
        src="https://player.vimeo.com/video/1056798263"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        title="Baza Showreel"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      ></iframe>
    </div>
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
            srcSet={`/showreel_media/imgs/${imgNum}-mobile.avif`}
            type="image/avif"
          />
          <source
            media="(min-width: 769px)"
            srcSet={`/showreel_media/imgs/${imgNum}.avif`}
            type="image/avif"
          />
          <img
            src={`/showreel_media/imgs/${imgNum}.avif`}
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
        <VimeoPlayer onLoad={handleVideoLoad} />

        <div className={styles.showreel__buttons} role="region" aria-live="polite">
          <h1 id="about-heading" className={styles.showreel__button}>
            «Мы вас видим»
          </h1>
        </div>
      </div>

      <div className={styles.quote} role="article">
        <div className={styles.quote__left}>
          <h4 className={`${styles.quote__h4} ${styles.quote__h4_accent}`}>
            Мы взяли свои страхи, свою силу, свою страсть и создали этот ролик 
            как визуальное выражение того, кем мы являемся.
          </h4>
          <h4 className={styles.quote__h4}>
            Этот процесс помогает нам лучше понять, как раскрывать вас.
          </h4>
        </div> 
        <div className={styles.quote__right}>
          <h3 className={styles.quote__h3}>
            Мы видим ваши<br/>переживания, талант<br/>и желание<br/>самовыражаться
          </h3>
        </div>   
      </div>
    </section>
  );
}
