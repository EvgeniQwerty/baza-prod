import { memo } from 'react';
import Image from "next/image";
import styles from "./AboutTeam.module.css";

interface TeamMember {
    position: string;
    names: string[];
    span: number;
}

// Вынесем данные в отдельный файл teamData.ts в будущем
const teamData: TeamMember[] = [
    { position: "Продюсер", names: ["Калашников Владислав"], span: 6 },
    { position: "Режиссер", names: ["Шамриков Михаил"], span: 6 },
    { position: "Сценаристы", names: ["Шамриков Михаил", "Романова Анна"], span: 6 },
    { position: "Оператор-постановщик", names: ["Артеев Александр"], span: 6 },
    { position: "Линейные продюсеры", names: ["Огорельцева Дарья", "Калашников Владислав"], span: 6 },
    { position: "", names: [""], span: 1 },
    { position: "В главных ролях", names: ["Пономарева София", "Гусев Александр", "Малых Илья"], span: 1 },
    { position: "", names: [""], span: 6 },
    { position: "", names: [""], span: 6 },
    { position: "", names: [""], span: 6 },
    { position: "", names: [""], span: 6 },
    { position: "", names: [""], span: 6 },
    { position: "Помощник продюсера", names: ["Игнатьева Алена"], span: 6 },
    { position: "Директор по кастингу", names: ["Огорельцева Дарья", "Шамриков Михаил"], span: 6 },
    { position: "Ассистент режиссера", names: ["Огорельцева Дарья"], span: 6 },
    { position: "Арт директор", names: ["Романова Анна"], span: 6 },
    { position: "Мастер по реквизиту", names: ["Огорельцева Дарья"], span: 6 },
    { position: "Ассистент мастера по реквизиту", names: ["Игнатьева Алена"], span: 5 },
    { position: "Фокус пуллер", names: ["Уточняется"], span: 5 },
    { position: "Гафферы", names: ["Уточняется"], span: 5 },
    { position: "Бестбои", names: ["Уточняется"], span: 5 },
    { position: "Художник по костюмам", names: ["Марьинская Дарья"], span: 5 },
    { position: "Грим", names: ["Рейнсон Екатерина"], span: 5 },
    { position: "", names: [""], span: 1 },
    { position: "Роли второго плана", names: ["Демаков Алексей", "Саввина Елена", "Free Man Александр", "Дягилев Денис"], span: 1 },
    { position: "Координатор", names: ["Огорельцева Дарья"], span: 5 },
    { position: "CG", names: ["Коршунов Павел", "Белов Дмитрий"], span: 5 },
    { position: "Режиссер монтажа", names: ["Артеев Александр"], span: 5 },
    { position: "Саунд дизайнер", names: ["Уточняется"], span: 5 },
    { position: "Композиторы", names: ["Уточняется"], span: 5 },
    { position: "Backstage", names: ["Илья Урс"], span: 5 },
];

// Мемоизированный компонент для отображения члена команды
const TeamMemberCard = memo(({ member }: { member: TeamMember }) => {
    if (!member.position && !member.names[0]) return null;

    return (
        <div 
            className={`${styles[`grid__span${member.span}`]}`}
            role="listitem"
        >
            {member.position && (
                <p className={styles.grid__position} aria-label="Должность">
                    {member.position}
                </p>
            )}
            {member.names.map((name, nameIndex) => (
                name && (
                    <p 
                        key={`${name}-${nameIndex}`} 
                        className={styles.grid__name}
                        aria-label="Имя"
                    >
                        {name}
                    </p>
                )
            ))}
        </div>
    );
});

TeamMemberCard.displayName = 'TeamMemberCard';

export default function AboutTeam() {
    return (
        <section className={styles.team} aria-label="Команда проекта">
            <div 
                className={styles.team__grid}
                role="list"
                aria-label="Список членов команды"
            >
                {teamData.map((member, index) => (
                    <TeamMemberCard
                        key={`${member.position}-${index}`}
                        member={member}
                    />
                ))}
            </div>
            <Image
                src="/about/about_team.png"
                alt="Фотография команды проекта"
                fill
                sizes="100vw"
                quality={85}
                priority
                className={styles.team__image}
            />
        </section>
    );
}