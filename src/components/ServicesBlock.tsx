"use client"

import React, { useState, useRef, useEffect, TouchEvent } from 'react';
import { useCallback } from 'react';
import Image from 'next/image';
import styles from './ServicesBlock.module.css';

interface Service {
    id: number;
    title: string;
    image: string;
}

interface ServiceBlockProps {
    services?: Service[];
}

const defaultServices: Service[] = [
    {
        id: 1,
        title: 'Рекламные ролики',
        image: '/services/comm.png',
    },
    {
        id: 2,
        title: 'Креатив',
        image: '/services/creative.png',
    },
    {
        id: 3,
        title: 'Музыкальные клипы',
        image: '/services/music.png',
    },
    {
        id: 4,
        title: 'Продюсирование',
        image: '/services/prod.png',
    },
    {
        id: 5,
        title: 'Скоро появится',
        image: '/services/wip.png',
    }
];

const Modal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // Обработчик нажатия Escape
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

const ServiceCard: React.FC<{ service: Service; onClick: () => void }> = React.memo(({ service, onClick }) => (
    <div 
        className={styles.services__imagewrapper} 
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onClick()}
        aria-label={`Открыть информацию об услуге: ${service.title}`}
    >
        <Image
            src={service.image}
            alt={service.title}
            className={styles.services__image}
            fill
            sizes="(max-width: 767px) 50vw, (max-width: 1024px) 33vw, 20vw"
            priority={service.id <= 2} // Приоритетная загрузка только для первых двух изображений
        />
        <div className={styles.services__overlay} />
        <div className={styles.services__content}>
            <h3 className={styles.services__title}>{service.title}</h3>
        </div>
    </div>
));

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

    const onTouchStart = useCallback((e: TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    }, []);

    const onTouchMove = useCallback((e: TouchEvent) => {
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
            <div 
                className={styles.services__progress} 
                role="tablist" 
                aria-label="Прогресс просмотра услуг"
            >
                {services.map((_, index) => (
                    <div
                        key={index}
                        role="tab"
                        aria-selected={index === currentSlide}
                        className={`${styles.services__progressitem} ${
                            index === currentSlide ? styles.services__progressitem_active : ''
                        }`}
                        tabIndex={0}
                        onClick={() => setCurrentSlide(index)}
                        onKeyPress={(e) => e.key === 'Enter' && setCurrentSlide(index)}
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
                    role="region"
                    aria-label="Слайдер услуг"
                >
                    {services.map((service, index) => (
                        <div 
                            key={service.id} 
                            className={`${styles.services__slide} ${
                                index === currentSlide ? styles.active : ''
                            }`}
                            role="tabpanel"
                            aria-hidden={index !== currentSlide}
                        >
                            <ServiceCard service={service} onClick={handleOpenModal} />
                        </div>
                    ))}
                </div>
            </div>

            <div 
                className={styles.services__grid}
                role="grid"
                aria-label="Сетка услуг"
            >
                {services.map((service) => (
                    <div 
                        key={service.id} 
                        className={styles.services__card}
                        role="gridcell"
                    >
                        <ServiceCard service={service} onClick={handleOpenModal} />
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </section>
    );
};

export default React.memo(ServicesBlock);