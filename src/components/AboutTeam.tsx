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
  { position: "Генеральный продюсер/Автор идеи", names: ["Калашников Владислав"], span: 6 },
  { position: "Режиссер/Сценарист", names: ["Шамриков Михаил"], span: 6 },
  { position: "Оператор-постановщик", names: ["Артеев Александр"], span: 6 },
  { position: "Арт-директор", names: ["Романова Анна"], span: 6 },
  { position: "Линейный продюсер", names: ["Огорельцева Дарья"], span: 6 },
  { position: "В главных ролях", names: ["Гусев Александр", "Пономарева София", "Малых Илья"], span: 6 },
  { position: "Гаффер", names: ["Панасенко Егор"], span: 6 },
  { position: "Осветитель", names: ["Боярский Артем"], span: 6 },
  { position: "Фокус-пуллер", names: ["Рябенков Никита"], span: 6 },
  { position: "Художник по костюмам", names: ["Марьинская Дарья"], span: 6 },
  { position: "Художник по гриму", names: ["Рейнсон Екатерина"], span: 6 },
  { position: "Реквизитор", names: ["Огорельцева Дарья"], span: 6 },
  { position: "Ассистент линейного продюсера и реквизитора", names: ["Игнатьева Алена"], span: 6 },
  { position: "Монтаж", names: ["Калашников Владислав", "Шамриков Михаил"], span: 6 },
  { position: "Цвет/Клинап", names: ["Артеев Александр"], span: 6 },
  { position: "VFX", names: ["Белов Дмитрий"], span: 6 },
  { position: "Композитор/SFX", names: ["Пестерников Иван"], span: 6 },
  { position: "Титры", names: ["Паллас София", "Осокина Екатерина"], span: 6 },
  { position: "Бэкстейдж фото", names: ["Урс Илья"], span: 6 },
  { position: "Бэкстейдж видео", names: ["Дербенев Вова"], span: 6 },
  { position: "Роли второго плана", names: ["Демаков Алексей", "Саввина Елена", "Free Man Александр", "Дягилев Денис", "Коршунов Павел"], span: 6 },
  { position: "Благодарность", names: ["Лепшаков Алексей", "Путиенко Иван", "Шустов Слава", "Святослав", "Тулаганов Саидакмал", "Шишлянников Владимир"], span: 6 },
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
      <div className={styles.team__quotes}>
        <div className={styles.team__quotes_left}>
          <h3 className={styles.team__quote1}>Мы соединяем креативность,<br />профессионализм и искренность,<br />чтобы каждая история стала<br />уникальной.</h3>
        </div>
        <div className={styles.team__quotes_right}>
          <p className={styles.team__quote2}>Наша команда - это люди, которые умеют видеть глубже</p>
          <p className={`${styles.team__quote2} ${styles.accent}`}>Каждый важен, каждый внес свою лепту в историю этого ролика.</p>
        </div>
      </div>

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
            srcSet="/about_media/about_team.avif"
            type="image/avif"
            media="(min-width: 769px)"
          />
          <source
            srcSet="/about_media/about_team-mobile.avif"
            type="image/avif"
            media="(max-width: 768px)"
          />
          <img
            src="/about_media/about_team.avif"
            alt="Фотография команды проекта"
            className={styles.team__image}
            loading="eager"
            decoding="sync"
            sizes="(max-width: 768px) 100vw, 80vw"
            aria-hidden="true"
          />
        </picture>
      </div>
    </section >
  );
}