import styles from "./Contacts.module.css";
import Image from "next/image";
import InstaSvg from "@/svg/insta.svg";
import VkSvg from "@/svg/vk.svg";
import TgSvg from "@/svg/telegram.svg";
import VimeoSvg from "@/svg/vimeo.svg";

const socialLinks = [
  {
    href: "https://instagram.com/samoyed.biz",
    Icon: InstaSvg,
    label: "Instagram"
  },
  {
    href: "https://vk.com/kalashnikov.prod",
    Icon: VkSvg,
    label: "VKontakte"
  },
  {
    href: "https://t.me/kalashnikovk",
    Icon: TgSvg,
    label: "Telegram"
  }
];

export default function Contacts() {
  return (
    <section className={styles.contacts}>
      <div className={styles.contacts__header}>
        <h1 className={styles.contacts__title}>Контакты</h1>
        <h2 className={styles.contacts__title2}>Люди - самый ценный актив</h2>
      </div>

      <div className={styles.contacts__links}>
        <a
          href="mailto:kalashnikov.ksv@gmail.com"
          className={styles.contacts__link}
        >
          kalashnikov.ksv@gmail.com
        </a>
        <a
          href="tel:+79195105601"
          className={styles.contacts__link}
        >
          +7 (919) 510 56-01
        </a>
        <h3 className={styles.contacts__link_desc}>Работаем по всей России</h3>
      </div>

      <div className={styles.contacts__icons}>
        <a
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contacts__icon}
          aria-label="Vimeo"
        >
          <VimeoSvg
            className={styles.contacts__svg}
            width={112}
            height={48}
          />
        </a>
        {socialLinks.map(({ href, Icon, label }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contacts__social}
            aria-label={label}
          >
            <Icon
              className={styles.contacts__svg}
              width={48}
              height={48}
            />
          </a>
        ))}
      </div>

      <div className={styles.contacts__imagewrapper}>
        <picture>
          <source
            srcSet="/contacts/background-mobile.avif"
            type="image/avif"
            media="(max-width: 768px)"
          />
          <source
            srcSet="/contacts/background.avif"
            type="image/avif"
            media="(min-width: 769px)"
          />
          <img
            src="/contacts/background.avif"
            alt="Декоративный фон"
            className={styles.contacts__image}
            loading="lazy"
            decoding="async"
          />
        </picture>

        <p className={styles.contacts__description}>
          Работа с нами - залог 100% результата<br />
          Если у вас возникли вопросы или предложения,<br />
          свяжитесь с нами любым удобным способом
        </p>
      </div>
    </section>
  )
}