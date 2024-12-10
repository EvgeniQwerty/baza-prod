// components/Project.tsx
import React from 'react';
import Image from 'next/image';
import styles from './Project.module.css';

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
  return (
    <div className={styles.project}>
      <header className={styles.project__header}>
        <div>
          <h2 className={styles.project__name}>
            {name} <span className={styles.project__name_year}>{year}</span>
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
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Project Video"
        ></iframe>
      </div>

      <section className={styles.project__content}>
        <div className={styles.project__content_left}>
          <h3 className={styles.project__content_title}>Как это было</h3>
          <div className={styles.project__photos}>
            {[img1, img2, img3, img4].map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`Проект Фото ${idx + 1}`}
                className={styles.project__photos_img}
                width={1200}
                height={800}
                priority={idx === 0}
              />
            ))}
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