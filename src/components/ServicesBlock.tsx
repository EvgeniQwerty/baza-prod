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
    className?: string;
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

const ServicesBlock: React.FC<ServiceBlockProps> = ({
    services = defaultServices
}) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const sliderRef = useRef<HTMLDivElement>(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e: TouchEvent): void => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: TouchEvent): void => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = (): void => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && currentSlide < services.length - 1) {
            setCurrentSlide(prev => prev + 1);
        }
        if (isRightSwipe && currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    };

    useEffect(() => {
        if (sliderRef.current) {
            const slideOffset = 36; // Фиксированное значение сдвига для каждого слайда
            sliderRef.current.style.transform = `translateX(-${currentSlide * slideOffset + currentSlide * 5}dvw)`;
        }
    }, [currentSlide]);

    return (
        <div className={styles.services}>
            {/* Прогресс бар */}
            <div className={styles.services__progress}>
                {services.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.services__progressitem} ${index === currentSlide ? styles['services__progressitem_active'] : ''
                            }`}
                    />
                ))}
            </div>

            {/* Мобильный слайдер */}
            <div className={styles.services__mobile}>
                <div
                    className={styles.services__slider}
                    ref={sliderRef}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {services.map((service) => (
                        <div key={service.id} className={styles.services__slide}>
                            <div className={styles.services__imagewrapper}>
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
                        </div>
                    ))}
                </div>
            </div>

            {/* Десктопная версия */}
            <div className={styles.services__grid}>
                {services.map((service) => (
                    <div key={service.id} className={styles.services__card}>
                        <div className={styles.services__imagewrapper}>
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesBlock;