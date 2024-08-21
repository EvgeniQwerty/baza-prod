import styles from "./TeamBlock.module.css";
import Image from "next/image";

export default function TeamBlock() {
    return (
        <div className={styles.team}>
            <div className={styles.team__member}>
                <div className={styles.team__name}>Калашников<br/>Влад</div>
                <div className={styles.team__position}>Founder<br/>Генеральный продюсер</div>
                <Image src="/person-1.png" alt="CEO" layout="fill" objectFit="cover" quality={100} className={styles.team__image}/>
            </div>
            <div className={styles.team__member}>
                <div className={styles.team__name}>Огорельцева<br/>Даша</div>
                <div className={styles.team__position}>Операционный директор</div>
                <Image src="/person-2.png" alt="COO" layout="fill" objectFit="cover" quality={100} className={styles.team__image}/>
            </div>
            <div className={styles.team__member}>
                <div className={styles.team__name}>Шамриков<br/>Миша</div>
                <div className={styles.team__position}>Основной режиссер<br/>Сценарист</div>
                <Image src="/person-1.png" alt="Director" layout="fill" objectFit="cover" quality={100} className={styles.team__image}/>
            </div>
            <div className={styles.team__member}>
                <div className={styles.team__name}>Артеев<br/>Саша</div>
                <div className={styles.team__position}>Оператор-постановщик</div>
                <Image src="/person-2.png" alt="Operator" layout="fill" objectFit="cover" quality={100} className={styles.team__image}/>
            </div>
            <div className={styles.team__member}>
                <div className={styles.team__name}>Кто<br/>следующий?</div>
                <div className={styles.team__position}>Вступить в команду</div>
                <Image src="/person-who.png" alt="Who's next?" layout="fill" objectFit="cover" quality={100} className={styles.team__image}/>
            </div>
        </div>
    )
}