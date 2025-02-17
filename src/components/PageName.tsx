import React from 'react';
import styles from "./PageName.module.css";

type PageNameProps = {
  imageUrl: string;
  title: string;
  text?: string;
};

const PageName: React.FC<PageNameProps> = ({ imageUrl, title, text }) => {
  return (
    <section className={styles.pagename} aria-labelledby="page-title">
      <div className={styles.pagename__imagewrapper}>
        <picture>
          <source srcSet={imageUrl.replace(".avif", "-mobile.avif")} media="(max-width: 768px)" type="image/avif" />
          <img
            src={imageUrl}
            alt={`Изображение для страницы: ${title}`}
            className={styles.pagename__image}
            loading="lazy"
            decoding="async"
          />
        </picture>
        <h1 id="page-title" className={styles.pagename__title}>{title}</h1>
        {text && (
          <p className={styles.pagename__text}>{text}</p>
        )}
      </div>
      {(text && (
        <p className={styles.pagename__text_mobile} aria-label="Описание страницы">
          {text}
        </p>
      ))}
    </section>
  );
};

export default PageName;
