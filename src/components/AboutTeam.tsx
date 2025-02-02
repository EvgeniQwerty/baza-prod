import { memo, useMemo } from 'react';
import Image from "next/image";
import styles from "./AboutTeam.module.css";

interface TeamMember {
  position: string;
  names: string[];
  span: number;
}

//позже вынести в teamData.ts
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

const TeamMemberCard = memo(({ member }: { member: TeamMember }) => {
  const hasContent = member.position || member.names.some(name => name.trim());
  
  return hasContent ? (
    <li 
      className={styles[`grid__span${member.span}`]}
      role="listitem"
      aria-label={member.position || 'Член команды'}
    >
      {member.position && (
        <p className={styles.grid__position} role="heading" aria-level={3}>
          {member.position}
        </p>
      )}
      <div role="list" aria-label="Имена участников">
        {member.names.filter(name => name.trim()).map((name, index) => (
          <p 
            key={`${name}-${index}`}
            className={styles.grid__name}
            role="listitem"
          >
            {name}
          </p>
        ))}
      </div>
    </li>
  ) : null;
});

TeamMemberCard.displayName = 'TeamMemberCard';

export default function AboutTeam() {
  const filteredTeamData = useMemo(() => 
    teamData.filter(member => 
      member.position.trim() || member.names.some(name => name.trim())
    ), []);

  return (
    <section 
      className={styles.team} 
      aria-labelledby="team-heading"
      role="region"
    >
      <h2 id="team-heading" className="sr-only">Команда проекта</h2>
      
      <ul 
        className={styles.team__grid}
        role="list"
        aria-label="Состав команды"
      >
        {filteredTeamData.map((member, index) => (
          <TeamMemberCard
            key={`${member.position}-${member.names.join('-')}-${index}`}
            member={member}
          />
        ))}
      </ul>

      <div className={styles.team__image_wrapper}>
        <picture>
          <source
            srcSet="/about/about_team.avif"
            type="image/avif"
          />
          <source
            srcSet="/about/about_team.webp"
            type="image/webp"
          />
          <Image
            src="/about/about_team.jpg"
            alt="Фотография команды проекта"
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            quality={80}
            priority
            loading="eager"
            decoding="sync"
            className={styles.team__image}
            unoptimized
            aria-hidden="true"
          />
        </picture>
      </div>
    </section>
  );
}