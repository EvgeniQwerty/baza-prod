import styles from "./TeamBlock.module.css";
import Image from "next/image";

export default function TeamBlock() {
    return (
        <div className={styles.team}>
            <div className={styles.team__member}>
                <div className={styles.team__name}>Влад<br/>Калашников</div>
                <div className={styles.team__position}>Founder<br/>Генеральный продюсер</div>
                <Image src="/person-1.png" alt="CEO" layout="fill" objectFit="cover" quality={100} className={styles.team__image}/>
            </div>
            <div className={styles.team__member}>
                <div className={styles.team__name}>Дарья<br/>Огорельцева</div>
                <div className={styles.team__position}>Операционный директор</div>
                <Image src="/person-2.png" alt="COO" layout="fill" objectFit="cover" quality={100} className={styles.team__image}/>
            </div>
            <div className={styles.team__member}>
                <div className={styles.team__name}>Михаил<br/>Шамриков</div>
                <div className={styles.team__position}>Основной режиссер<br/>Сценарист</div>
                <Image src="/person-3.png" alt="Director" layout="fill" objectFit="cover" quality={100} className={styles.team__image}/>
            </div>
            <div className={styles.team__member}>
                <div className={styles.team__name}>Александр<br/>Артеев</div>
                <div className={styles.team__position}>Оператор-постановщик</div>
                <Image src="/person-4.png" alt="Operator" layout="fill" objectFit="cover" quality={100} className={styles.team__image}/>
            </div>
            <div className={styles.team__member}>
                <div className={`${styles.team__name} ${styles.team__name_last}`}>Кто<br/>следующий?</div>
                <div className={`${styles.team__position} ${styles.team__position_last}`}>Отправить портфолио</div>
                <Image src="/person-who.png" alt="Who's next?" layout="fill" objectFit="cover" quality={100} className={styles.team__image}/>
            </div>
        </div>
    )
}