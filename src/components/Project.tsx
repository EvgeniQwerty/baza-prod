"use client"
import React from 'react';
import Image from 'next/image';
import styles from './Project.module.css';

interface ProjectProps {
  vimeoLink: string;
  name: string;
  org: string;
  type: string;
  year: string;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
  team?: string;
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
  team,
}) => {
  const images = [img1, img2, img3, img4].filter(Boolean) as string[];

  const hasImages = images.length > 0;
  const hasTeam = team?.trim();

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
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          allowFullScreen
          title="Project Video"></iframe>
        <script src="https://player.vimeo.com/api/player.js"></script>
      </div>

      {(hasImages || hasTeam) && (
        <section className={styles.project__content}>
          {hasImages && (
            <div className={styles.project__content_left}>
              <h3 className={styles.project__content_title}>Фото проекта</h3>
              <div className={styles.project__photos}>
                {images.map((img, idx) => (
                  <picture key={idx} className={styles.project__photo_item}>
                    <source
                      srcSet={`${img.replace(".avif", "-mobile.avif")}`}
                      media="(max-width: 767px)"
                      type="image/avif"
                    />
                    <img
                      src={img}
                      alt={`Проект Фото ${idx + 1}`}
                      className={styles.project__photos_img}
                    />
                  </picture>
                ))}
              </div>
            </div>
          )}

          {hasTeam && (
            <div className={styles.project__content_right}>
              <h3 className={styles.project__content_title}>Команда проекта</h3>
              {team?.split('\n').map((line, index) => (
                <p key={index} className={styles.project__content_team_line}>
                  {line}
                </p>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Project;
