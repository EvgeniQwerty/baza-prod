import styles from "./Footer.module.css";
import Image from "next/image";

//@ts-ignore
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__wrapper}>
                <div className={styles.footer__left}>
                    <div className={styles.footer__block}>
                        <Image src="/logo.png" alt="Logo" width={96} height={32} />
                        <p className={styles.footer__copyright}>Все права защищены &#169; 2024</p>
                    </div>
                    <div className={styles.footer__block}>
                        <a href="/" className={styles.footer__link}>О нас</a>
                        <a href="/" className={styles.footer__link}>Проекты</a>
                        <a href="/" className={styles.footer__link}>Услуги</a>
                        <a href="/" className={styles.footer__link}>Контакты</a>
                    </div>
                    <div className={styles.footer__block}>
                        <a href="tel:79195105601" className={styles.footer__link}>+7 (919) 510-56-01</a>
                        <div className={styles.footer__socials}>
                            <a href="/" className={styles.footer__link}><Image src="/insta.png" alt="Instagram" width={38} height={38} /></a>
                            <a href="/" className={styles.footer__link}><Image src="/telegram.png" alt="Telegram" width={45} height={38} /></a>
                        </div>
                    </div>
                </div>
                <div className={styles.footer__right}>
                    <div className={styles.footer__block}>
                        <p className={styles.form__title}>По вопросам:</p>
                        <button className={styles.form__button}>Связаться с нами</button>
                    </div>
                </div>
            </div>
        </footer>
    )
}