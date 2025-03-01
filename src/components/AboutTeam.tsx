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
  { position: "Генеральный продюсер/Автор идеи", names: ["Владислав Калашников"], span: 6 },
  { position: "Режиссер/Сценарист", names: ["Михаил Шамриков"], span: 6 },
  { position: "Оператор-постановщик", names: ["Александр Артеев"], span: 6 },
  { position: "Арт-директор", names: ["Анна Романова"], span: 6 },
  { position: "Линейный продюсер", names: ["Дарья Огорельцева"], span: 6 },
  { position: "В главных ролях", names: ["Александр Гусев", "София Пономарева", "Илья Малых"], span: 6 },
  { position: "Гаффер", names: ["Егор Панасенко"], span: 6 },
  { position: "Осветитель", names: ["Артем Боярский"], span: 6 },
  { position: "Фокус-пуллер", names: ["Никита Рябенков"], span: 6 },
  { position: "Художник по костюмам", names: ["Дарья Марьинская"], span: 6 },
  { position: "Художник по гриму", names: ["Екатерина Рейнсон"], span: 6 },
  { position: "Реквизитор", names: ["Дарья Огорельцева"], span: 6 },
  { position: "Ассистент линейного продюсера и реквизитора", names: ["Алена Игнатьева"], span: 6 },
  { position: "Монтаж", names: ["Владислав Калашников", "Михаил Шамриков"], span: 6 },
  { position: "Цвет/Клинап", names: ["Александр Артеев"], span: 6 },
  { position: "VFX", names: ["Дмитрий Белов"], span: 6 },
  { position: "Композитор/SFX", names: ["Иван Пестерников"], span: 6 },
  { position: "Титры", names: ["София Паллас", "Екатерина Осокина"], span: 6 },
  { position: "Бэкстейдж фото", names: ["Илья Урс"], span: 6 },
  { position: "Бэкстейдж видео", names: ["Вова Дербенев"], span: 6 },
  { position: "Роли второго плана", names: ["Алексей Демаков", "Елена Саввина", "Александр Free Man", "Денис Дягилев", "Павел Коршунов"], span: 6 },
  { position: "Благодарность", names: ["Алексей Лепшаков", "Иван Путиенко", "Слава Шустов", "Святослав", "Саидакмал Тулаганов", "Владимир Шишлянников"], span: 6 },
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
          <h3 className={styles.team__quote1}>Наша команда -<br/>это люди, которые<br/>умеют видеть глубже</h3>
        </div>
        <div className={styles.team__quotes_right}>
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