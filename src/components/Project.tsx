"use client"
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './Project.module.css';
import ArrowLeft from "@/svg/arrow-left.svg";
import ArrowRight from "@/svg/arrow-right.svg";

interface ProjectProps {
  vimeoLink: string;
  name: string;
  org: string;
  type: string;
  year: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  backstageVimeoLink: string;
  team: string;
}

const Project: React.FC<ProjectProps> = ({
  vimeoLink,
  name,
  org,
  type,
  year,
  img1,
  img2,
  img3,
  img4,
  backstageVimeoLink,
  team,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const images = [img1, img2, img3, img4];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current;
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Автоматическая прокрутка
  useEffect(() => {
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.project}>
      <header className={styles.project__header}>
        <div>
          <h2 className={styles.project__name}>
            {name}
          </h2>
        </div>
        <div className={styles.project__details}>
          <h3 className={styles.project__details_org}>{org}</h3>
          <h4 className={styles.project__details_type}>{type}</h4>
        </div>
      </header>

      <div className={styles.project__video}>
        <iframe
          src={vimeoLink}
          allow="autoplay; fullscreen; picture-in-picture;autoplay"
          allowFullScreen
          title="Project Video"
        ></iframe>
      </div>

      <section className={styles.project__content}>
        <div className={styles.project__content_left}>
          <h3 className={styles.project__content_title}>Как это было</h3>
          <div 
            className={styles.project__photos}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {images.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`Проект Фото ${idx + 1}`}
                className={`${styles.project__photos_img} ${styles.carousel__slide}`}
                data-active={idx === currentSlide}
                width={1200}
                height={800}
                priority={idx === 0}
                unoptimized 
              />
            ))}
            <button 
              className={`${styles.carousel__button} ${styles.carousel__button_prev}`}
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <ArrowLeft/>
            </button>
            <button 
              className={`${styles.carousel__button} ${styles.carousel__button_next}`}
              onClick={handleNext}
              aria-label="Next slide"
            >
              <ArrowRight/>
            </button>
          </div>
          <div className={styles.project__content_video}>
            <iframe
              src={backstageVimeoLink}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Backstage Video"
            ></iframe>
          </div>
        </div>

        <div className={styles.project__content_right}>
          <h3 className={styles.project__content_title}>Команда проекта</h3>
          {team.split('\n').map((line, index) => (
            <p key={index} className={styles.project__content_team_line}>
              {line}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Project;
