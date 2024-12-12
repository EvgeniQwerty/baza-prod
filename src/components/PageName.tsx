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
    <div className={styles.pagename}>
      <div className={styles.pagename__imagewrapper}>
        <Image 
          src={imageUrl} 
          alt={title} 
          className={styles.pagename__image}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          quality={100}
        />
        <h1 className={styles.pagename__title}>{title}</h1>
        {text && (
          <p className={styles.pagename__text}>{text}</p>
        )}
      </div>
      {text && (
        <p className={styles.pagename__text_mobile}>{text}</p>
      )}
    </div>
  );
};

export default PageName;