"use client"
import React, { useState, useRef, useEffect, TouchEvent } from 'react';
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
        title: `Продюссирование`,
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

    return (
        <div className={styles.modal__overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className={styles.modal__content}>
                <button className={styles.modal__close} onClick={onClose}>
                    &times;
                </button>
                <p className={styles.modal__text}>
                    Нажмите на эту кнопку, чтобы начать диалог по интересующей вас услуге в Telegram
                </p>
                <a
                    href="https://t.me/kalashnikovk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modal__button}
                >
                    Связаться с нами
                </a>
            </div>
        </div>
    );
};

const ServiceCard = ({ service, onClick }: { service: Service; onClick: () => void }) => (
    <div className={styles.services__imagewrapper} onClick={onClick}>
        <img
            src={service.image}
            alt={service.title}
            className={styles.services__image}
        />
        <div className={styles.services__overlay} />
        <div className={styles.services__content}>
            <h3 className={styles.services__title}>{service.title}</h3>
        </div>
    </div>
);

const ServicesBlock: React.FC<ServiceBlockProps> = ({
    services = defaultServices
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const minSwipeDistance = 50;

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const onTouchStart = (e: TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        
        if (Math.abs(distance) < minSwipeDistance) return;
        
        if (distance > 0 && currentSlide < services.length - 1) {
            setCurrentSlide(prev => prev + 1);
        }
        if (distance < 0 && currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    };

    useEffect(() => {
        if (sliderRef.current) {
            const slideWidth = sliderRef.current.offsetWidth * 0.5;
            const offset = -currentSlide * slideWidth;
            sliderRef.current.style.transform = `translateX(${offset}px)`;
        }
    }, [currentSlide]);

    return (
        <div className={styles.services}>
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
                            className={`${styles.services__slide} ${
                                index === currentSlide ? styles.active : ''
                            }`}
                        >
                            <ServiceCard service={service} onClick={handleOpenModal} />
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
        </div>
    );
};

export default ServicesBlock;