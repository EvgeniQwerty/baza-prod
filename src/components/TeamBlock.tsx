import React from 'react';
import styles from "./TeamBlock.module.css";
import Image from "next/image";
import VK from "@/svg/vk-solid.svg";
import Instagram from "@/svg/instagram-solid.svg";
import Telegram from "@/svg/telegram-solid.svg";

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  platform: 'VK' | 'Instagram' | 'Telegram';
}

interface TeamMember {
  name: string;
  position: string;
  socials: SocialLink[];
  imgSrc: string;
  imgSrcMobile: string;
  imgAlt: string;
}

export default function TeamBlock() {
  const members: TeamMember[] = [
    {
      name: "Влад Калашников",
      position: "Основатель\nГенеральный продюсер",
      socials: [
        { href: "https://t.me/kalashnikovk", icon: <VK aria-hidden="true" />, platform: 'VK' },
        { href: "https://t.me/kalashnikovk", icon: <Instagram aria-hidden="true" />, platform: 'Instagram' },
        { href: "https://t.me/kalashnikovk", icon: <Telegram aria-hidden="true" />, platform: 'Telegram' },
      ],
      imgSrc: "/persons/person-1.avif",
      imgSrcMobile: "/persons/person-1-mobile.avif",
      imgAlt: "Влад Калашников - CEO",
    },
    {
      name: "Дарья Огорельцева",
      position: "Исполнительный продюсер",
      socials: [
        { href: "https://t.me/darya", icon: <VK aria-hidden="true" />, platform: 'VK' },
        { href: "https://t.me/darya", icon: <Instagram aria-hidden="true" />, platform: 'Instagram' },
      ],
      imgSrc: "/persons/person-2.avif",
      imgSrcMobile: "/persons/person-2-mobile.avif",
      imgAlt: "Дарья Огорельцева - COO",
    },
    {
      name: "Михаил Шамриков",
      position: "Основной режиссёр",
      socials: [
        { href: "https://t.me/mikhail", icon: <VK aria-hidden="true" />, platform: 'VK' },
        { href: "https://t.me/mikhail", icon: <Instagram aria-hidden="true" />, platform: 'Instagram' },
      ],
      imgSrc: "/persons/person-3.avif",
      imgSrcMobile: "/persons/person-3-mobile.avif",
      imgAlt: "Михаил Шамриков - Режиссёр",
    },
    {
      name: "Александр Артеев",
      position: "Оператор-постановщик",
      socials: [
        { href: "https://t.me/alex", icon: <VK aria-hidden="true" />, platform: 'VK' },
        { href: "https://t.me/alex", icon: <Instagram aria-hidden="true" />, platform: 'Instagram' },
      ],
      imgSrc: "/persons/person-4.avif",
      imgSrcMobile: "/persons/person-4-mobile.avif",
      imgAlt: "Александр Артеев - Оператор",
    },
  ];

  return (
    <section 
      className={styles.team} 
      aria-label="Команда компании"
    >
      {members.map((member, index) => (
        <div 
          className={styles.team__member} 
          key={index}
          role="article"
        >
          {/* Изображение для десктопа */}
          <Image
            src={member.imgSrc}
            alt={member.imgAlt}
            fill
            priority={index < 2}
            className={`${styles.team__image} ${styles.team__image_desktop}`}
            unoptimized
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          {/* Изображение для мобильных устройств */}
          <Image
            src={member.imgSrcMobile}
            alt={member.imgAlt}
            fill
            priority={index < 2}
            className={`${styles.team__image} ${styles.team__image_mobile}`}
            unoptimized
            sizes="(max-width: 767px) 100vw"
          />
          <div className={styles.team__overlay}>
            <h2 className={styles.team__name}>
              {member.name.split(" ")[0]}
              <br />
              {member.name.split(" ")[1]}
            </h2>
            <nav className={styles.team__socials} aria-label={`Социальные сети ${member.name}`}>
              {member.socials.map((social, idx) => (
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={idx}
                  className={styles.team__link}
                  aria-label={`Профиль ${member.name} в ${social.platform}`}
                >
                  {social.icon}
                </a>
              ))}
            </nav>
            <div className={styles.team__position}>
              {member.position.split("\n").map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div 
        className={styles.team__member} 
        role="complementary"
      >
        <Image
          src="/persons/person-who.avif"
          alt="Вакансия открыта"
          fill
          className={styles.team__image}
          unoptimized
          sizes="100vw"
        />
        <p className={styles.team__whosnext}>
          Кто
          <br />
          следующий?
        </p>
        <a 
          href="https://t.me/kalashnikovk" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.team__sendresume}
          aria-label="Отправить резюме"
        >
          Отправить резюме
        </a>
      </div>
    </section>
  );
}
