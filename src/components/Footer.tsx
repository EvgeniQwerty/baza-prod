import styles from "./Footer.module.css";
import Image from "next/image";
import Insta from "@/svg/insta.svg";
import VK from "@/svg/vk.svg";
import Tg from "@/svg/telegram.svg";
import Logo from "@/svg/logo.svg"

//@ts-ignore
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__wrapper}>
                <div className={styles.footer__left}>
                    <div className={styles.footer__block}>
                        <a href="/" className={styles.footer__link}><Logo /></a>
                        <p className={styles.footer__copyright}>Все права защищены &#169; 2024</p>
                        <p className={styles.footer__coords}>58.5966, 49.6601</p>
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
                            <a href="https://instagram.com/samoyed.biz" target="_blank" className={styles.footer__link}><Insta /></a>
                            <a href="https://vk.com/kalashnikov.prod" target="_blank" className={styles.footer__link}><VK /></a>
                            <a href="https://t.me/kalashnikovk" target="_blank" className={styles.footer__link}><Tg /></a>
                        </div>
                    </div>
                </div>
                <div className={styles.footer__right}>
                    <div className={styles.footer__block}>
                        <p className={styles.form__title}>По вопросам:</p>
                        <a href="https://t.me/kalashnikovk" target="_blank" className={styles.form__button}>Связаться с нами</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}