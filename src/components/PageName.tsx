// components/PageName.tsx
import React from 'react';
import styles from "./PageName.module.css";

type PageNameProps = {
  imageUrl: string; // Путь к изображению
  title: string;    // Заголовок, который отображается на изображении
};

const PageName: React.FC<PageNameProps> = ({ imageUrl, title }) => {
  return (
    <div className={styles.pagename}>
      <div className={styles.pagename__imagewrapper}>
        <img src={imageUrl} alt={title} className={styles.pagename__image} />
        <h2 className={styles.pagename__title}>{title}</h2>
      </div>
    </div>
  );
};

export default PageName;