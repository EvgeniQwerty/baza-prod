import Image from "next/image";
import styles from "./VideoBlock.module.css";

//@ts-ignore
export default function VideoBlock({path, name, year}) {
    return (
        <div className={styles.videoblock}>
            <Image src={path} alt={name} layout="fill" objectFit="cover" quality={100} className={styles.videoblock__image}></Image>
            <div className={styles.videoblock__buttons}>
                <a className={styles.videoblock__button}>{name} <span className={styles.videoblock__year}>{year}</span></a>
            </div>
        </div>
    )
}