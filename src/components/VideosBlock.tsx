"use client"
import React, { useState } from 'react';
import styles from "./VideosBlock.module.css";
import VideoBlock from "@/components/VideoBlock";

interface VideoData {
    path: string;
    name: string;
    org: string;
    type: string;
    typeCode: string;
    year: string;
}

const videoData: VideoData[] = [
    {
        path: "/projects/servicecar/1.png", 
        name: "Servicecar", 
        org: "Servicecar", 
        type: "Реклама на ТВ", 
        typeCode: "commercial", 
        year: "2023"
    },
    {
        path: "/projects/smena/1.png", 
        name: "Первая работа", 
        org: "Кинотеатр Смена", 
        type: "HR-видео", 
        typeCode: "commercial", 
        year: "2023"
    },
    {
        path: "/projects/supergoats/1.png", 
        name: "Суперкозлы", 
        org: "Суперкозлы", 
        type: "Музыкальный клип", 
        typeCode: "clip", 
        year: "2023"
    },
    {
        path: "/projects/psycho/1.png", 
        name: "Псих", 
        org: "Бренд одежды", 
        type: "Fashion-ролик", 
        typeCode: "photo", 
        year: "2023"
    }
];

type FilterType = 'all' | 'clip' | 'commercial' | 'photo';

export default function VideosBlock() {
    const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
    const [isFiltering, setIsFiltering] = useState(false);

    const filteredVideos = videoData.filter(video => 
        currentFilter === 'all' || video.typeCode === currentFilter
    );

    const categories: { label: string; value: FilterType }[] = [
        { label: 'Все категории', value: 'all' },
        { label: 'Музыкальные клипы', value: 'clip' },
        { label: 'Реклама', value: 'commercial' },
        { label: 'Фотографии', value: 'photo' }
    ];

    const handleFilterChange = (filter: FilterType) => {
        // Начинаем анимацию исчезновения
        setIsFiltering(true);
        
        // Через короткий интервал меняем фильтр и останавливаем анимацию
        setTimeout(() => {
            setCurrentFilter(filter);
            setIsFiltering(false);
        }, 200); // Время должно совпадать с длительностью CSS-транзишена
    };

    return (
        <div className={styles.videos}>
            {/* Блок категорий */}
            <div className={styles.categories}>
                <div className={styles.categories__filters}>
                    {categories.map((category) => (
                        <button
                            key={category.value}
                            className={`
                            ${styles.categories__button} 
                            ${currentFilter === category.value ? styles.categories__button_active : ''}
                        `}
                            onClick={() => handleFilterChange(category.value)}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
                <button className={styles.categories__button}>Смотреть все</button>
            </div>

            {/* Явная установка класса videos_hidden при фильтрации */}
            <div 
                className={`
                    ${styles.videos__blocks} 
                    ${isFiltering ? styles.videos__blocks_hidden : ''}
                `}
            >
                {filteredVideos.slice(0, 4).map((video, index) => (
                    <VideoBlock 
                        key={index}
                        path={video.path}
                        name={video.name}
                        org={video.org}
                        type={video.type}
                        typeCode={video.typeCode}
                        year={video.year}
                    />
                ))}
            </div>
        </div>
    )
}