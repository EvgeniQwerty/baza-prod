import React from 'react';
import Link from 'next/link';
import styles from "./Footer.module.css";
import LogoSvg from "@/svg/logo.svg";
import InstaSvg from "@/svg/insta.svg";
import VkSvg from "@/svg/vk.svg";
import TgSvg from "@/svg/telegram.svg";

const socialLinks = [
  { href: "https://instagram.com/samoyed.biz", Icon: InstaSvg, label: "Instagram" },
  { href: "https://vk.com/kalashnikov.prod", Icon: VkSvg, label: "VKontakte" },
  { href: "https://t.me/kalashnikovk", Icon: TgSvg, label: "Telegram" }
];

const navigationLinks = [
  { href: "/about", label: "О нас" },
  { href: "/projects", label: "Проекты" },
  { href: "/services", label: "Услуги" },
  { href: "/contacts", label: "Контакты" }
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Десктоп версия */}
      <div className={styles.footer__wrapper}>
        <div className={styles.footer__left}>
          <div className={styles.footer__block}>
            <Link 
              href="/" 
              className={`${styles.footer__link} ${styles.footer__link_logo}`} 
              aria-label="Главная страница"
            >
              <LogoSvg width={90} height={40} className={styles.footer__logo} alt="Логотип компании" />
            </Link>
            <p className={styles.footer__copyright}>
              Все права защищены © {new Date().getFullYear()}
            </p>
            <p className={styles.footer__coords}>58.5966, 49.6601</p>
          </div>

          <div className={styles.footer__block}>
            {navigationLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={styles.footer__link}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.footer__block}>
            <div className={styles.footer__socials}>
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.footer__link} ${styles.footer__social}`}
                  aria-label={social.label}
                >
                  <social.Icon width={48} height={48} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footer__right}>
          <div className={styles.footer__block}>
            <p className={styles.form__title}>По вопросам:</p>
            <a 
              href="https://t.me/kalashnikovk" 
              target="_blank"
              rel="noopener noreferrer"
              className={styles.form__button}
            >
              Связаться с нами
            </a>
          </div>
        </div>
      </div>

      {/* Мобильная версия */}
      <div className={styles.footer__wrapper_mobile}>
        <div className={styles.footer__top}>
          <div className={styles.footer__block}>
            <Link 
              href="/" 
              className={`${styles.footer__link} ${styles.footer__link_logo}`}
              aria-label="Главная страница"
            >
              <LogoSvg width={70} height={30} alt="Логотип компании" />
            </Link>
            <p className={styles.footer__copyright}>
              Все права защищены © {new Date().getFullYear()}
            </p>
            <p className={styles.footer__coords}>58.5966, 49.6601</p>
          </div>
          <div className={styles.footer__block}>
            {navigationLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={styles.footer__link}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <div className={styles.footer__block}>
            <div className={styles.footer__socials}>
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.footer__link} ${styles.footer__social}`}
                  aria-label={social.label}
                >
                  <social.Icon width={48} height={48} />
                </a>
              ))}
            </div>
          </div>
          <div className={styles.footer__block}>
            <p className={styles.form__title}>По вопросам:</p>
            <a 
              href="https://t.me/kalashnikovk" 
              target="_blank"
              rel="noopener noreferrer"
              className={styles.form__button}
            >
              Связаться с нами
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}