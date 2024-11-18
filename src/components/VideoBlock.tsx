import { FC } from 'react'
import Image from 'next/image'
import styles from './VideoBlock.module.css'

interface VideoBlockProps {
    path: string;
    name: string;
    org: string;
    type: string;
    typeCode: string;
    year: string;
}

const VideoBlock: FC<VideoBlockProps> = ({path, name, org, type, typeCode, year}) => {
    return (
        <div className={styles.videoblock} data-type={typeCode}>
            <p className={styles.videoblock__type}>{type}</p>
            <Image 
                src={path} 
                alt={name} 
                layout="fill" 
                objectFit="cover" 
                quality={100} 
                className={styles.videoblock__image}
            />
            <div className={styles.videoblock__buttons}>
                <a className={styles.videoblock__button}>
                    {name} <span className={styles.videoblock__year}>{year}</span>
                </a>
                <p className={styles.videoblock__org}>{org}</p>
            </div>
        </div>
    )
}

export default VideoBlock;