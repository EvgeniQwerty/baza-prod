"use client"
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

interface VideosBlockProps {
    displayCount?: number;
    enableLoadMore?: boolean;
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

export default function VideosBlock({ displayCount = 4, enableLoadMore = false }: VideosBlockProps) {
    const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
    const [isFiltering, setIsFiltering] = useState(false);
    const [visibleCount, setVisibleCount] = useState(displayCount);

    const filteredVideos = videoData.filter(
        (video) => currentFilter === "all" || video.typeCode === currentFilter
    );

    const categories = [
        { label: "Все категории", value: "all" as FilterType },
        { label: "Музыкальные клипы", value: "clip" as FilterType },
        { label: "Реклама", value: "commercial" as FilterType },
        { label: "Фотографии", value: "photo" as FilterType },
    ];

    const handleFilterChange = (filter: FilterType) => {
        setIsFiltering(true);
        setTimeout(() => {
            setCurrentFilter(filter);
            setVisibleCount(displayCount);
            setIsFiltering(false);
        }, 200);
    };

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + displayCount);
    };

    const showLoadMoreButton = enableLoadMore && visibleCount < filteredVideos.length;

    return (
        <div className={styles.videos}>
            <div className={styles.categories}>
                <div className={styles.categories__filters}>
                    {categories.map((category) => (
                        <button
                            key={category.value}
                            className={`${styles.categories__button} ${currentFilter === category.value ? styles.categories__button_active : ""
                                }`}
                            onClick={() => handleFilterChange(category.value)}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {!showLoadMoreButton && (
                    <Link href="/projects" className={`${styles.categories__button} ${styles.categories__watchall}`}>
                        Смотреть все
                    </Link>
                )}
            </div>

            <div className={`${styles.videos__blocks} ${isFiltering ? styles.videos__blocks_hidden : ""}`}>
                {filteredVideos.slice(0, visibleCount).map((video, index) => (
                    <VideoBlock
                        key={`${video.folderPath}-${index}`}
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

            {showLoadMoreButton && (
                <button
                    onClick={handleLoadMore}
                    className={`${styles.categories__button} ${styles.categories__loadmore}`}
                >
                    Смотреть еще
                </button>
            )}

            {!showLoadMoreButton && (
                <Link href="/projects" className={`${styles.categories__button} ${styles.categories__watchall_mobile}`}>
                    Смотреть все
                </Link>
            )}
        </div>
    );
}