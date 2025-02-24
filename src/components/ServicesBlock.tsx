"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ServicesBlock.module.css';

interface Service {
    id: number;
    title: string;
    image: string;
    video: string;
}

interface ServiceBlockProps {
    services?: Service[];
}

const defaultServices: Service[] = [
    {
        id: 1,
        title: 'Музыкальные клипы',
        image: '/services_media/music.avif',
        video: '/services_media/music.webm'
    },
    {
        id: 2,
        title: 'Рекламные ролики',
        image: '/services_media/comm.avif',
        video: '/services_media/comm.webm'
    },
    {
        id: 3,
        title: 'Продюсирование',
        image: '/services_media/prod.avif',
        video: '/services_media/prod.webm'
    },
    {
        id: 4,
        title: 'Креатив',
        image: '/services_media/creative.avif',
        video: '/services_media/creative.webm'
    },
    {
        id: 5,
        title: 'Скоро появится',
        image: '/services_media/wip.avif',
        video: '/services_media/wip.webm'
    }
];

const Modal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <div 
            className={styles.modal__overlay} 
            onClick={(e) => e.target === e.currentTarget && onClose()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className={styles.modal__content}>
                <button 
                    className={styles.modal__close} 
                    onClick={onClose}
                    aria-label="Закрыть модальное окно"
                >
                    &times;
                </button>
                <p className={styles.modal__text} id="modal-title">
                    Нажмите на эту кнопку, чтобы начать диалог по интересующей вас услуге в Telegram
                </p>
                <a
                    href="https://t.me/kalashnikovk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modal__button}
                    aria-label="Связаться с нами в Telegram"
                >
                    Связаться с нами
                </a>
            </div>
        </div>
    );
};

const ServiceCard: React.FC<{ service: Service; onClick: () => void; isActive?: boolean }> = React.memo(
    ({ service, onClick, isActive = false }) => {
        const videoRef = useRef<HTMLVideoElement>(null);
        const [isHovered, setIsHovered] = useState(false);
        const [isDesktop, setIsDesktop] = useState(false);

        // Проверка на размер экрана
        useEffect(() => {
            const checkScreenSize = () => setIsDesktop(window.innerWidth > 768);
            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);
            return () => window.removeEventListener('resize', checkScreenSize);
        }, []);

        useEffect(() => {
            const video = videoRef.current;
            if (!video) return;

            video.preload = 'auto';
            video.muted = true;
            video.playsInline = true;
            video.loop = true;

            const handleCanPlay = () => video.play().catch(console.error);
            const handleError = () => console.error(`Ошибка загрузки видео: ${service.title}`);

            video.addEventListener('canplay', handleCanPlay);
            video.addEventListener('error', handleError);

            return () => {
                video.removeEventListener('canplay', handleCanPlay);
                video.removeEventListener('error', handleError);
            };
        }, [service.title]);

        // Воспроизведение в зависимости от активности карточки
        useEffect(() => {
            const video = videoRef.current;
            if (video) {
                if (isActive || isHovered) {
                    video.play().catch(console.error);
                } else {
                    video.pause();
                }
            }
        }, [isActive, isHovered]);

        const handleMouseEnter = useCallback(() => {
            if (isDesktop) {
                setIsHovered(true);
            }
        }, [isDesktop]);

        const handleMouseLeave = useCallback(() => {
            if (isDesktop) {
                setIsHovered(false);
            }
        }, [isDesktop]);

        return (
            <div
                className={`${styles.services__imagewrapper} ${isHovered ? styles.hovered : ''}`}
                onClick={onClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                role="button"
                tabIndex={0}
                onKeyUp={(e) => e.key === 'Enter' && onClick()}
                aria-label={`Открыть информацию об услуге: ${service.title}`}
            >
                <picture>
                    <source srcSet={service.image.replace('.avif', '-mobile.avif')} media="(max-width: 768px)" />
                    <img
                        src={service.image}
                        alt={service.title}
                        className={`${styles.services__image} ${isHovered ? styles.services__image_hovered : ''}`}
                    />
                </picture>

                <video
                    ref={videoRef}
                    className={`${styles.services__video} ${
                        isHovered || isActive ? styles.services__video_visible : ''
                    }`}
                    aria-hidden="true"
                    muted
                    playsInline
                    preload="auto"
                    loop
                >
                    <source src={service.video.replace('.webm', '-mobile.webm')} type="video/webm" media="(max-width: 768px)" />
                    <source src={service.video} type="video/webm" media="(min-width: 769px)" />
                </video>

                <div className={styles.services__overlay} />
                <div className={styles.services__content}>
                    <h3 className={styles.services__title}>{service.title}</h3>
                </div>
            </div>
        );
    }
);

ServiceCard.displayName = 'ServiceCard';

const ServicesBlock: React.FC<ServiceBlockProps> = ({
    services = defaultServices
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const minSwipeDistance = 50;

    const handleOpenModal = useCallback(() => setModalOpen(true), []);
    const handleCloseModal = useCallback(() => setModalOpen(false), []);

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    }, []);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    }, []);

    const onTouchEnd = useCallback(() => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        
        if (Math.abs(distance) < minSwipeDistance) return;
        
        setCurrentSlide(prev => {
            if (distance > 0 && prev < services.length - 1) {
                return prev + 1;
            }
            if (distance < 0 && prev > 0) {
                return prev - 1;
            }
            return prev;
        });
    }, [touchStart, touchEnd, services.length]);

    useEffect(() => {
        if (sliderRef.current) {
            const slideWidth = sliderRef.current.offsetWidth * 0.5;
            const offset = -currentSlide * slideWidth;
            sliderRef.current.style.transform = `translateX(${offset}px)`;
        }
    }, [currentSlide]);

    return (
        <section className={styles.services} aria-label="Наши услуги">
            <div className={styles.services__progress}>
                {services.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.services__progressitem} ${
                            index === currentSlide ? styles.services__progressitem_active : ''
                        }`}
                    />
                ))}
            </div>

            <div className={styles.services__mobile}>
    <div
        className={styles.services__slider}
        ref={sliderRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
    >
        {services.map((service, index) => (
            <div 
                key={service.id} 
                className={`${styles.services__slide} ${index === currentSlide ? styles.active : ''}`}
            >
                <ServiceCard 
                    service={service} 
                    onClick={handleOpenModal} 
                    isActive={index === currentSlide} 
                />
            </div>
            ))}
        </div>
    </div>

            <div className={styles.services__grid}>
                {services.map((service) => (
                    <div key={service.id} className={styles.services__card}>
                        <ServiceCard service={service} onClick={handleOpenModal} />
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </section>
    );
};

export default React.memo(ServicesBlock);
