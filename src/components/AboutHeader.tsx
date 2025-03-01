'use client'
import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./AboutHeader.module.css";

const VimeoPlayer = ({ onLoad }: { onLoad: () => void }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const aspectRatio = 9 / 16;
        setHeight(width * aspectRatio);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={styles.showreel} style={{ height }}>
      <div className={styles.showreel__video}>
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1059838109?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          title="Baza Showreel"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onLoad={onLoad}
        ></iframe>
      </div>
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
        {/* {!isVideoLoaded && <Slideshow currentImage={currentImage} />} */}
        <VimeoPlayer onLoad={handleVideoLoad} />

        <div className={styles.showreel__buttons} role="region" aria-live="polite">
          {/* <h1 id="about-heading" className={styles.showreel__button}>
            «Мы вас видим»
          </h1> */}
        </div>
      </div>

      <div className={styles.quote} role="article">
        <div className={styles.quote__left}>
        </div> 
        <div className={styles.quote__right}>
          <h3 className={styles.quote__h3}>
            Мы видим вашу уникальность<br/>и превращаем ее<br/>в креативные визуальные истории
          </h3>
        </div>   
      </div>
    </section>
  );
}
