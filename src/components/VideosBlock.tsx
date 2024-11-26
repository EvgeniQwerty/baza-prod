"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./VideosBlock.module.css";
import VideoBlock from "@/components/VideoBlock";

interface VideoData {
    folderPath: string;
    name: string;
    org: string;
    type: string;
    typeCode: string;
    year: string;
    imgs: number;
}

const videoData: VideoData[] = [
    {
        folderPath: "/projects/servicecar",
        name: "Servicecar",
        org: "Servicecar",
        type: "Реклама на ТВ",
        typeCode: "commercial",
        year: "2023",
        imgs: 4,
    },
    {
        folderPath: "/projects/smena",
        name: "Первая работа",
        org: "Кинотеатр Смена",
        type: "HR-видео",
        typeCode: "commercial",
        year: "2023",
        imgs: 8,
    },
    {
        folderPath: "/projects/supergoats",
        name: "Суперкозлы",
        org: "Суперкозлы",
        type: "Музыкальный клип",
        typeCode: "clip",
        year: "2023",
        imgs: 9,
    },
    {
        folderPath: "/projects/psycho",
        name: "Псих",
        org: "Бренд одежды",
        type: "Fashion-ролик",
        typeCode: "photo",
        year: "2023",
        imgs: 6,
    },
    {
        folderPath: "/projects/servicecar",
        name: "Servicecar",
        org: "Servicecar",
        type: "Реклама на ТВ",
        typeCode: "commercial",
        year: "2023",
        imgs: 4,
    },
    {
        folderPath: "/projects/smena",
        name: "Первая работа",
        org: "Кинотеатр Смена",
        type: "HR-видео",
        typeCode: "commercial",
        year: "2023",
        imgs: 8,
    },
    {
        folderPath: "/projects/supergoats",
        name: "Суперкозлы",
        org: "Суперкозлы",
        type: "Музыкальный клип",
        typeCode: "clip",
        year: "2023",
        imgs: 9,
    },
    {
        folderPath: "/projects/psycho",
        name: "Псих",
        org: "Бренд одежды",
        type: "Fashion-ролик",
        typeCode: "photo",
        year: "2023",
        imgs: 6,
    },
];

type FilterType = "all" | "clip" | "commercial" | "photo";

interface VideosBlockProps {
    displayCount?: number;
}

export default function VideosBlock({ displayCount = 4 }: VideosBlockProps) {
    const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
    const [isFiltering, setIsFiltering] = useState(false);

    const filteredVideos = videoData.filter(
        (video) => currentFilter === "all" || video.typeCode === currentFilter
    );

    const categories: { label: string; value: FilterType }[] = [
        { label: "Все категории", value: "all" },
        { label: "Музыкальные клипы", value: "clip" },
        { label: "Реклама", value: "commercial" },
        { label: "Фотографии", value: "photo" },
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
                            ${currentFilter === category.value ? styles.categories__button_active : ""}
                        `}
                            onClick={() => handleFilterChange(category.value)}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
                <Link
                    href="/projects"
                    className={`${styles.categories__button} ${styles.categories__watchall}`}
                >
                    Смотреть все
                </Link>
            </div>

            {/* Явная установка класса videos_hidden при фильтрации */}
            <div
                className={`
                    ${styles.videos__blocks} 
                    ${isFiltering ? styles.videos__blocks_hidden : ""}
                `}
            >
                {filteredVideos.slice(0, displayCount).map((video, index) => (
                    <VideoBlock
                        key={index}
                        folderPath={video.folderPath}
                        name={video.name}
                        org={video.org}
                        type={video.type}
                        typeCode={video.typeCode}
                        year={video.year}
                        imgs={video.imgs}
                    />
                ))}
            </div>

            <Link
                href="/projects"
                className={`${styles.categories__button} ${styles.categories__watchall_mobile}`}
            >
                Смотреть все
            </Link>
        </div>
    );
}
