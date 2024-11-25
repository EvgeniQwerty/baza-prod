import styles from "./TeamBlock.module.css";
import Image from "next/image";
import VK from "@/svg/vk-solid.svg";
import IG from "@/svg/instagram-solid.svg";

export default function TeamBlock() {
    const members = [
        {
            name: "Влад Калашников",
            position: "Founder\nГенеральный продюсер",
            socials: [
                { href: "https://t.me/kalashnikovk", icon: <VK /> },
                { href: "https://t.me/kalashnikovk", icon: <IG /> },
            ],
            imgSrc: "/persons/person-1.png",
            imgAlt: "CEO",
        },
        {
            name: "Дарья Огорельцева",
            position: "Операционный директор",
            socials: [
                { href: "https://t.me/darya", icon: <VK /> },
                { href: "https://t.me/darya", icon: <IG /> },
            ],
            imgSrc: "/persons/person-2.png",
            imgAlt: "COO",
        },
        {
            name: "Михаил Шамриков",
            position: "Основной режиссёр\nСценарист",
            socials: [
                { href: "https://t.me/mikhail", icon: <VK /> },
                { href: "https://t.me/mikhail", icon: <IG /> },
            ],
            imgSrc: "/persons/person-3.png",
            imgAlt: "Director",
        },
        {
            name: "Александр Артеев",
            position: "Оператор-постановщик",
            socials: [
                { href: "https://t.me/alex", icon: <VK /> },
                { href: "https://t.me/alex", icon: <IG /> },
            ],
            imgSrc: "/persons/person-4.png",
            imgAlt: "Cinematographer",
        },
    ];

    return (
        <div className={styles.team}>
            {members.map((member, index) => (
                <div className={styles.team__member} key={index}>
                    <Image
                        src={member.imgSrc}
                        alt={member.imgAlt}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        className={styles.team__image}
                    />
                    <div className={styles.team__overlay}>
                        <div className={styles.team__name}>{member.name}</div>
                        <div className={styles.team__socials}>
                            {member.socials.map((social, idx) => (
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={idx}
                                    className={styles.team__link}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                        <div className={styles.team__position}>
                            {member.position.split("\n").map((line, idx) => (
                                <div key={idx}>{line}</div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}