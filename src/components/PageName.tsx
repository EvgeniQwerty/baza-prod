import React from 'react';
import Image from 'next/image';
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
        <Image 
          src={imageUrl}
          alt=""
          className={styles.pagename__image}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={85}
          unoptimized
          aria-hidden="true"
        />
        <h1 id="page-title" className={styles.pagename__title}>{title}</h1>
        {text && (
          <p className={styles.pagename__text}>{text}</p>
        )}
      </div>
      {text && (
        <p className={styles.pagename__text_mobile} aria-label="Описание страницы">
          {text}
        </p>
      )}
    </section>
  );
};

export default PageName;