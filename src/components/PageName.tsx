// components/PageName.tsx
import React from 'react';
import styles from "./PageName.module.css";

type PageNameProps = {
  imageUrl: string; // Путь к изображению
  title: string;    // Заголовок, который отображается на изображении\
  text?: string;
};

const PageName: React.FC<PageNameProps> = ({ imageUrl, title, text }) => {
  return (
    <div className={styles.pagename}>
      <div className={styles.pagename__imagewrapper}>
        <img src={imageUrl} alt={title} className={styles.pagename__image} />
        <h2 className={styles.pagename__title}>{title}</h2>
        <p className={styles.pagename__text}>{text}</p>
      </div>
      <p className={styles.pagename__text_mobile}>{text}</p>
    </div>
  );
};

export default PageName;