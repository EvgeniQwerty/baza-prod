"use client"
import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./VideosBlock.module.css";
import videosData from "@/videosData";

const VideoBlock = dynamic(() => import("@/components/VideoBlock"), {
  loading: () => <div className={styles.loader}>Загрузка...</div>,
  ssr: false
});

type FilterType = "all" | "clip" | "commercial" | "photo";

interface VideosBlockProps {
  displayCount?: number;
  enableLoadMore?: boolean;
}

const Categories = [
  { label: "Все категории", value: "all" },
  { label: "Музыкальные клипы", value: "clip" },
  { label: "Реклама", value: "commercial" },
  // { label: "Фотографии", value: "photo" }
] as const;

export default function VideosBlock({ 
  displayCount = 4, 
  enableLoadMore = false 
}: VideosBlockProps) {
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [isFiltering, setIsFiltering] = useState(false);
  const [visibleCount, setVisibleCount] = useState(displayCount);

  const filteredVideos = useMemo(() => 
    videosData.filter(
      (video) => currentFilter === "all" || video.typeCode === currentFilter
    ), 
    [currentFilter]
  );

  const handleFilterChange = useCallback((filter: FilterType) => {
    setIsFiltering(true);
    setTimeout(() => {
      setCurrentFilter(filter);
      setVisibleCount(displayCount);
      setIsFiltering(false);
    }, 200);
  }, [displayCount]);

  const handleLoadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + displayCount, filteredVideos.length));
  }, [displayCount, filteredVideos.length]);

  const showLoadMoreButton = enableLoadMore && visibleCount < filteredVideos.length;
  const showWatchAllButton = !enableLoadMore;

  return (
    <div 
      className={styles.videos} 
      aria-label="Видеопроекты"
      role="region"
    >
      <div className={styles.categories}>
        <div 
          className={styles.categories__filters} 
          role="tablist"
        >
          {Categories.map((category) => (
            <button
              key={category.value}
              className={`${styles.categories__button} ${
                currentFilter === category.value ? styles.categories__button_active : ""
              }`}
              onClick={() => handleFilterChange(category.value as FilterType)}
              role="tab"
              aria-selected={currentFilter === category.value}
            >
              {category.label}
            </button>
          ))}
        </div>

        {showWatchAllButton && (
          <Link 
            href="/projects" 
            className={`${styles.categories__button} ${styles.categories__watchall}`}
            aria-label="Перейти ко всем проектам"
          >
            Смотреть все
          </Link>
        )}

        {!showWatchAllButton && (
          <Link 
            href="/services" 
            className={`${styles.categories__button} ${styles.categories__watchall}`}
            aria-label="Перейти ко всем услугам"
          >
            Услуги
          </Link>
        )}
      </div>

      <div 
        className={`${styles.videos__blocks} ${
          isFiltering ? styles.videos__blocks_hidden : ""
        }`}
        aria-live="polite"
      >
        {filteredVideos.slice(0, visibleCount).map((video) => (
          <VideoBlock
            key={video.folderPath}
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
          aria-label="Загрузить больше видео"
        >
          Смотреть еще
        </button>
      )}

      {showWatchAllButton && (
        <Link 
          href="/projects" 
          className={`${styles.categories__button} ${styles.categories__watchall_mobile}`}
          aria-label="Перейти ко всем проектам (мобильная версия)"
        >
          Смотреть все
        </Link>
      )}
    </div>
  );
}
